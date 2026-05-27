import { LegalPage } from "../components/LegalPage";

export const metadata = {
  title: "Privacy Policy · Wavly",
  description:
    "How Wavly collects, uses, stores, and protects your information.",
};

const toc = [
  { id: "introduction", label: "Introduction" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use", label: "How We Use Your Information" },
  { id: "whatsapp-data", label: "WhatsApp Data Handling" },
  { id: "cookies", label: "Cookies & Tracking" },
  { id: "security", label: "Data Security" },
  { id: "sharing", label: "Sharing Your Data" },
  { id: "your-rights", label: "Your Rights" },
  { id: "childrens-privacy", label: "Children's Privacy" },
  { id: "international", label: "International Transfers" },
  { id: "changes", label: "Changes to This Policy" },
  { id: "contact", label: "Contact Us" },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="27 May 2026"
      intro="At Wavly, we take your privacy seriously. This policy explains what data we collect, how we use it, and the controls you have."
      toc={toc}
    >
      <section id="introduction">
        <h2>Introduction</h2>
        <p>
          This Privacy Policy explains how Wavly (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;, &ldquo;our&rdquo;) collects, uses, stores, and
          protects your information when you use our AI-powered WhatsApp
          automation platform (the &ldquo;Service&rdquo;). By using Wavly, you
          agree to the practices described here.
        </p>
        <p>
          We comply with India&apos;s{" "}
          <strong>Digital Personal Data Protection Act, 2023</strong>, the{" "}
          <strong>Information Technology Act, 2000</strong>, and applicable
          international laws including GDPR for our EU users.
        </p>
      </section>

      <section id="information-we-collect">
        <h2>Information We Collect</h2>
        <h3>Information you provide directly</h3>
        <ul>
          <li>
            <strong>Account information:</strong> name, email address, business
            name, phone number
          </li>
          <li>
            <strong>Payment information:</strong> processed by our payment
            partners — we do not store full card details
          </li>
          <li>
            <strong>WhatsApp Business details:</strong> business number and
            information required to connect to the Meta WhatsApp Business API
          </li>
          <li>
            <strong>Customer chat data:</strong> messages and contacts that
            flow through your WhatsApp Business account via Wavly
          </li>
        </ul>
        <h3>Information we collect automatically</h3>
        <ul>
          <li>Usage data — pages visited, features used, time spent</li>
          <li>Device data — browser type, IP address, operating system</li>
          <li>Cookies and similar technologies (see below)</li>
        </ul>
      </section>

      <section id="how-we-use">
        <h2>How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide, maintain and improve the Service</li>
          <li>Process payments and send billing communications</li>
          <li>Personalize your experience and recommend automations</li>
          <li>Send service updates, security alerts and support messages</li>
          <li>Comply with legal obligations and prevent fraud</li>
          <li>
            Train our AI models — only on{" "}
            <strong>anonymized, aggregated data</strong>. We never train on
            your individual customer chats unless you explicitly opt in.
          </li>
        </ul>
      </section>

      <section id="whatsapp-data">
        <h2>WhatsApp Data Handling</h2>
        <p>
          Wavly connects to your WhatsApp Business account through Meta&apos;s
          official WhatsApp Business API. We follow strict practices around
          your messaging data:
        </p>
        <ul>
          <li>
            We only access messages sent to or from{" "}
            <strong>your business number</strong> — never your personal
            WhatsApp account
          </li>
          <li>All message data is encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
          <li>
            We comply with Meta&apos;s{" "}
            <strong>WhatsApp Business Messaging Policy</strong> and{" "}
            <strong>Commerce Policy</strong>
          </li>
          <li>
            You can disconnect your number at any time. Related message data
            is deleted within 30 days of disconnection.
          </li>
          <li>We do not sell, rent or share customer chat data with anyone</li>
        </ul>
      </section>

      <section id="cookies">
        <h2>Cookies & Tracking</h2>
        <p>
          We use a small number of cookies to make Wavly work:
        </p>
        <ul>
          <li>
            <strong>Essential cookies</strong> keep you signed in and remember
            your preferences. These cannot be disabled.
          </li>
          <li>
            <strong>Analytics cookies</strong> help us understand how the
            Service is used. You can opt out from your account settings.
          </li>
        </ul>
        <p>
          We do <strong>not</strong> use advertising cookies, and we do
          <strong> not</strong> sell your browsing data to anyone.
        </p>
      </section>

      <section id="security">
        <h2>Data Security</h2>
        <p>
          We protect your data using industry-standard security practices:
        </p>
        <ul>
          <li>TLS encryption for all data in transit</li>
          <li>AES-256 encryption for data at rest</li>
          <li>Regular security audits and dependency reviews</li>
          <li>Limited employee access on a strict need-to-know basis</li>
          <li>
            Hosted on secure infrastructure (Vercel, Supabase) in trusted
            regions
          </li>
        </ul>
        <p>
          No system is 100% secure. In the unlikely event of a data breach
          affecting your personal information, we will notify you{" "}
          <strong>within 72 hours</strong> as required by law.
        </p>
      </section>

      <section id="sharing">
        <h2>Sharing Your Data</h2>
        <p>
          <strong>We do not sell your data.</strong> We may share information
          with:
        </p>
        <ul>
          <li>
            <strong>Service providers</strong> — hosting (Vercel), database
            (Supabase), payment processors, email delivery — under strict data
            protection agreements
          </li>
          <li>
            <strong>Legal authorities</strong> when required by law or to
            protect our legal rights
          </li>
          <li>
            <strong>Business partners</strong> only with your explicit consent
          </li>
        </ul>
      </section>

      <section id="your-rights">
        <h2>Your Rights</h2>
        <p>
          Under Indian law (DPDP Act, 2023) and applicable international laws,
          you have the right to:
        </p>
        <ul>
          <li>Access, correct or delete your personal data</li>
          <li>Export your data in a portable format</li>
          <li>Withdraw consent or restrict processing</li>
          <li>Lodge a complaint with the Data Protection Board of India</li>
        </ul>
        <p>
          To exercise these rights, email us at{" "}
          <a href="mailto:privacy@wavly.in">privacy@wavly.in</a>. We respond
          within 7 business days.
        </p>
      </section>

      <section id="childrens-privacy">
        <h2>Children&apos;s Privacy</h2>
        <p>
          Wavly is intended for business owners aged 18 and above. We do not
          knowingly collect personal data from anyone under 18. If you believe
          a child has provided us with data, please contact us and we will
          delete it immediately.
        </p>
      </section>

      <section id="international">
        <h2>International Data Transfers</h2>
        <p>
          Your data may be processed in countries outside India, including the
          United States and the European Union, where our infrastructure
          providers operate. We use Standard Contractual Clauses and other
          legal safeguards to ensure your data is protected during these
          transfers.
        </p>
      </section>

      <section id="changes">
        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. For material
          changes, we&apos;ll notify you via email or in-app notification at
          least 30 days before the change takes effect. Continued use of the
          Service after changes means you accept the updated policy.
        </p>
      </section>

      <section id="contact">
        <h2>Contact Us</h2>
        <p>For privacy questions, concerns, or to exercise your rights:</p>
        <ul>
          <li>
            Email:{" "}
            <a href="mailto:privacy@wavly.in">privacy@wavly.in</a>
          </li>
          <li>
            Data Protection Officer:{" "}
            <a href="mailto:dpo@wavly.in">dpo@wavly.in</a>
          </li>
        </ul>
      </section>
    </LegalPage>
  );
}
