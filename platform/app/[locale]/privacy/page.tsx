"use client";

import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  FileText,
  Shield,
  Users,
  AlertCircle,
  Database,
  Lock,
  Eye,
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

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-slate-900 overflow-y-auto">
      {/* Privacy Content */}
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
            Privacy Policy
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
            At WorkWrap, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you use our service. Please read this policy
            carefully to understand our practices regarding your personal data.
          </p>
        </div>

        {/* Section 1: Information We Collect */}
        <section id="information-collected" className="mb-12 scroll-mt-8">
          <SectionHeader
            icon={Database}
            title="1. Information We Collect"
            description="We collect information that you provide directly to us and information that is automatically collected when you use our service."
          />
          <SectionContent>
            <p>
              We collect several types of information from and about users of
              our Service:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-300">
              <li>
                <strong>Account Information:</strong> When you create an
                account, we collect your email address and any other information
                you choose to provide.
              </li>
              <li>
                <strong>Usage Data:</strong> We automatically collect
                information about how you access and use the Service, including
                your IP address, browser type, device information, and usage
                patterns.
              </li>
              <li>
                <strong>Content Data:</strong> We store the work activities,
                commitments, and other content you create or upload through the
                Service.
              </li>
              <li>
                <strong>Authentication Data:</strong> We use secure
                authentication methods, including OAuth providers (such as
                GitHub) and email verification codes.
              </li>
            </ul>
            <p>
              We do not collect sensitive personal information such as payment
              card details, government-issued identification numbers, or
              biometric data unless explicitly required for specific features.
            </p>
          </SectionContent>
        </section>

        {/* Section 2: How We Use Your Information */}
        <section id="how-we-use" className="mb-12 scroll-mt-8">
          <SectionHeader
            icon={Eye}
            title="2. How We Use Your Information"
            description="We use the information we collect to provide, maintain, and improve our Service."
          />
          <SectionContent>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-300">
              <li>
                To provide, maintain, and improve the Service and its features
              </li>
              <li>To authenticate your identity and secure your account</li>
              <li>To process your requests and transactions</li>
              <li>
                To communicate with you about your account, service updates, and
                important notices
              </li>
              <li>
                To detect, prevent, and address technical issues, security
                threats, or fraudulent activity
              </li>
              <li>
                To comply with legal obligations and enforce our Terms of
                Service
              </li>
              <li>To analyze usage patterns and improve user experience</li>
            </ul>
            <p>
              We do not use your personal information for advertising purposes
              or share it with third-party advertisers without your explicit
              consent.
            </p>
          </SectionContent>
        </section>

        {/* Section 3: Data Storage and Security */}
        <section id="data-security" className="mb-12 scroll-mt-8">
          <SectionHeader
            icon={Lock}
            title="3. Data Storage and Security"
            description="We implement industry-standard security measures to protect your personal information."
          />
          <SectionContent>
            <p>
              We take the security of your personal information seriously and
              implement appropriate technical and organizational measures to
              protect it:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-300">
              <li>
                <strong>Encryption:</strong> We use encryption in transit
                (HTTPS/TLS) and at rest to protect your data
              </li>
              <li>
                <strong>Access Controls:</strong> We limit access to personal
                information to authorized personnel who need it to perform their
                job functions
              </li>
              <li>
                <strong>Secure Authentication:</strong> We use industry-standard
                authentication methods, including OAuth and secure password
                hashing
              </li>
              <li>
                <strong>Regular Security Audits:</strong> We conduct regular
                security assessments and updates
              </li>
            </ul>
            <p>
              However, no method of transmission over the Internet or method of
              electronic storage is 100% secure. While we strive to use
              commercially acceptable means to protect your personal
              information, we cannot guarantee its absolute security.
            </p>
            <p>
              Your data is stored on secure servers, and we retain your
              information for as long as necessary to provide the Service and
              comply with legal obligations.
            </p>
          </SectionContent>
        </section>

        {/* Section 4: Information Sharing and Disclosure */}
        <section id="information-sharing" className="mb-12 scroll-mt-8">
          <SectionHeader
            icon={Users}
            title="4. Information Sharing and Disclosure"
            description="We do not sell your personal information. We only share it in limited circumstances as described below."
          />
          <SectionContent>
            <p>
              We do not sell, rent, or trade your personal information to third
              parties. We may share your information only in the following
              circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-300">
              <li>
                <strong>Service Providers:</strong> We may share information
                with trusted third-party service providers who assist us in
                operating our Service, such as hosting providers, email service
                providers, and analytics services. These providers are
                contractually obligated to protect your information and use it
                only for the purposes we specify.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose your
                information if required by law, regulation, legal process, or
                governmental request.
              </li>
              <li>
                <strong>Protection of Rights:</strong> We may disclose
                information to protect our rights, privacy, safety, or property,
                or that of our users or others.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger,
                acquisition, or sale of assets, your information may be
                transferred as part of that transaction.
              </li>
            </ul>
            <p>
              We do not share your personal information with third parties for
              their marketing purposes.
            </p>
          </SectionContent>
        </section>

        {/* Section 5: Your Rights and Choices */}
        <section id="your-rights" className="mb-12 scroll-mt-8">
          <SectionHeader
            icon={Shield}
            title="5. Your Rights and Choices"
            description="You have certain rights regarding your personal information, including the right to access, update, or delete your data."
          />
          <SectionContent>
            <p>
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-300">
              <li>
                <strong>Access:</strong> You can access and review your personal
                information through your account settings
              </li>
              <li>
                <strong>Update:</strong> You can update or correct your personal
                information at any time through your account settings
              </li>
              <li>
                <strong>Deletion:</strong> You can request deletion of your
                account and associated data by contacting us at{" "}
                <a
                  href="mailto:workwrap@rozen.wang"
                  className="text-sky-500 hover:text-sky-400 transition-colors"
                >
                  workwrap@rozen.wang
                </a>{" "}
                or using account deletion features
              </li>
              <li>
                <strong>Data Portability:</strong> You can request a copy of
                your data in a machine-readable format
              </li>
              <li>
                <strong>Opt-Out:</strong> You can opt out of certain data
                collection practices, though this may limit your ability to use
                some features
              </li>
            </ul>
            <p>
              To exercise these rights, please contact us at{" "}
              <a
                href="mailto:workwrap@rozen.wang"
                className="text-sky-500 hover:text-sky-400 transition-colors"
              >
                workwrap@rozen.wang
              </a>{" "}
              or use the account management features provided. We will respond
              to your request within a reasonable timeframe.
            </p>
            <p>
              If you are located in the European Economic Area (EEA) or other
              jurisdictions with similar data protection laws, you may have
              additional rights under applicable data protection regulations,
              such as the General Data Protection Regulation (GDPR).
            </p>
          </SectionContent>
        </section>

        {/* Section 6: Cookies and Tracking Technologies */}
        <section id="cookies" className="mb-12 scroll-mt-8">
          <SectionHeader
            icon={FileText}
            title="6. Cookies and Tracking Technologies"
            description="We use cookies and similar technologies to enhance your experience and analyze Service usage."
          />
          <SectionContent>
            <p>
              We use cookies and similar tracking technologies to collect and
              store information about your use of the Service. Cookies are small
              data files stored on your device that help us:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-300">
              <li>Remember your preferences and settings</li>
              <li>Authenticate your session and maintain security</li>
              <li>Analyze how you use the Service to improve functionality</li>
              <li>Provide personalized features and content</li>
            </ul>
            <p>
              You can control cookies through your browser settings. However,
              disabling cookies may limit your ability to use certain features
              of the Service.
            </p>
            <p>
              We may also use third-party analytics services that use cookies
              and similar technologies to analyze Service usage. These services
              are subject to their own privacy policies.
            </p>
          </SectionContent>
        </section>

        {/* Section 7: Children&apos;s Privacy */}
        <section id="children-privacy" className="mb-12 scroll-mt-8">
          <SectionHeader
            icon={AlertCircle}
            title="7. Children's Privacy"
            description="Our Service is not intended for children under the age of 13."
          />
          <SectionContent>
            <p>
              Our Service is not intended for children under the age of 13. We
              do not knowingly collect personal information from children under
              13. If you are a parent or guardian and believe that your child
              has provided us with personal information, please contact us at{" "}
              <a
                href="mailto:workwrap@rozen.wang"
                className="text-sky-500 hover:text-sky-400 transition-colors"
              >
                workwrap@rozen.wang
              </a>{" "}
              immediately.
            </p>
            <p>
              If we become aware that we have collected personal information
              from a child under 13 without parental consent, we will take steps
              to delete that information as soon as possible.
            </p>
          </SectionContent>
        </section>

        {/* Section 8: International Data Transfers */}
        <section id="international-transfers" className="mb-12 scroll-mt-8">
          <SectionHeader
            icon={Database}
            title="8. International Data Transfers"
            description="Your information may be transferred to and processed in countries other than your country of residence."
          />
          <SectionContent>
            <p>
              Your information may be transferred to and processed in countries
              other than your country of residence. These countries may have
              data protection laws that differ from those in your country.
            </p>
            <p>
              By using the Service, you consent to the transfer of your
              information to these countries. We take appropriate measures to
              ensure that your information receives an adequate level of
              protection in accordance with this Privacy Policy and applicable
              data protection laws.
            </p>
          </SectionContent>
        </section>

        {/* Section 9: Changes to This Privacy Policy */}
        <section id="policy-changes" className="mb-12 scroll-mt-8">
          <SectionHeader
            icon={FileText}
            title="9. Changes to This Privacy Policy"
            description="We may update this Privacy Policy from time to time, and we will notify you of any material changes."
          />
          <SectionContent>
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, technology, legal requirements, or other
              factors. We will notify you of any material changes by posting the
              new Privacy Policy on this page and updating the &quot;Last
              updated&quot; date.
            </p>
            <p>
              We encourage you to review this Privacy Policy periodically to
              stay informed about how we collect, use, and protect your
              information. Your continued use of the Service after any changes
              to this Privacy Policy constitutes your acceptance of the updated
              policy.
            </p>
          </SectionContent>
        </section>

        {/* Section 10: Contact Us */}
        <section id="contact" className="mb-12 scroll-mt-8">
          <SectionHeader
            icon={Users}
            title="10. Contact Us"
            description="If you have any questions or concerns about this Privacy Policy, please contact us."
          />
          <SectionContent>
            <p>
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us at{" "}
              <a
                href="mailto:workwrap@rozen.wang"
                className="text-sky-500 hover:text-sky-400 transition-colors"
              >
                workwrap@rozen.wang
              </a>
              .
            </p>
            <p>
              For privacy-related inquiries or to exercise your rights regarding
              your personal information, please send an email to{" "}
              <a
                href="mailto:workwrap@rozen.wang"
                className="text-sky-500 hover:text-sky-400 transition-colors"
              >
                workwrap@rozen.wang
              </a>{" "}
              and provide sufficient detail to allow us to address your request
              effectively.
            </p>
          </SectionContent>
        </section>
      </div>
    </div>
  );
}
