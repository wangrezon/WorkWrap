import {
  GitCommit,
  FileText,
  Calendar,
  Sparkles,
  Terminal,
  ArrowRight,
  CheckCircle2,
  Code2,
  Zap,
  Shield,
  Download,
  Github,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-7xl">
        <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl px-6 py-4 shadow-sm">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/avatar.webp"
              alt="WorkWrap"
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg"
            />
            <span className="text-xl font-bold text-slate-900">WorkWrap</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-md"
            >
              Start free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                AI-powered productivity for developers
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              Your code is your craft
              <br />
              <span className="bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Reporting is AI&apos;s job
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mb-10 text-xl text-slate-600 sm:text-2xl">
              Git + LLM powered automation for commit messages, daily and weekly
              reports
              <br />
              Keep developers focused on building, not writing reports
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/login"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl sm:w-auto"
              >
                Get started
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#install"
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-8 py-4 text-lg font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
              >
                <Terminal className="h-5 w-5" />
                View install guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900">
              Core capabilities
            </h2>
            <p className="text-lg text-slate-600">
              Three AI workflows to free you from writing commit notes and
              reports
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1: Commit Message */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-blue-300 hover:shadow-lg cursor-pointer">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                <GitCommit className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-slate-900">
                Smart commit messages
              </h3>
              <p className="mb-4 text-slate-600">
                AI analyzes your diffs and outputs Conventional Commits to keep
                your repo consistent
              </p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  Multiple commit conventions supported
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  Auto-detect change types
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  One-click commit confirmation
                </li>
              </ul>
            </div>

            {/* Feature 2: Daily Report */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-blue-300 hover:shadow-lg cursor-pointer">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                <FileText className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-slate-900">
                Daily report generation
              </h3>
              <p className="mb-4 text-slate-600">
                Turns today&apos;s commits and working changes into a structured
                daily brief: done, in-progress, blockers, next
              </p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  Auto-summarize code changes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  Multiple report templates
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  Customizable sections
                </li>
              </ul>
            </div>

            {/* Feature 3: Weekly Report */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-blue-300 hover:shadow-lg cursor-pointer">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                <Calendar className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-slate-900">
                Weekly report generation
              </h3>
              <p className="mb-4 text-slate-600">
                Aggregates the week&apos;s commits into a full summary with
                highlights, shipped items, and next-week plan
              </p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  Automatic weekly roll-up
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  Custom week start day
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  Export-ready content
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-slate-50 py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900">
              Why choose WorkWrap?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                Lightning fast
              </h3>
              <p className="text-sm text-slate-600">
                One command, instant reports, focus on code
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                Secure & reliable
              </h3>
              <p className="text-sm text-slate-600">
                Only diff data transmitted, no source code stored
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <Code2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                Developer-friendly
              </h3>
              <p className="text-sm text-slate-600">
                Git-native workflow, seamless integration
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                AI-powered
              </h3>
              <p className="text-sm text-slate-600">
                LLM-powered, understands code changes intelligently
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section id="install" className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900">
              Quick start
            </h2>
            <p className="text-lg text-slate-600">
              Get started in three simple steps
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-900 p-8 shadow-xl">
            <div className="mb-6 flex items-center gap-3">
              <Terminal className="h-6 w-6 text-blue-400" />
              <h3 className="text-xl font-semibold text-white">
                Install CLI tool
              </h3>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg bg-slate-800 p-4">
                <code className="text-sm text-green-400">
                  npm install -g workwrap
                </code>
              </div>
              <div className="rounded-lg bg-slate-800 p-4">
                <code className="text-sm text-green-400">
                  # or use pnpm
                  <br />
                  pnpm add -g workwrap
                </code>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
              <Download className="h-4 w-4" />
              <span>First run automatically opens browser for login setup</span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
              <div className="mb-3 text-3xl font-bold text-blue-600">1</div>
              <h4 className="mb-2 font-semibold text-slate-900">Install CLI</h4>
              <p className="text-sm text-slate-600">
                Global install via npm or pnpm
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
              <div className="mb-3 text-3xl font-bold text-blue-600">2</div>
              <h4 className="mb-2 font-semibold text-slate-900">Sign in</h4>
              <p className="text-sm text-slate-600">
                Auto-opens browser on first use
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
              <div className="mb-3 text-3xl font-bold text-blue-600">3</div>
              <h4 className="mb-2 font-semibold text-slate-900">Start using</h4>
              <p className="text-sm text-slate-600">
                Run commands in your Git repo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Ready to get started?
          </h2>
          <p className="mb-8 text-xl text-blue-100">
            Sign up now, get 1,000 free tokens to try
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="group flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
            >
              Start free
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#install"
              className="rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              View docs
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="mb-4 flex items-center gap-2">
                <Image
                  src="/avatar.webp"
                  alt="WorkWrap"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-lg"
                />
                <span className="text-xl font-bold text-slate-900">
                  WorkWrap
                </span>
              </Link>
              <p className="text-sm text-slate-600">
                Keep developers focused on building value
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-slate-900">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link
                    href="#features"
                    className="transition-colors hover:text-slate-900"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#install"
                    className="transition-colors hover:text-slate-900"
                  >
                    Install guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="transition-colors hover:text-slate-900"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-slate-900">Support</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link
                    href="/docs"
                    className="transition-colors hover:text-slate-900"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="transition-colors hover:text-slate-900"
                  >
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="transition-colors hover:text-slate-900"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-slate-900">Community</h4>
              <div className="flex gap-4">
                <Link
                  href="https://github.com"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="mailto:support@workwrap.com"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
            <p>© 2026 WorkWrap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
