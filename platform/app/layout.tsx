import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WorkWrap - AI-powered productivity for developers",
  description:
    "Keep coding, let AI handle reporting. WorkWrap integrates Git with LLMs to generate commit messages, daily reports, and weekly summaries so you stay focused on building.",
  icons: {
    icon: "/avatar.ico",
    shortcut: "/avatar.ico",
    apple: "/avatar.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
