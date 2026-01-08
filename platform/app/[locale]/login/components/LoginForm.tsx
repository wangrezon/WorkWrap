"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const t = useTranslations("login");
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSendingCode, setIsSendingCode] = React.useState(false);
  const [countdown, setCountdown] = React.useState(0);
  const [errors, setErrors] = React.useState<{ email?: string; code?: string }>({});

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
    setIsSendingCode(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSendingCode(false);
    setCountdown(60);
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
    setIsLoading(true);
    
    // Simulate login API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    // Handle successful login here
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
            disabled={countdown > 0}
            isLoading={isSendingCode}
            className="shrink-0 min-w-[120px]"
          >
            {countdown > 0 ? `${countdown}s` : t("sendCode")}
          </Button>
        </div>
      </div>
      
      <Button
        type="submit"
        className="w-full mt-6"
        size="lg"
        isLoading={isLoading}
      >
        {t("login")}
      </Button>
    </form>
  );
}
