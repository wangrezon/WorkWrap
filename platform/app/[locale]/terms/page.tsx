"use client";

import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  FileText,
  Shield,
  Users,
  AlertCircle,
  Scale,
  ArrowLeft,
} from "lucide-react";

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 items-start mb-6">
      <div className="shrink-0 w-12 h-12 rounded-lg bg-sky-700/20 border border-sky-700/30 flex items-center justify-center">
        <Icon className="w-6 h-6 text-sky-400" />
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-slate-50 mb-2">{title}</h2>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function SectionContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose prose-invert prose-slate max-w-none">
      <div className="text-slate-300 leading-relaxed space-y-4">{children}</div>
    </div>
  );
}

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-slate-900 overflow-y-auto">
      {/* Terms Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 pb-24">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sky-500 hover:text-sky-400 transition-colors mb-8 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-50 mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-400 text-sm">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Introduction */}
        <div className="backdrop-blur-xl bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 mb-8 shadow-2xl shadow-black/20">
          <p className="text-slate-300 leading-relaxed">
            Welcome to WorkWrap. By accessing or using our service, you agree to
            be bound by these Terms of Service. If you disagree with any part of
            these terms, you may not access the service.
          </p>
        </div>

        {/* Section 1: Acceptance */}
        <section id="acceptance" className="mb-12 scroll-mt-8">
          <SectionHeader
            icon={Scale}
            title="1. Acceptance of Terms"
            description="By using WorkWrap, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service."
          />
          <SectionContent>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your access to
              and use of WorkWrap&apos;s services, including our website,
              applications, and any related services (collectively, the
              &quot;Service&quot;). By accessing or using the Service, you agree
              to comply with and be bound by these Terms.
            </p>
            <p>
              If you do not agree to these Terms, you may not use the Service.
              We reserve the right to modify these Terms at any time, and such
              modifications will be effective immediately upon posting. Your
              continued use of the Service after any such modifications
              constitutes your acceptance of the modified Terms.
            </p>
          </SectionContent>
        </section>

        {/* Section 2: Service Description */}
        <section id="service-description" className="mb-12 scroll-mt-8">
          <SectionHeader
            icon={FileText}
            title="2. Service Description"
            description="WorkWrap provides a platform for tracking and managing your work-related activities and commitments."
          />
          <SectionContent>
            <p>
              WorkWrap is a service that enables users to track their work
              activities, manage daily and weekly commitments, and organize
              their professional workflow. The Service includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-300">
              <li>Work activity tracking and logging</li>
              <li>Daily and weekly commitment management</li>
              <li>User account management and authentication</li>
              <li>Data storage and synchronization</li>
            </ul>
            <p>
              We reserve the right to modify, suspend, or discontinue any aspect
              of the Service at any time, with or without notice. We will not be
              liable to you or any third party for any modification, suspension,
              or discontinuation of the Service.
            </p>
          </SectionContent>
        </section>

        {/* Section 3: User Responsibilities */}
        <section id="user-responsibilities" className="mb-12 scroll-mt-8">
          <SectionHeader
            icon={Users}
            title="3. User Responsibilities"
            description="As a user of WorkWrap, you are responsible for maintaining the security of your account and using the Service appropriately."
          />
          <SectionContent>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your
              account. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-300">
              <li>
                Provide accurate, current, and complete information when
                creating an account
              </li>
              <li>
                Maintain and promptly update your account information to keep it
                accurate, current, and complete
              </li>
              <li>Maintain the security of your password and identification</li>
              <li>
                Notify us immediately of any unauthorized use of your account or
                any other breach of security
              </li>
              <li>
                Use the Service only for lawful purposes and in accordance with
                these Terms
              </li>
              <li>
                Not use the Service to transmit any harmful, offensive, or
                illegal content
              </li>
            </ul>
            <p>
              You are solely responsible for all content you upload, post, or
              otherwise transmit through the Service. We do not claim ownership
              of your content, but by using the Service, you grant us a license
              to use, store, and process your content as necessary to provide
              the Service.
            </p>
          </SectionContent>
        </section>

        {/* Section 4: Limitations of Liability */}
        <section id="limitations" className="mb-12 scroll-mt-8">
          <SectionHeader
            icon={AlertCircle}
            title="4. Limitations of Liability"
            description="We strive to provide a reliable service, but we cannot guarantee that the Service will be uninterrupted or error-free."
          />
          <SectionContent>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, WORKWRAP AND
              ITS AFFILIATES, OFFICERS, EMPLOYEES, AGENTS, PARTNERS, AND
              LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT
              LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER
              INTANGIBLE LOSSES, RESULTING FROM YOUR USE OR INABILITY TO USE THE
              SERVICE.
            </p>
            <p>
              IN NO EVENT SHALL WORKWRAP&apos;S TOTAL LIABILITY TO YOU FOR ALL
              DAMAGES EXCEED THE AMOUNT YOU PAID TO WORKWRAP IN THE TWELVE (12)
              MONTHS PRIOR TO THE ACTION GIVING RISE TO THE LIABILITY, OR ONE
              HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.
            </p>
            <p>
              The Service is provided &quot;AS IS&quot; and &quot;AS
              AVAILABLE&quot; without warranties of any kind, either express or
              implied, including but not limited to implied warranties of
              merchantability, fitness for a particular purpose, or
              non-infringement.
            </p>
          </SectionContent>
        </section>

        {/* Section 5: Privacy and Data */}
        <section id="privacy" className="mb-12 scroll-mt-8">
          <SectionHeader
            icon={Shield}
            title="5. Privacy and Data Protection"
            description="We are committed to protecting your privacy and handling your data responsibly."
          />
          <SectionContent>
            <p>
              Your privacy is important to us. Our collection and use of
              personal information is governed by our Privacy Policy, which is
              incorporated into these Terms by reference. By using the Service,
              you consent to the collection and use of your information as
              described in our Privacy Policy.
            </p>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal data against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the Internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security.
            </p>
            <p>
              You retain ownership of all data you submit to the Service. We
              will not sell, rent, or share your personal information with third
              parties except as described in our Privacy Policy or as required
              by law.
            </p>
          </SectionContent>
        </section>

        {/* Section 6: Termination */}
        <section id="termination" className="mb-12 scroll-mt-8">
          <SectionHeader
            icon={AlertCircle}
            title="6. Termination"
            description="You may terminate your account at any time, and we reserve the right to suspend or terminate accounts that violate these Terms."
          />
          <SectionContent>
            <p>
              You may terminate your account at any time by contacting us at{" "}
              <a
                href="mailto:workwrap@rozen.wang"
                className="text-sky-500 hover:text-sky-400 transition-colors"
              >
                workwrap@rozen.wang
              </a>{" "}
              or using the account deletion features provided in the Service.
              Upon termination, your right to use the Service will immediately
              cease.
            </p>
            <p>
              We reserve the right to suspend or terminate your account and
              access to the Service immediately, without prior notice or
              liability, for any reason, including but not limited to a breach
              of these Terms.
            </p>
            <p>
              Upon termination, your account and all data associated with it may
              be deleted. We are not obligated to retain your data after
              termination, and you are responsible for backing up any data you
              wish to retain.
            </p>
          </SectionContent>
        </section>

        {/* Section 7: Changes to Terms */}
        <section id="changes" className="mb-12 scroll-mt-8">
          <SectionHeader
            icon={FileText}
            title="7. Changes to Terms"
            description="We may update these Terms from time to time, and we will notify you of any material changes."
          />
          <SectionContent>
            <p>
              We reserve the right to modify or replace these Terms at any time
              at our sole discretion. If we make material changes to these
              Terms, we will notify you by posting the new Terms on this page
              and updating the &quot;Last updated&quot; date.
            </p>
            <p>
              Your continued use of the Service after any such changes
              constitutes your acceptance of the new Terms. If you do not agree
              to the modified Terms, you must stop using the Service and may
              delete your account.
            </p>
          </SectionContent>
        </section>

        {/* Section 8: Contact */}
        <section id="contact" className="mb-12 scroll-mt-8">
          <SectionHeader
            icon={Users}
            title="8. Contact Information"
            description="If you have any questions about these Terms, please contact us."
          />
          <SectionContent>
            <p>
              If you have any questions or concerns about these Terms of
              Service, please contact us at{" "}
              <a
                href="mailto:workwrap@rozen.wang"
                className="text-sky-500 hover:text-sky-400 transition-colors"
              >
                workwrap@rozen.wang
              </a>
              .
            </p>
            <p>
              For legal inquiries or notices, please send an email to{" "}
              <a
                href="mailto:workwrap@rozen.wang"
                className="text-sky-500 hover:text-sky-400 transition-colors"
              >
                workwrap@rozen.wang
              </a>{" "}
              and ensure you provide sufficient detail to allow us to address
              your concerns effectively.
            </p>
          </SectionContent>
        </section>
      </div>
    </div>
  );
}
