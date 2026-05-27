import { LegalPage } from "../components/LegalPage";

export const metadata = {
  title: "Terms of Service · Wavly",
  description:
    "The rules for using Wavly — your rights, our responsibilities, and how we work together.",
};

const toc = [
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "service", label: "Description of Service" },
  { id: "account", label: "Account Registration" },
  { id: "subscription", label: "Subscription & Payments" },
  { id: "acceptable-use", label: "Acceptable Use" },
  { id: "whatsapp-policies", label: "WhatsApp Business Policies" },
  { id: "ip", label: "Intellectual Property" },
  { id: "termination", label: "Termination" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "disclaimers", label: "Disclaimers" },
  { id: "governing-law", label: "Governing Law" },
  { id: "changes", label: "Changes to Terms" },
  { id: "contact", label: "Contact Us" },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="27 May 2026"
      intro="These Terms govern your use of Wavly. Please read them carefully — using the Service means you accept these Terms."
      toc={toc}
    >
      <section id="acceptance">
        <h2>Acceptance of Terms</h2>
        <p>
          By accessing or using Wavly (the &ldquo;Service&rdquo;), you agree to
          be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do
          not agree, please do not use the Service. These Terms form a legal
          agreement between you (&ldquo;you&rdquo;, &ldquo;your&rdquo;) and
          Wavly (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;).
        </p>
      </section>

      <section id="service">
        <h2>Description of Service</h2>
        <p>
          Wavly provides an AI-powered platform for automating WhatsApp
          business communications. Features include smart auto-replies,
          appointment booking, customer management, payment reminders,
          centralized inbox, and analytics. The Service is offered on a
          subscription basis with multiple plans.
        </p>
      </section>

      <section id="account">
        <h2>Account Registration</h2>
        <p>To create an account and use Wavly, you must:</p>
        <ul>
          <li>
            Be at least <strong>18 years old</strong>, or have a
            parent/guardian who agrees to these Terms on your behalf
          </li>
          <li>Provide accurate, current and complete information</li>
          <li>Maintain the confidentiality of your account credentials</li>
          <li>Be responsible for all activity that occurs under your account</li>
          <li>Notify us immediately of any unauthorized access</li>
        </ul>
        <p>
          You may not share your account, transfer it to someone else, or
          allow another business to use it without our written consent.
        </p>
      </section>

      <section id="subscription">
        <h2>Subscription & Payments</h2>
        <h3>Plans</h3>
        <p>
          We offer Monthly, Yearly, and Lifetime plans. Details and current
          pricing are listed on our{" "}
          <a href="/pricing">Pricing page</a>.
        </p>
        <h3>Free trial</h3>
        <p>
          We offer a 7-day free trial with no credit card required. After the
          trial ends, you must choose a paid plan to continue using paid
          features.
        </p>
        <h3>Billing</h3>
        <ul>
          <li>
            Subscriptions are billed in advance, in Indian Rupees (INR), and
            exclude applicable taxes (GST)
          </li>
          <li>
            Yearly and Lifetime plans are paid up front. Monthly plans renew
            automatically each month.
          </li>
          <li>
            We may change prices with at least 30 days&apos; notice. Your
            current plan&apos;s price is locked until your next renewal.
          </li>
        </ul>
        <h3>Refunds</h3>
        <p>
          We offer a <strong>30-day money-back guarantee</strong> from your
          first paid charge. After 30 days, refunds are at our discretion. To
          request a refund, email{" "}
          <a href="mailto:billing@wavly.in">billing@wavly.in</a>.
        </p>
        <h3>Cancellation</h3>
        <p>
          You may cancel anytime from your dashboard. Cancellation takes
          effect at the end of your current billing period — you keep access
          until then.
        </p>
      </section>

      <section id="acceptable-use">
        <h2>Acceptable Use</h2>
        <p>You agree NOT to use Wavly to:</p>
        <ul>
          <li>
            Send spam, unsolicited messages, or content that violates
            WhatsApp&apos;s policies
          </li>
          <li>Engage in fraud, deception, or illegal activity</li>
          <li>
            Send hate speech, harassment, or content that incites violence
          </li>
          <li>Distribute malware, viruses, or harmful code</li>
          <li>Attempt to reverse engineer, hack, or disrupt the Service</li>
          <li>Build a competing product using Wavly</li>
          <li>Violate any applicable Indian or international laws</li>
        </ul>
        <p>
          We reserve the right to suspend or terminate accounts that violate
          these rules.
        </p>
      </section>

      <section id="whatsapp-policies">
        <h2>WhatsApp Business Policies</h2>
        <p>
          Because Wavly operates through Meta&apos;s WhatsApp Business API,
          your usage must also comply with:
        </p>
        <ul>
          <li>
            <strong>Meta&apos;s WhatsApp Business Messaging Policy</strong>
          </li>
          <li>
            <strong>WhatsApp Commerce Policy</strong>
          </li>
          <li>TRAI regulations and Indian telecommunications law</li>
        </ul>
        <p>
          You are solely responsible for the content of messages sent through
          Wavly. We may suspend service if your usage risks our WhatsApp
          Business API access.
        </p>
      </section>

      <section id="ip">
        <h2>Intellectual Property</h2>
        <ul>
          <li>
            We own all rights to the Wavly Service — software, designs, logos,
            and content
          </li>
          <li>
            You retain ownership of your data, customer information, and any
            content you upload
          </li>
          <li>
            You grant us a limited license to use your data only to provide
            the Service
          </li>
          <li>
            You may not copy, modify, or redistribute any part of Wavly
            without written permission
          </li>
        </ul>
      </section>

      <section id="termination">
        <h2>Termination</h2>
        <ul>
          <li>You may terminate your account at any time from your dashboard</li>
          <li>
            We may suspend or terminate your account if you violate these
            Terms, fail to pay, or engage in fraudulent activity
          </li>
          <li>
            On termination, your data is deleted within 30 days, except where
            retention is required by law
          </li>
          <li>
            Sections relating to intellectual property, liability, and dispute
            resolution survive termination
          </li>
        </ul>
      </section>

      <section id="liability">
        <h2>Limitation of Liability</h2>
        <p>To the maximum extent permitted by law:</p>
        <ul>
          <li>
            The Service is provided <strong>&ldquo;as is&rdquo;</strong>{" "}
            without warranties of any kind
          </li>
          <li>
            We are not liable for indirect, incidental, or consequential
            damages
          </li>
          <li>
            Our total liability is limited to the amount you paid us in the 12
            months preceding the claim
          </li>
          <li>
            We are not responsible for losses caused by WhatsApp/Meta&apos;s
            actions, third-party services, or events beyond our control
          </li>
        </ul>
      </section>

      <section id="disclaimers">
        <h2>Disclaimers</h2>
        <ul>
          <li>
            We do not guarantee that the Service will be uninterrupted or
            error-free
          </li>
          <li>
            We do not guarantee specific business outcomes (more customers,
            more revenue, etc.)
          </li>
          <li>
            Automated replies are generated by AI, which may occasionally
            produce inaccurate responses. You are responsible for reviewing
            your automations.
          </li>
        </ul>
        <p>
          See our full{" "}
          <a href="/disclaimer">Disclaimer</a> for more details.
        </p>
      </section>

      <section id="governing-law">
        <h2>Governing Law</h2>
        <p>
          These Terms are governed by the laws of India. Any disputes will be
          resolved exclusively in the courts of <strong>Bengaluru, Karnataka</strong>,
          unless required otherwise by applicable consumer protection law.
        </p>
      </section>

      <section id="changes">
        <h2>Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. For material changes,
          we&apos;ll notify you at least 30 days in advance via email or
          in-app notification. Continued use after changes means you accept
          the updated Terms.
        </p>
      </section>

      <section id="contact">
        <h2>Contact Us</h2>
        <p>Questions about these Terms?</p>
        <ul>
          <li>
            Legal team:{" "}
            <a href="mailto:legal@wavly.in">legal@wavly.in</a>
          </li>
          <li>
            Billing questions:{" "}
            <a href="mailto:billing@wavly.in">billing@wavly.in</a>
          </li>
        </ul>
      </section>
    </LegalPage>
  );
}
