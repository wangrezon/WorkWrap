"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendVerificationCode, bindEmail } from "@/lib/actions/auth";

interface BindEmailFormProps {
  userId?: string;
}

export function BindEmailForm({ userId }: BindEmailFormProps) {
  const t = useTranslations("login");
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSendingCode, setIsSendingCode] = React.useState(false);
  const [countdown, setCountdown] = React.useState(0);
  const [errors, setErrors] = React.useState<{ email?: string; code?: string }>(
    {}
  );
  const [successMessage, setSuccessMessage] = React.useState<string>("");

  // Countdown timer for resend code
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendCode = async () => {
    if (!email) {
      setErrors({ email: t("errors.emailRequired") });
      return;
    }
    if (!validateEmail(email)) {
      setErrors({ email: t("errors.emailInvalid") });
      return;
    }

    setErrors({});
    setSuccessMessage("");
    setIsSendingCode(true);

    const formData = new FormData();
    formData.append("email", email);

    const result = await sendVerificationCode(formData);

    setIsSendingCode(false);

    if (result.success) {
      setSuccessMessage(t("codeSent"));
      setCountdown(60);
    } else {
      setErrors({
        email: result.error?.message
          ? t(result.error.message)
          : t("errors.sendCodeFailed"),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; code?: string } = {};

    if (!email) {
      newErrors.email = t("errors.emailRequired");
    } else if (!validateEmail(email)) {
      newErrors.email = t("errors.emailInvalid");
    }

    if (!code) {
      newErrors.code = t("errors.codeRequired");
    } else if (code.length !== 6) {
      newErrors.code = t("errors.codeInvalid");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSuccessMessage("");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("code", code);

    const result = await bindEmail(formData, userId);

    setIsLoading(false);

    if (result.success) {
      // 绑定成功，重定向到首页
      router.push("/");
      router.refresh();
    } else {
      setErrors({
        code: result.error?.message
          ? t(result.error.message)
          : t("errors.bindEmailFailed"),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        type="email"
        label={t("email")}
        placeholder={t("emailPlaceholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        autoComplete="email"
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">
          {t("verificationCode")}
        </label>
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder={t("codePlaceholder")}
            value={code}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 6);
              setCode(value);
            }}
            error={errors.code}
            className="flex-1"
            autoComplete="one-time-code"
            inputMode="numeric"
            maxLength={6}
          />
          <Button
            type="button"
            variant="secondary"
            onClick={handleSendCode}
            disabled={countdown > 0 || isSendingCode}
            isLoading={isSendingCode}
            className="shrink-0 min-w-[120px]"
          >
            {countdown > 0 ? `${countdown}s` : t("sendCode")}
          </Button>
        </div>
        {successMessage && (
          <p className="text-sm text-green-400 mt-2">{successMessage}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full mt-6"
        size="lg"
        isLoading={isLoading}
      >
        绑定邮箱
      </Button>
    </form>
  );
}
