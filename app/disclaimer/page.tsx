import { LegalPage } from "../components/LegalPage";

export const metadata = {
  title: "Disclaimer · Wavly",
  description:
    "Important things to know about using Wavly — what we guarantee, what we don't, and your responsibilities.",
};

const toc = [
  { id: "general", label: "General Disclaimer" },
  { id: "no-guarantees", label: "No Guarantees" },
  { id: "whatsapp", label: "WhatsApp Service Disclaimer" },
  { id: "ai", label: "AI Disclaimer" },
  { id: "third-party", label: "Third-Party Services" },
  { id: "user-responsibility", label: "User Responsibility" },
  { id: "compliance", label: "Compliance Disclaimer" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "contact", label: "Contact Us" },
];

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      lastUpdated="27 May 2026"
      intro="The fine print, in plain language. What Wavly does, what it doesn't, and what you're responsible for."
      toc={toc}
    >
      <section id="general">
        <h2>General Disclaimer</h2>
        <p>
          The information and services provided by Wavly are for general
          business automation purposes only. While we strive for accuracy and
          reliability, we make no representations or warranties — express or
          implied — about the completeness, accuracy, or suitability of the
          Service for any specific purpose.
        </p>
      </section>

      <section id="no-guarantees">
        <h2>No Guarantees</h2>
        <p>
          Wavly is a tool, not a guarantee of business success. We do not
          guarantee:
        </p>
        <ul>
          <li>Specific revenue, customer growth, or business outcomes</li>
          <li>That every automated reply will be accurate or appropriate</li>
          <li>
            That bookings, payments, or follow-ups will always complete
            successfully
          </li>
          <li>That the Service will be available 100% of the time</li>
        </ul>
        <p>
          Your business results depend on many factors beyond our control,
          including your industry, audience, message quality, and how you
          configure your automations.
        </p>
      </section>

      <section id="whatsapp">
        <h2>WhatsApp Service Disclaimer</h2>
        <p>
          Wavly operates through Meta&apos;s WhatsApp Business API. We are{" "}
          <strong>not affiliated with, endorsed by, or sponsored by</strong>{" "}
          Meta, WhatsApp, or any of their related entities.
        </p>
        <ul>
          <li>
            Our service depends on WhatsApp&apos;s API availability and
            policies, which can change without our control
          </li>
          <li>
            We cannot guarantee continuous service if Meta modifies its
            policies or restricts our API access
          </li>
          <li>
            We are not responsible for account suspensions, bans, or
            restrictions imposed by Meta on your WhatsApp Business account
          </li>
          <li>
            We strongly recommend keeping a backup communication channel for
            critical business operations
          </li>
        </ul>
      </section>

      <section id="ai">
        <h2>AI Disclaimer</h2>
        <p>
          Wavly uses artificial intelligence to draft, send, and reason about
          messages on your behalf. AI is not perfect and may occasionally:
        </p>
        <ul>
          <li>Misunderstand a customer&apos;s intent</li>
          <li>Provide inaccurate or out-of-date information</li>
          <li>
            Send responses that don&apos;t perfectly match your business voice
          </li>
        </ul>
        <p>
          You remain responsible for reviewing your automations, monitoring
          conversations, and intervening when needed. We recommend regular
          quality reviews and clear escalation paths for sensitive customer
          situations.
        </p>
      </section>

      <section id="third-party">
        <h2>Third-Party Services</h2>
        <p>
          Wavly integrates with third-party services — including Meta
          (WhatsApp), payment processors, hosting providers, and AI providers.
          We are not responsible for:
        </p>
        <ul>
          <li>
            The performance, security, or policies of third-party services
          </li>
          <li>Outages, downtime, or data issues caused by third parties</li>
          <li>
            Your compliance with third-party terms of service (which you must
            accept separately)
          </li>
        </ul>
      </section>

      <section id="user-responsibility">
        <h2>User Responsibility</h2>
        <p>You are solely responsible for:</p>
        <ul>
          <li>
            Complying with all applicable laws and regulations in your
            jurisdiction
          </li>
          <li>
            Obtaining proper consent from customers before messaging them
          </li>
          <li>The content and accuracy of your automations</li>
          <li>Backing up your important business data</li>
          <li>Promptly reviewing and responding to customer complaints</li>
          <li>
            Maintaining accurate billing and contact information on your
            account
          </li>
        </ul>
      </section>

      <section id="compliance">
        <h2>Compliance Disclaimer</h2>
        <p>
          Wavly is not a substitute for legal, financial, or compliance
          advice. While we provide tools to help you communicate with
          customers, you are responsible for following:
        </p>
        <ul>
          <li>
            India&apos;s <strong>Telecom Regulatory Authority of India (TRAI)</strong>{" "}
            regulations
          </li>
          <li>
            The{" "}
            <strong>Information Technology Act, 2000</strong> and related
            rules
          </li>
          <li>
            The <strong>Digital Personal Data Protection Act, 2023</strong>
          </li>
          <li>
            Industry-specific regulations (medical, financial, legal, etc.)
          </li>
          <li>
            International laws if you message customers outside India
            (including GDPR)
          </li>
        </ul>
        <p>
          We recommend consulting qualified legal counsel for compliance
          questions specific to your business.
        </p>
      </section>

      <section id="liability">
        <h2>Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Wavly — including its
          founders, employees, agents and partners — is not liable for:
        </p>
        <ul>
          <li>
            Any direct, indirect, incidental, special, or consequential
            damages
          </li>
          <li>Lost profits, lost data, or business interruption</li>
          <li>
            Damages exceeding the amount you paid us in the 12 months
            preceding the claim
          </li>
          <li>
            Any damages arising from your use or inability to use the Service
          </li>
        </ul>
        <p>
          Some jurisdictions do not allow certain limitations of liability. In
          those cases, our liability is limited to the maximum extent
          permitted by applicable law.
        </p>
      </section>

      <section id="contact">
        <h2>Contact Us</h2>
        <p>Questions or concerns about this Disclaimer?</p>
        <ul>
          <li>
            Email:{" "}
            <a href="mailto:legal@wavly.in">legal@wavly.in</a>
          </li>
        </ul>
      </section>
    </LegalPage>
  );
}
