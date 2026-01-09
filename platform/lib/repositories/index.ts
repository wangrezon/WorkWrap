/**
 * 数据库操作统一导出
 */

// 数据库连接
export { createPool } from "./pool";

// 用户相关操作
export {
  getUserByEmail,
  createUser,
  updateUserEmailVerified,
  updateUserEmail,
  isEmailUsedByOtherUser,
  getUserById,
  type UserInfo,
} from "./users";

// 验证码相关操作
export { createVerificationCode, verifyCode } from "./verification";
