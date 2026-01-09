import NextAuth from "next-auth";
import NeonAdapter from "@auth/neon-adapter";
import { Pool } from "@neondatabase/serverless";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { verifyCode as verifyCodeInDb } from "@/lib/repositories/verification";
import { createPool } from "@/lib/repositories/pool";
import {
  getUserByEmail,
  createUser,
  updateUserEmailVerified,
} from "@/lib/repositories/users";

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
            const user = await getUserByEmail(
              pool,
              credentials.email as string
            );

            const userId = user
              ? user.id
              : await createUser(pool, credentials.email as string);

            if (user && !user?.emailVerified) {
              await updateUserEmailVerified(pool, userId);
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
