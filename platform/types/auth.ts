/**
 * 认证相关的 TypeScript 类型定义
 */

export interface AuthError {
  message: string;
  code?: string;
}

export interface SendCodeResult {
  success: boolean;
  error?: AuthError;
}

export interface VerifyCodeResult {
  success: boolean;
  error?: AuthError;
  requiresRedirect?: boolean;
}

export interface BindEmailResult {
  success: boolean;
  error?: AuthError;
}

export interface VerificationCodeRecord {
  id: number;
  email: string;
  code: string;
  expiresAt: Date;
  attempts: number;
  lockedUntil: Date | null;
  createdAt: Date;
}
