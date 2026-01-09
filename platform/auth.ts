import NextAuth from "next-auth";
import NeonAdapter from "@auth/neon-adapter";
import { Pool } from "@neondatabase/serverless";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { verifyCode as verifyCodeInDb } from "@/lib/db/verification";
import { createPool } from "@/lib/db/pool";

// 注意：Pool 必须在请求处理器内部创建
// 这里我们导出一个函数来创建配置
export const { handlers, signIn, signOut, auth } = NextAuth((req) => {
  // 在请求处理器内部创建 Pool
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  return {
    adapter: NeonAdapter(pool),
    providers: [
      GitHub({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
      }),
      // Credentials Provider 用于验证码登录
      Credentials({
        name: "Email Verification Code",
        credentials: {
          email: { label: "Email", type: "email" },
          code: { label: "Verification Code", type: "text" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.code) {
            console.error("Credentials missing:", {
              email: !!credentials?.email,
              code: !!credentials?.code,
            });
            return null;
          }

          const pool = createPool();
          try {
            // 验证验证码
            const result = await verifyCodeInDb(
              pool,
              credentials.email as string,
              credentials.code as string
            );

            if (!result.success) {
              console.error("Verification failed:", result.error);
              return null;
            }

            // 查询或创建用户
            const userResult = await pool.query<{
              id: number;
              email: string;
              name: string | null;
              emailVerified: Date | null;
            }>(
              `SELECT id, email, name, "emailVerified" FROM users WHERE email = $1`,
              [credentials.email]
            );

            let userId: number;
            if (userResult.rows.length === 0) {
              // 创建新用户（登录即注册）
              const insertResult = await pool.query<{ id: number }>(
                `INSERT INTO users (email, "emailVerified", name)
                 VALUES ($1, NOW(), $2)
                 RETURNING id`,
                [credentials.email, null]
              );
              userId = insertResult.rows[0].id;
            } else {
              userId = userResult.rows[0].id;
              // 更新邮箱验证时间
              if (!userResult.rows[0].emailVerified) {
                await pool.query(
                  `UPDATE users SET "emailVerified" = NOW() WHERE id = $1`,
                  [userId]
                );
              }
            }

            return {
              id: userId.toString(),
              email: credentials.email as string,
            };
          } catch (error) {
            console.error("Authorization error:", error);
            // 记录详细错误信息以便调试
            if (error instanceof Error) {
              console.error("Error details:", {
                message: error.message,
                stack: error.stack,
              });
            }
            return null;
          } finally {
            await pool.end();
          }
        },
      }),
    ],
    pages: {
      signIn: "/login",
      error: "/login",
    },
    callbacks: {
      async signIn({ user, account, profile }) {
        // OAuth 登录后，如果用户没有邮箱，重定向到邮箱绑定页面
        if (account?.provider === "github" && !user.email) {
          // 这里可以通过返回 URL 来重定向
          // 但更好的方式是在登录后检查并重定向
          return true; // 允许登录，稍后在页面中处理重定向
        }
        return true;
      },
      async session({ session, user }) {
        if (session.user) {
          session.user.id = user.id.toString();
        }
        return session;
      },
    },
    session: {
      strategy: "database",
    },
  };
});
