/**
 * 认证相关的 Server Actions
 */
"use server";

import { signIn } from "@/auth";
import { createPool } from "@/lib/repositories/pool";
import {
  createVerificationCode,
  verifyCode as verifyCodeInDb,
} from "@/lib/repositories/verification";
import {
  isEmailUsedByOtherUser,
  updateUserEmail,
} from "@/lib/repositories/users";
import { sendVerificationCodeEmail } from "@/lib/email/resend";
import {
  sendCodeSchema,
  verifyCodeSchema,
  bindEmailSchema,
} from "@/lib/validations/auth";
import type {
  SendCodeResult,
  VerifyCodeResult,
  BindEmailResult,
} from "@/types/auth";

/**
 * 发送验证码
 */
export async function sendVerificationCode(
  formData: FormData
): Promise<SendCodeResult> {
  try {
    const email = formData.get("email") as string;

    // 验证输入
    const validation = sendCodeSchema.safeParse({ email });
    if (!validation.success) {
      return {
        success: false,
        error: {
          message: validation.error.issues[0].message,
        },
      };
    }

    const pool = createPool();

    try {
      // 创建验证码（返回明文验证码）
      const createResult = await createVerificationCode(pool, email);
      if (!createResult.success || !createResult.code) {
        return {
          success: false,
          error: {
            message: createResult.error || "errors.sendCodeFailed",
          },
        };
      }

      // 发送验证码邮件
      const emailResult = await sendVerificationCodeEmail(
        email,
        createResult.code
      );
      if (!emailResult.success) {
        return {
          success: false,
          error: {
            message: emailResult.error || "errors.emailSendFailed",
          },
        };
      }

      return {
        success: true,
      };
    } finally {
      await pool.end();
    }
  } catch (error) {
    console.error("Send verification code error:", error);
    return {
      success: false,
      error: {
        message: "errors.sendCodeFailed",
      },
    };
  }
}

/**
 * 验证验证码并登录
 */
export async function verifyCode(
  formData: FormData
): Promise<VerifyCodeResult> {
  try {
    const email = formData.get("email") as string;
    const code = formData.get("code") as string;

    // 验证输入
    const validation = verifyCodeSchema.safeParse({ email, code });
    if (!validation.success) {
      return {
        success: false,
        error: {
          message: validation.error.issues[0].message,
        },
      };
    }

    // 使用 Auth.js 的 Credentials Provider 登录
    // 验证码验证在 Credentials Provider 的 authorize 函数中完成
    try {
      const result = await signIn("credentials", {
        email,
        code,
        redirect: false,
      });

      if (result?.error) {
        // 根据错误类型返回更具体的错误信息
        if (result.error === "CredentialsSignin") {
          return {
            success: false,
            error: {
              message: "errors.codeInvalid",
            },
          };
        }
        return {
          success: false,
          error: {
            message: "errors.loginFailed",
          },
        };
      }

      return {
        success: true,
        requiresRedirect: true,
      };
    } catch (signInError) {
      console.error("Sign in error:", signInError);
      return {
        success: false,
        error: {
          message: "errors.loginFailed",
        },
      };
    }
  } catch (error) {
    console.error("Verify code error:", error);
    return {
      success: false,
      error: {
        message: "errors.verifyCodeFailed",
      },
    };
  }
}

/**
 * 绑定邮箱（OAuth 用户）
 */
export async function bindEmail(
  formData: FormData,
  userId?: string
): Promise<BindEmailResult> {
  try {
    const email = formData.get("email") as string;
    const code = formData.get("code") as string;

    // 验证输入
    const validation = bindEmailSchema.safeParse({ email, code });
    if (!validation.success) {
      return {
        success: false,
        error: {
          message: validation.error.issues[0].message,
        },
      };
    }

    if (!userId) {
      return {
        success: false,
        error: {
          message: "errors.loginRequired",
        },
      };
    }

    const pool = createPool();

    try {
      // 检查邮箱是否已被其他用户使用
      const emailUsed = await isEmailUsedByOtherUser(
        pool,
        email,
        parseInt(userId)
      );

      if (emailUsed) {
        return {
          success: false,
          error: {
            message: "errors.emailAlreadyUsed",
          },
        };
      }

      // 验证验证码
      const verifyResult = await verifyCodeInDb(pool, email, code);
      if (!verifyResult.success) {
        return {
          success: false,
          error: {
            message: verifyResult.error || "errors.codeInvalid",
          },
        };
      }

      // 更新用户邮箱
      await updateUserEmail(pool, parseInt(userId), email);

      return {
        success: true,
      };
    } finally {
      await pool.end();
    }
  } catch (error) {
    console.error("Bind email error:", error);
    return {
      success: false,
      error: {
        message: "errors.bindEmailFailed",
      },
    };
  }
}
