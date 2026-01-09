/**
 * Neon 数据库 Pool 工具函数
 *
 * 注意：在 serverless 环境中，Pool 应该在请求处理器内部创建
 * 这里提供一个工具函数，但实际使用时需要在请求处理器内部调用
 */
import { Pool } from "@neondatabase/serverless";

/**
 * 创建 Neon 数据库 Pool
 *
 * ⚠️ 重要：在 serverless 环境中，必须在请求处理器内部调用此函数
 * 不要在模块级别创建 Pool
 */
export function createPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  return new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}
