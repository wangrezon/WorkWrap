/**
 * 用户相关的数据库操作
 */
import { Pool } from "@neondatabase/serverless";

/**
 * 用户信息类型
 */
export interface UserInfo {
  id: number;
  email: string;
  name: string | null;
  emailVerified: Date | null;
}

/**
 * 根据邮箱查询用户
 */
export async function getUserByEmail(
  pool: Pool,
  email: string
): Promise<UserInfo | null> {
  const result = await pool.query<UserInfo>(
    `SELECT id, email, name, "emailVerified" FROM users WHERE email = $1`,
    [email]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}

/**
 * 创建新用户
 */
export async function createUser(
  pool: Pool,
  email: string,
  name: string | null = null
): Promise<number> {
  const result = await pool.query<{ id: number }>(
    `INSERT INTO users (email, "emailVerified", name)
     VALUES ($1, NOW(), $2)
     RETURNING id`,
    [email, name]
  );

  return result.rows[0].id;
}

/**
 * 更新用户邮箱验证时间
 */
export async function updateUserEmailVerified(
  pool: Pool,
  userId: number
): Promise<void> {
  await pool.query(
    `UPDATE users SET "emailVerified" = NOW() WHERE id = $1`,
    [userId]
  );
}

/**
 * 更新用户邮箱
 */
export async function updateUserEmail(
  pool: Pool,
  userId: number,
  email: string
): Promise<void> {
  await pool.query(
    `UPDATE users SET email = $1, "emailVerified" = NOW() WHERE id = $2`,
    [email, userId]
  );
}

/**
 * 检查邮箱是否已被其他用户使用
 */
export async function isEmailUsedByOtherUser(
  pool: Pool,
  email: string,
  excludeUserId: number
): Promise<boolean> {
  const result = await pool.query<{ id: number }>(
    `SELECT id FROM users WHERE email = $1 AND id != $2`,
    [email, excludeUserId]
  );

  return result.rows.length > 0;
}

/**
 * 根据 ID 查询用户
 */
export async function getUserById(
  pool: Pool,
  userId: number
): Promise<UserInfo | null> {
  const result = await pool.query<UserInfo>(
    `SELECT id, email, name, "emailVerified" FROM users WHERE id = $1`,
    [userId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}
