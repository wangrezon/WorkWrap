import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { GitCommit, FileText, Calendar } from "lucide-react";
import { LoginForm } from "./components/LoginForm";
import { OAuthButtons } from "./components/OAuthButtons";

function FeatureItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className="shrink-0 w-10 h-10 rounded-lg bg-sky-700/20 border border-sky-700/30 flex items-center justify-center">
        <Icon className="w-5 h-5 text-sky-400" />
      </div>
      <div>
        <h3 className="text-slate-50 font-medium mb-1">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const t = useTranslations("login");

  return (
    <div className="min-h-screen flex bg-slate-900">
      {/* Left side - Branding */}
      <div className="w-1/2 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-12 flex flex-col justify-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148, 163, 184) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-sky-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-lg mx-auto">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4 mb-8">
            <Image
              src="/avatar.webp"
              alt="WorkWrap Logo"
              width={64}
              height={64}
              className="rounded-2xl shadow-lg shadow-black/20"
            />
            <div>
              <h1 className="text-3xl font-bold text-slate-50 font-heading">
                WorkWrap
              </h1>
              <p className="text-slate-400 text-sm">{t("subtitle")}</p>
            </div>
          </div>

          {/* Tagline */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-50 mb-3 leading-tight">
              {t("tagline")}
            </h2>
            <p className="text-slate-400 leading-relaxed">{t("description")}</p>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <FeatureItem
              icon={GitCommit}
              title={t("features.commit.title")}
              description={t("features.commit.description")}
            />
            <FeatureItem
              icon={FileText}
              title={t("features.daily.title")}
              description={t("features.daily.description")}
            />
            <FeatureItem
              icon={Calendar}
              title={t("features.weekly.title")}
              description={t("features.weekly.description")}
            />
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-1/2 bg-slate-900 p-12 flex items-center justify-center relative">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-bl from-slate-800/50 via-transparent to-transparent" />

        <div className="relative z-10 w-full max-w-md">
          {/* Glass card */}
          <div className="backdrop-blur-xl bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 shadow-2xl shadow-black/20">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-slate-50 mb-2">
                {t("welcomeBack")}
              </h2>
              <p className="text-slate-400 text-sm">{t("loginPrompt")}</p>
            </div>

            <LoginForm />

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-800/50 text-slate-500">
                  {t("or")}
                </span>
              </div>
            </div>

            <OAuthButtons />

            {/* Terms */}
            <p className="mt-8 text-center text-xs text-slate-500 leading-relaxed">
              {t("terms.prefix")}{" "}
              <Link
                href="/terms"
                className="text-sky-500 hover:text-sky-400 transition-colors"
              >
                {t("terms.service")}
              </Link>{" "}
              {t("terms.and")}{" "}
              <Link
                href="/privacy"
                className="text-sky-500 hover:text-sky-400 transition-colors"
              >
                {t("terms.privacy")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
