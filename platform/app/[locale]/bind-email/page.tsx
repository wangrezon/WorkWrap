import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { BindEmailForm } from "./components/BindEmailForm";

export default async function BindEmailPage() {
  const session = await auth();

  // 如果未登录，重定向到登录页
  if (!session) {
    redirect("/login");
  }

  // 如果已有邮箱，重定向到首页
  if (session.user?.email) {
    redirect("/");
  }

  // 传递用户 ID 给客户端组件
  const userId = session.user?.id;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 shadow-2xl shadow-black/20">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-slate-50 mb-2">
              绑定邮箱
            </h1>
            <p className="text-slate-400 text-sm">
              为了更好的体验，请绑定您的邮箱地址
            </p>
          </div>

          <BindEmailForm userId={userId} />
        </div>
      </div>
    </div>
  );
}
