import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("hello");

  return (
    <main>
      <h1>{t("world")}</h1>
    </main>
  );
}
