"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardNav } from "../components/DashboardNav";

const BUSINESS_OPTIONS = [
  { value: "coach", label: "Coach / Consultant" },
  { value: "clinic", label: "Clinic / Doctor" },
  { value: "salon", label: "Salon / Spa" },
  { value: "tuition", label: "Tuition / Coaching" },
  { value: "shop", label: "Shop / D2C" },
  { value: "other", label: "Other" },
];

export default function SettingsPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("you@business.com");
  const [businessType, setBusinessType] = useState("other");
  const [toast, setToast] = useState<string | null>(null);

  const [notifs, setNotifs] = useState({
    dailySummary: true,
    newBooking: true,
    payment: true,
    productUpdates: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const n = window.localStorage.getItem("wavly.userName");
    const b = window.localStorage.getItem("wavly.businessType");
    if (n) setUserName(n);
    if (b) setBusinessType(b);
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }

  function saveProfile() {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("wavly.userName", userName.trim());
      window.localStorage.setItem("wavly.businessType", businessType);
    }
    showToast("Profile saved");
  }

  const initial = (userName || "P").trim().charAt(0).toUpperCase();

  return (
    <div className="flex-1 flex flex-col">
      <DashboardNav userName={userName} />

      <main className="relative flex-1 px-6 lg:px-10 py-10 lg:py-14">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-[var(--color-tg)]/8 blur-3xl" />
        </div>

        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="text-xs text-[var(--color-muted)] flex items-center gap-2">
            <Link href="/dashboard" className="hover:text-[var(--color-forest)]">Dashboard</Link>
            <Chevron />
            <span className="text-[var(--color-ink-soft)]">Account settings</span>
          </nav>

          <div className="mt-5">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
              Account
            </div>
            <h1 className="mt-2 text-3xl sm:text-4xl tracking-tight text-[var(--color-ink)]">
              <span className="font-display italic text-[var(--color-forest)]">Settings</span>
            </h1>
          </div>

          {/* Profile */}
          <Section title="Profile" subtitle="How you appear inside Wavly.">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-[var(--color-forest)] text-[var(--color-cream-soft)] flex items-center justify-center text-2xl font-display">
                {initial}
              </div>
              <div className="text-sm text-[var(--color-ink-soft)]">
                <div className="font-medium text-[var(--color-ink)]">{userName || "Your name"}</div>
                <div className="text-xs text-[var(--color-muted)]">{email}</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full name" value={userName} onChange={setUserName} placeholder="Priya Sharma" />
              <Field label="Email" value={email} onChange={setEmail} type="email" placeholder="you@business.com" />
            </div>

            <div className="mt-4">
              <label className="text-xs font-medium tracking-wide text-[var(--color-ink-soft)]">
                Business type
              </label>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {BUSINESS_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => setBusinessType(o.value)}
                    className={`btn-press rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                      businessType === o.value
                        ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)]"
                        : "bg-[var(--color-surface)] border border-[var(--color-border-soft)] text-[var(--color-ink-soft)] hover:border-[var(--color-forest)]/40 hover:text-[var(--color-forest)]"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={saveProfile}
                className="btn-press inline-flex items-center gap-2 rounded-full bg-[var(--color-forest)] px-5 py-2.5 text-sm font-medium text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 shadow-[0_6px_18px_-6px_rgba(20,58,47,0.45)] transition-all"
              >
                Save changes
              </button>
            </div>
          </Section>

          {/* Security */}
          <Section title="Security" subtitle="Keep your account safe.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="New password" value="" onChange={() => {}} type="password" placeholder="••••••••" />
              <Field label="Confirm password" value="" onChange={() => {}} type="password" placeholder="••••••••" />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-4">
              <div>
                <div className="text-sm font-medium text-[var(--color-ink)]">Two-factor authentication</div>
                <div className="text-xs text-[var(--color-muted)] mt-0.5">Add an extra layer of security at login.</div>
              </div>
              <span className="inline-flex items-center rounded-full bg-[var(--color-cream-deep)]/40 px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-muted)]">
                Coming soon
              </span>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => showToast("Password updated")}
                className="btn-press inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-5 py-2.5 text-sm font-medium text-[var(--color-ink-soft)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] transition-colors"
              >
                Update password
              </button>
            </div>
          </Section>

          {/* Notifications */}
          <Section title="Notifications" subtitle="Choose what Wavly tells you about.">
            <div className="space-y-2">
              <ToggleRow
                label="Daily summary"
                desc="A morning recap of what your bot handled."
                checked={notifs.dailySummary}
                onChange={(v) => setNotifs((p) => ({ ...p, dailySummary: v }))}
              />
              <ToggleRow
                label="New booking alerts"
                desc="Get pinged when a customer books."
                checked={notifs.newBooking}
                onChange={(v) => setNotifs((p) => ({ ...p, newBooking: v }))}
              />
              <ToggleRow
                label="Payment alerts"
                desc="Know the moment a payment lands."
                checked={notifs.payment}
                onChange={(v) => setNotifs((p) => ({ ...p, payment: v }))}
              />
              <ToggleRow
                label="Product updates"
                desc="New features and tips from the Wavly team."
                checked={notifs.productUpdates}
                onChange={(v) => setNotifs((p) => ({ ...p, productUpdates: v }))}
              />
            </div>
          </Section>

          {/* Danger zone */}
          <div className="mt-8 rounded-3xl border border-red-200 bg-red-50/40 p-6 sm:p-8">
            <div className="text-xs uppercase tracking-[0.16em] text-red-500 font-medium">
              Danger zone
            </div>
            <h3 className="mt-2 text-lg font-medium text-[var(--color-ink)]">Delete account</h3>
            <p className="mt-1 text-sm text-[var(--color-ink-soft)] max-w-lg leading-relaxed">
              Permanently delete your Wavly account, bots, automations and all data. This cannot be undone.
            </p>
            <button
              onClick={() => {
                if (typeof window !== "undefined" && window.confirm("Delete your account? This cannot be undone.")) {
                  showToast("Account deletion requested");
                }
              }}
              className="btn-press mt-5 inline-flex items-center gap-2 rounded-full border border-red-300 bg-white px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
            >
              Delete my account
            </button>
          </div>
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-up">
          <div className="flex items-center gap-3 rounded-full bg-[var(--color-forest)] px-5 py-3 text-sm font-medium text-[var(--color-cream-soft)] shadow-[0_18px_40px_-15px_rgba(20,33,28,0.45)]">
            <CheckIcon />
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- helpers ---------- */

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8 rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-6 sm:p-8">
      <h2 className="text-lg font-medium text-[var(--color-ink)]">{title}</h2>
      <p className="mt-0.5 text-sm text-[var(--color-muted)]">{subtitle}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium tracking-wide text-[var(--color-ink-soft)]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/70 outline-none transition-all focus:border-[var(--color-forest)] focus:ring-4 focus:ring-[var(--color-forest)]/10"
      />
    </div>
  );
}

function ToggleRow({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-4">
      <div>
        <div className="text-sm font-medium text-[var(--color-ink)]">{label}</div>
        <div className="text-xs text-[var(--color-muted)] mt-0.5">{desc}</div>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-block h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
          checked ? "bg-[var(--color-forest)]" : "bg-[var(--color-cream-deep)]"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ${
            checked ? "left-[1.375rem]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M5 12l4 4 10-10" />
    </svg>
  );
}
