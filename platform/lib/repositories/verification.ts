/**
 * 验证码数据库操作函数
 */
import { Pool } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import type { VerificationCodeRecord } from "@/types/auth";

const CODE_EXPIRY_MINUTES = 5; // 验证码有效期 5 分钟
const SEND_COOLDOWN_SECONDS = 60; // 发送频率限制 60 秒
const MAX_ATTEMPTS = 5; // 最大错误次数
const LOCK_DURATION_MINUTES = 15; // 锁定时长 15 分钟

/**
 * 生成 6 位数字验证码
 */
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * 检查邮箱是否被锁定
 */
async function checkLocked(
  pool: Pool,
  email: string
): Promise<{ locked: boolean; lockedUntil: Date | null }> {
  const result = await pool.query<{ lockedUntil: Date | null }>(
    `SELECT "lockedUntil" FROM email_verification_codes 
     WHERE email = $1 AND "lockedUntil" > NOW()
     ORDER BY "createdAt" DESC
     LIMIT 1`,
    [email]
  );

  if (result.rows.length > 0 && result.rows[0].lockedUntil) {
    return {
      locked: true,
      lockedUntil: result.rows[0].lockedUntil,
    };
  }

  return { locked: false, lockedUntil: null };
}

/**
 * 检查发送频率限制（60 秒内不可重复发送）
 */
async function checkSendCooldown(pool: Pool, email: string): Promise<boolean> {
  const cooldownTime = new Date(Date.now() - SEND_COOLDOWN_SECONDS * 1000);

  const result = await pool.query<{ count: number }>(
    `SELECT COUNT(*) as count FROM email_verification_codes 
     WHERE email = $1 AND "createdAt" > $2`,
    [email, cooldownTime]
  );

  return parseInt(result.rows[0].count.toString()) === 0;
}

/**
 * 创建验证码记录
 * 返回明文验证码用于发送邮件
 */
export async function createVerificationCode(
  pool: Pool,
  email: string
): Promise<{ success: boolean; error?: string; code?: string }> {
  // 清理过期的验证码记录
  await cleanupExpiredCodes(pool);

  // 检查是否被锁定
  const lockCheck = await checkLocked(pool, email);
  if (lockCheck.locked) {
    return {
      success: false,
      error: "errors.accountLocked",
    };
  }

  // 检查发送频率限制
  const canSend = await checkSendCooldown(pool, email);
  if (!canSend) {
    return {
      success: false,
      error: "errors.sendTooFrequent",
    };
  }

  // 生成验证码
  const code = generateCode();
  const hashedCode = await bcrypt.hash(code, 10);
  const expiresAt = new Date(Date.now() + CODE_EXPIRY_MINUTES * 60 * 1000);

  // 存储到数据库（存储加密后的验证码）
  await pool.query(
    `INSERT INTO email_verification_codes (email, code, "expiresAt")
     VALUES ($1, $2, $3)`,
    [email, hashedCode, expiresAt]
  );

  // 返回明文验证码用于发送邮件
  return { success: true, code };
}

/**
 * 验证验证码
 */
export async function verifyCode(
  pool: Pool,
  email: string,
  code: string
): Promise<{
  success: boolean;
  error?: string;
  record?: VerificationCodeRecord;
}> {
  // 查询最新的有效验证码
  const result = await pool.query<VerificationCodeRecord>(
    `SELECT * FROM email_verification_codes 
     WHERE email = $1 AND "expiresAt" > NOW()
     ORDER BY "createdAt" DESC
     LIMIT 1`,
    [email]
  );

  if (result.rows.length === 0) {
    return {
      success: false,
      error: "errors.codeExpired",
    };
  }

  const record = result.rows[0];

  // 检查是否被锁定
  if (record.lockedUntil && new Date(record.lockedUntil) > new Date()) {
    return {
      success: false,
      error: "errors.accountLocked",
    };
  }

  // 验证验证码
  const isValid = await bcrypt.compare(code, record.code);
  if (!isValid) {
    // 增加错误次数
    const newAttempts = record.attempts + 1;
    let lockedUntil: Date | null = null;

    // 如果错误次数达到上限，锁定账户
    if (newAttempts >= MAX_ATTEMPTS) {
      lockedUntil = new Date(Date.now() + LOCK_DURATION_MINUTES * 60 * 1000);
    }

    await pool.query(
      `UPDATE email_verification_codes 
       SET attempts = $1, "lockedUntil" = $2
       WHERE id = $3`,
      [newAttempts, lockedUntil, record.id]
    );

    if (lockedUntil) {
      return {
        success: false,
        error: "errors.tooManyAttempts",
      };
    }

    return {
      success: false,
      error: "errors.codeInvalid",
    };
  }

  // 验证成功，删除验证码记录
  await pool.query(`DELETE FROM email_verification_codes WHERE id = $1`, [
    record.id,
  ]);

  return {
    success: true,
    record,
  };
}

/**
 * 清理过期的验证码记录
 */
async function cleanupExpiredCodes(pool: Pool): Promise<void> {
  await pool.query(
    `DELETE FROM email_verification_codes WHERE "expiresAt" < NOW()`
  );
}
