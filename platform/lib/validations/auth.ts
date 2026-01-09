/**
 * 认证相关的数据验证规则
 */
import { z } from "zod";

/**
 * 邮箱验证规则
 */
export const emailSchema = z
  .string()
  .email("errors.emailInvalid")
  .min(1, "errors.emailRequired");

/**
 * 验证码验证规则（6位数字）
 */
export const verificationCodeSchema = z
  .string()
  .length(6, "errors.codeInvalid")
  .regex(/^\d{6}$/, "errors.codeInvalid");

/**
 * 发送验证码请求验证
 */
export const sendCodeSchema = z.object({
  email: emailSchema,
});

/**
 * 验证验证码请求验证
 */
export const verifyCodeSchema = z.object({
  email: emailSchema,
  code: verificationCodeSchema,
});

/**
 * 绑定邮箱请求验证
 */
export const bindEmailSchema = z.object({
  email: emailSchema,
  code: verificationCodeSchema,
});
