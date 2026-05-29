"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardNav } from "../components/DashboardNav";

type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending";
  plan: string;
};

const invoices: Invoice[] = [
  { id: "INV-1042", date: "12 May 2026", amount: "₹999", status: "Paid", plan: "Monthly" },
  { id: "INV-1021", date: "12 Apr 2026", amount: "₹999", status: "Paid", plan: "Monthly" },
];

const usage = [
  { label: "Messages this month", used: 5184, limit: 10000, unit: "" },
  { label: "Connected bots", used: 2, limit: 5, unit: "" },
  { label: "Active automations", used: 8, limit: 20, unit: "" },
];

export default function BillingPage() {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const n = window.localStorage.getItem("wavly.userName");
    if (n) setUserName(n);
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }

  return (
    <div className="flex-1 flex flex-col">
      <DashboardNav userName={userName} />

      <main className="relative flex-1 px-6 lg:px-10 py-10 lg:py-14">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-[var(--color-gold-soft)]/15 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl">
          <nav className="text-xs text-[var(--color-muted)] flex items-center gap-2">
            <Link href="/dashboard" className="hover:text-[var(--color-forest)]">Dashboard</Link>
            <Chevron />
            <span className="text-[var(--color-ink-soft)]">Billing</span>
          </nav>

          <div className="mt-5">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
              Plan & payments
            </div>
            <h1 className="mt-2 text-3xl sm:text-4xl tracking-tight text-[var(--color-ink)]">
              <span className="font-display italic text-[var(--color-forest)]">Billing</span>
            </h1>
          </div>

          {/* Current plan */}
          <section className="mt-8 rounded-3xl border border-[var(--color-forest)]/25 bg-gradient-to-br from-[var(--color-forest)] to-[var(--color-forest-deep)] p-7 sm:p-8 text-[var(--color-cream-soft)] relative overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute -top-28 -right-20 h-72 w-72 rounded-full bg-[var(--color-gold)]/15 blur-3xl" />
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-cream-soft)]/15 px-3 py-1 text-[11px] font-medium">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-gold-soft)] opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-gold-soft)]" />
                  </span>
                  Free trial
                </div>
                <h2 className="mt-3 text-2xl tracking-tight">
                  6 days left on your trial
                </h2>
                <p className="mt-1.5 text-sm text-[var(--color-cream-soft)]/80 max-w-md">
                  Pick a plan before your trial ends to keep your automations running without interruption.
                </p>
              </div>
              <Link
                href="/upgrade"
                className="btn-press shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-cream-soft)] text-[var(--color-forest-deep)] px-6 py-3 text-sm font-medium hover:bg-white hover:-translate-y-0.5 transition-all shadow-[0_8px_22px_-6px_rgba(255,255,255,0.3)]"
              >
                Choose a plan
                <ArrowRight />
              </Link>
            </div>
          </section>

          {/* Usage */}
          <section className="mt-8">
            <h2 className="text-lg font-medium text-[var(--color-ink)]">This month&apos;s usage</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {usage.map((u) => {
                const pct = Math.min(100, Math.round((u.used / u.limit) * 100));
                return (
                  <div key={u.label} className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-5">
                    <div className="flex items-baseline justify-between">
                      <span className="font-display text-2xl tracking-tight text-[var(--color-forest)] tabular-nums">
                        {u.used.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-[var(--color-muted)]">/ {u.limit.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="mt-3 h-1.5 rounded-full bg-[var(--color-border-soft)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[var(--color-forest)] to-[var(--color-forest-soft)] transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="mt-2 text-xs text-[var(--color-ink-soft)]">{u.label}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Payment method */}
          <section className="mt-8 rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-6 sm:p-8">
            <h2 className="text-lg font-medium text-[var(--color-ink)]">Payment method</h2>
            <p className="mt-0.5 text-sm text-[var(--color-muted)]">
              We currently accept payments via UPI and bank transfer.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <div className="h-11 w-11 rounded-xl bg-[var(--color-forest)]/[0.07] text-[var(--color-forest)] flex items-center justify-center">
                <RupeeIcon />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-[var(--color-ink)]">No payment method on file</div>
                <div className="text-xs text-[var(--color-muted)] mt-0.5">
                  When you upgrade, we&apos;ll share UPI details to complete payment.
                </div>
              </div>
              <button
                onClick={() => showToast("We'll send UPI details at checkout")}
                className="btn-press shrink-0 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-4 py-2 text-xs font-medium text-[var(--color-ink-soft)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] transition-colors"
              >
                How payments work
              </button>
            </div>
          </section>

          {/* Invoices */}
          <section className="mt-8 rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] overflow-hidden">
            <div className="px-6 sm:px-8 pt-6 pb-4">
              <h2 className="text-lg font-medium text-[var(--color-ink)]">Invoice history</h2>
            </div>
            {invoices.length === 0 ? (
              <div className="px-8 pb-8 text-sm text-[var(--color-muted)]">No invoices yet.</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-y border-[var(--color-border-soft)] text-left">
                    <th className="px-6 sm:px-8 py-3 text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">Invoice</th>
                    <th className="px-5 py-3 text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">Date</th>
                    <th className="px-5 py-3 text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">Amount</th>
                    <th className="px-5 py-3 text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">Status</th>
                    <th className="px-5 py-3 text-right text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border-soft)]">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-[var(--color-surface)] transition-colors">
                      <td className="px-6 sm:px-8 py-4 font-medium text-[var(--color-ink)]">{inv.id}</td>
                      <td className="px-5 py-4 text-[var(--color-ink-soft)]">{inv.date}</td>
                      <td className="px-5 py-4 text-[var(--color-ink)]">{inv.amount}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-forest)]/[0.08] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-forest)]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-forest)]" />
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => showToast(`Downloading ${inv.id}…`)}
                          className="text-xs font-medium text-[var(--color-forest)] hover:text-[var(--color-forest-deep)] hover:underline underline-offset-2"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          <p className="mt-8 text-center text-xs text-[var(--color-muted)]">
            Questions about billing?{" "}
            <Link href="/support" className="font-medium text-[var(--color-forest)] hover:underline underline-offset-2">
              Visit support
            </Link>{" "}
            or email{" "}
            <a href="mailto:billing@wavly.in" className="font-medium text-[var(--color-forest)] hover:underline underline-offset-2">
              billing@wavly.in
            </a>
          </p>
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

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
function RupeeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M6 5h12M6 9h12M9 5c4 0 6 2 6 4 0 3-2 4-6 4l8 8" />
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
