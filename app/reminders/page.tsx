"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { DashboardNav } from "../components/DashboardNav";
import { Tilt3D } from "../components/Tilt3D";

type Status = "Confirmed" | "Pending" | "Cancelled" | "Scheduled";

type UpcomingReminder = {
  id: string;
  customer: string;
  initials: string;
  service: string;
  when: string;
  reminderStage: string;
  status: Status;
};

const upcoming: UpcomingReminder[] = [
  {
    id: "r-1",
    customer: "Priya Sharma",
    initials: "PS",
    service: "Facial · 60 min",
    when: "Today · 6:00 PM",
    reminderStage: "1 hr reminder sent · 4 min ago",
    status: "Confirmed",
  },
  {
    id: "r-2",
    customer: "Rohan Mehta",
    initials: "RM",
    service: "Tuition · Algebra",
    when: "Today · 7:30 PM",
    reminderStage: "1 hr reminder sent · 22 min ago",
    status: "Pending",
  },
  {
    id: "r-3",
    customer: "Dr. Anika Verma",
    initials: "AV",
    service: "Consultation",
    when: "Tomorrow · 10:00 AM",
    reminderStage: "Scheduled · sends at 9:00 AM",
    status: "Scheduled",
  },
  {
    id: "r-4",
    customer: "Aanya Patel",
    initials: "AP",
    service: "Hair colour",
    when: "Tomorrow · 2:00 PM",
    reminderStage: "Scheduled · sends at 1:00 PM",
    status: "Scheduled",
  },
  {
    id: "r-5",
    customer: "Karthik Iyer",
    initials: "KI",
    service: "Tuition · Physics",
    when: "Tomorrow · 5:00 PM",
    reminderStage: "Customer reschedule requested",
    status: "Cancelled",
  },
  {
    id: "r-6",
    customer: "Vikram Singh",
    initials: "VS",
    service: "1-on-1 coaching",
    when: "Sat · 11:00 AM",
    reminderStage: "Scheduled · sends Friday 10:00 PM",
    status: "Scheduled",
  },
];

const sampleVars = {
  customer: "Priya",
  time: "6:00 PM",
  date: "tomorrow",
  service: "facial appointment",
  business: "Glow Salon",
};

type VarKey = keyof typeof sampleVars;

const variableChips: { key: VarKey; label: string }[] = [
  { key: "customer", label: "Customer name" },
  { key: "time", label: "Time" },
  { key: "date", label: "Date" },
  { key: "service", label: "Service" },
  { key: "business", label: "Business" },
];

const DEFAULT_TEMPLATE =
  "Hi {{customer}}, just confirming your {{service}} {{date}} at {{time}}. Are you still coming? Reply YES or NO.";

function renderTemplate(tmpl: string) {
  return tmpl.replace(/\{\{(customer|time|date|service|business)\}\}/g, (_, k) => {
    return sampleVars[k as VarKey] ?? `{{${k}}}`;
  });
}

export default function RemindersPage() {
  const [userName, setUserName] = useState<string | undefined>(undefined);

  const [enabled, setEnabled] = useState(true);
  const [oneHour, setOneHour] = useState(true);
  const [thirtyMin, setThirtyMin] = useState(true);
  const [customOn, setCustomOn] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(120);
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("wavly.userName");
    if (stored) setUserName(stored);
  }, []);

  function insertVariable(key: VarKey) {
    const token = `{{${key}}}`;
    const el = inputRef.current;
    if (!el) {
      setTemplate((t) => t + " " + token);
      return;
    }
    const start = el.selectionStart ?? template.length;
    const end = el.selectionEnd ?? template.length;
    const next = template.slice(0, start) + token + template.slice(end);
    setTemplate(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + token.length;
      el.setSelectionRange(pos, pos);
    });
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }

  function onSave() {
    showToast("Smart Reminders settings saved");
  }

  function onReset() {
    setTemplate(DEFAULT_TEMPLATE);
    showToast("Template reset to default");
  }

  const previewBody = useMemo(() => renderTemplate(template), [template]);

  const stats = [
    {
      label: "Confirmation rate",
      value: "91%",
      hint: "Last 30 days",
      icon: <CheckCircle />,
    },
    {
      label: "Reminders sent today",
      value: "38",
      hint: "Across both numbers",
      icon: <BellIcon />,
    },
    {
      label: "No-shows prevented",
      value: "12",
      hint: "This month · est. ₹14,400 saved",
      icon: <ShieldIcon />,
    },
    {
      label: "Avg response time",
      value: "8m",
      hint: "Customer confirmation",
      icon: <ClockIcon />,
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <DashboardNav userName={userName} />

      <main className="relative flex-1 px-6 lg:px-10 py-10 lg:py-14">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[820px] rounded-full bg-[var(--color-gold-soft)]/15 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="text-xs text-[var(--color-muted)] flex items-center gap-2"
          >
            <Link
              href="/dashboard"
              className="hover:text-[var(--color-forest)] transition-colors"
            >
              Dashboard
            </Link>
            <ChevronRight />
            <Link
              href="/automations"
              className="hover:text-[var(--color-forest)] transition-colors"
            >
              Automations
            </Link>
            <ChevronRight />
            <span className="text-[var(--color-ink-soft)]">Smart Reminders</span>
          </nav>

          {/* Header */}
          <section className="mt-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                Automation · Smart Reminders
              </div>
              <h1 className="mt-2 text-3xl sm:text-4xl tracking-tight text-[var(--color-ink)]">
                Reminders that{" "}
                <span className="font-display italic text-[var(--color-forest)]">
                  end no-shows
                </span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-[var(--color-ink-soft)] leading-relaxed">
                Wavly automatically sends WhatsApp reminders before every
                appointment and asks customers to confirm. Set it once — your
                no-shows drop, your calendar stays full.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <StatusPill enabled={enabled} />
              <button
                onClick={onSave}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-forest)] px-5 py-2.5 text-sm font-medium text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 transition-all shadow-[0_6px_20px_-6px_rgba(20,58,47,0.45)]"
              >
                <CheckIcon />
                Save changes
              </button>
            </div>
          </section>

          {/* Stats */}
          <section className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <Tilt3D key={s.label} max={5} perspective={1100}>
                <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-5 hover:shadow-[0_22px_50px_-22px_rgba(20,33,28,0.25)] transition-shadow duration-500">
                  <div
                    style={{ transform: "translateZ(20px)" }}
                    className="h-9 w-9 rounded-lg bg-[var(--color-forest)]/[0.07] text-[var(--color-forest)] flex items-center justify-center"
                  >
                    {s.icon}
                  </div>
                  <div className="mt-4 font-display text-[2rem] leading-none tracking-tight text-[var(--color-forest)]">
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-sm font-medium text-[var(--color-ink)]">
                    {s.label}
                  </div>
                  <div className="text-xs text-[var(--color-muted)]">{s.hint}</div>
                </div>
              </Tilt3D>
            ))}
          </section>

          {/* Master toggle banner */}
          <section className="mt-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-[var(--color-forest)] text-[var(--color-cream-soft)] flex items-center justify-center">
                  <BellIcon />
                </div>
                <div>
                  <div className="text-base font-medium text-[var(--color-ink)]">
                    Smart Reminders automation
                  </div>
                  <div className="mt-1 text-sm text-[var(--color-ink-soft)]">
                    Sends reminders + confirmation requests on WhatsApp before
                    every booked appointment.
                  </div>
                </div>
              </div>
              <Toggle
                checked={enabled}
                onChange={setEnabled}
                label={enabled ? "Active" : "Paused"}
              />
            </div>
          </section>

          {/* Settings + Preview */}
          <section className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
            {/* Settings */}
            <div
              className={`rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-6 sm:p-8 transition-opacity ${
                enabled ? "opacity-100" : "opacity-60"
              }`}
            >
              {/* Timing */}
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
                  When to send
                </div>
                <h2 className="mt-2 text-xl tracking-tight text-[var(--color-ink)]">
                  Reminder timing
                </h2>
                <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
                  Pick when Wavly should nudge your customers. Two reminders
                  catch the most confirmations.
                </p>

                <div className="mt-5 space-y-2.5">
                  <CheckRow
                    checked={oneHour}
                    onChange={setOneHour}
                    title="1 hour before"
                    subtitle="Asks for confirmation — most effective"
                    badge="Recommended"
                  />
                  <CheckRow
                    checked={thirtyMin}
                    onChange={setThirtyMin}
                    title="30 minutes before"
                    subtitle="Final nudge before the appointment"
                  />
                  <div
                    className={`rounded-2xl border p-4 transition-all ${
                      customOn
                        ? "border-[var(--color-forest)]/30 bg-[var(--color-forest)]/[0.03]"
                        : "border-[var(--color-border-soft)] bg-[var(--color-surface)]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <Checkbox checked={customOn} onChange={setCustomOn} />
                        <div>
                          <div className="text-sm font-medium text-[var(--color-ink)]">
                            Custom time
                          </div>
                          <div className="text-xs text-[var(--color-muted)] mt-0.5">
                            Useful for first-time customers or long-lead
                            bookings
                          </div>
                        </div>
                      </div>
                    </div>
                    {customOn && (
                      <div className="mt-4 ml-8 flex items-center gap-3">
                        <input
                          type="number"
                          min={5}
                          max={2880}
                          value={customMinutes}
                          onChange={(e) =>
                            setCustomMinutes(Number(e.target.value))
                          }
                          className="w-24 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-forest)] focus:ring-4 focus:ring-[var(--color-forest)]/10"
                        />
                        <span className="text-sm text-[var(--color-ink-soft)]">
                          minutes before · approximately{" "}
                          <span className="font-medium text-[var(--color-forest)]">
                            {formatDuration(customMinutes)}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Template */}
              <div className="mt-10 pt-8 border-t border-[var(--color-border-soft)]">
                <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
                  Message
                </div>
                <h2 className="mt-2 text-xl tracking-tight text-[var(--color-ink)]">
                  Reminder template
                </h2>
                <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
                  Personalize what customers receive. Click a chip below to
                  insert a variable.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {variableChips.map((v) => (
                    <button
                      key={v.key}
                      type="button"
                      onClick={() => insertVariable(v.key)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs text-[var(--color-ink-soft)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] hover:-translate-y-0.5 transition-all"
                    >
                      <span className="font-mono text-[10px] text-[var(--color-muted)]">
                        {`{{${v.key}}}`}
                      </span>
                      <span>{v.label}</span>
                    </button>
                  ))}
                </div>

                <textarea
                  ref={inputRef}
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  rows={4}
                  className="mt-4 w-full resize-none rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm leading-relaxed text-[var(--color-ink)] outline-none focus:border-[var(--color-forest)] focus:ring-4 focus:ring-[var(--color-forest)]/10 transition-all"
                />

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-[var(--color-muted)]">
                    {template.length} chars · uses{" "}
                    {(template.match(/\{\{[^}]+\}\}/g) || []).length} variables
                  </div>
                  <button
                    onClick={onReset}
                    className="text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-forest)] underline underline-offset-2 transition-colors"
                  >
                    Reset to default
                  </button>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="relative">
              <div className="lg:sticky lg:top-24">
                <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
                  Live preview
                </div>
                <h3 className="mt-2 text-base font-medium text-[var(--color-ink)]">
                  How it looks on WhatsApp
                </h3>

                <div className="mt-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[0_22px_50px_-22px_rgba(20,33,28,0.25)] overflow-hidden">
                  <div className="flex items-center gap-3 pb-3 border-b border-[var(--color-border-soft)]">
                    <div className="relative h-9 w-9 rounded-full bg-[var(--color-forest)] flex items-center justify-center text-[12px] font-medium text-[var(--color-cream-soft)]">
                      GS
                      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#34c759] border-2 border-[var(--color-surface)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[var(--color-ink)] truncate">
                        Glow Salon · Wavly
                      </div>
                      <div className="text-[11px] text-[var(--color-muted)]">
                        Business · usually replies instantly
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 pb-2 flex flex-col gap-2 bg-[var(--color-cream)]/30 rounded-b-xl -mx-1 px-2">
                    <div className="flex justify-end">
                      <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-[var(--color-forest)] px-3.5 py-2.5 text-[13px] leading-relaxed text-[var(--color-cream-soft)] shadow-sm whitespace-pre-line">
                        {previewBody || "Your reminder message will appear here…"}
                      </div>
                    </div>
                    <div className="ml-auto flex items-center gap-1 mr-2 text-[10px] text-[var(--color-muted)]">
                      <span>6:00 PM</span>
                      <DoubleCheck />
                    </div>

                    {/* Quick reply chips */}
                    <div className="flex flex-wrap gap-1.5 justify-end mt-1">
                      <ReplyChip>YES</ReplyChip>
                      <ReplyChip>NO</ReplyChip>
                      <ReplyChip>Reschedule</ReplyChip>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-[11px] text-[var(--color-muted)] leading-relaxed">
                  Wavly auto-fills the customer&apos;s name, time, date and
                  service from your booking. You always see the final message
                  before it&apos;s sent.
                </p>
              </div>
            </div>
          </section>

          {/* Upcoming Reminders */}
          <section className="mt-14">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                  Upcoming
                </div>
                <h2 className="mt-2 text-2xl tracking-tight text-[var(--color-ink)]">
                  Reminders queued
                </h2>
              </div>
              <Link
                href="/customers"
                className="hidden sm:inline-flex items-center gap-1 text-sm text-[var(--color-forest)] hover:text-[var(--color-forest-deep)]"
              >
                View all bookings
                <ArrowRight />
              </Link>
            </div>

            <div className="mt-6 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--color-border-soft)] text-left">
                      <th className="px-5 py-3 text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">
                        Customer
                      </th>
                      <th className="px-5 py-3 text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">
                        Appointment
                      </th>
                      <th className="px-5 py-3 text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">
                        Reminder
                      </th>
                      <th className="px-5 py-3 text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">
                        Status
                      </th>
                      <th className="px-5 py-3 text-right text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border-soft)]">
                    {upcoming.map((r) => (
                      <tr
                        key={r.id}
                        className="hover:bg-[var(--color-surface)] transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-[var(--color-cream-deep)] text-[var(--color-forest)] flex items-center justify-center text-xs font-medium">
                              {r.initials}
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-[var(--color-ink)] truncate">
                                {r.customer}
                              </div>
                              <div className="text-xs text-[var(--color-muted)] truncate">
                                {r.service}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-[13px] text-[var(--color-ink)]">
                          {r.when}
                        </td>
                        <td className="px-5 py-4 text-[13px] text-[var(--color-ink-soft)]">
                          {r.reminderStage}
                        </td>
                        <td className="px-5 py-4">
                          <StatusBadge status={r.status} />
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() => showToast(`Reminder for ${r.customer} sent now`)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-ink-soft)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] transition-colors"
                          >
                            <BoltIcon />
                            Send now
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-[var(--color-border-soft)] bg-[var(--color-cream)]/40 px-5 py-3 flex items-center justify-between text-[11px] text-[var(--color-muted)]">
                <div>{upcoming.length} reminders in the next 48 hours</div>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-forest)] opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-forest)]" />
                  </span>
                  Auto-syncing with calendar
                </div>
              </div>
            </div>
          </section>
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

/* ----------------- Sub-components ----------------- */

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-3 group"
    >
      <span
        className={`relative inline-block h-6 w-11 rounded-full transition-colors duration-300 ${
          checked
            ? "bg-[var(--color-forest)]"
            : "bg-[var(--color-cream-deep)]"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ${
            checked ? "left-[1.375rem]" : "left-0.5"
          }`}
        />
      </span>
      {label && (
        <span
          className={`text-sm font-medium transition-colors ${
            checked ? "text-[var(--color-forest)]" : "text-[var(--color-muted)]"
          }`}
        >
          {label}
        </span>
      )}
    </button>
  );
}

function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
        checked
          ? "bg-[var(--color-forest)] border-[var(--color-forest)] text-[var(--color-cream-soft)]"
          : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-forest)]"
      }`}
    >
      {checked && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3 w-3"
        >
          <path d="M5 12l4 4 10-10" />
        </svg>
      )}
    </button>
  );
}

function CheckRow({
  checked,
  onChange,
  title,
  subtitle,
  badge,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  title: string;
  subtitle: string;
  badge?: string;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border p-4 transition-all ${
        checked
          ? "border-[var(--color-forest)]/30 bg-[var(--color-forest)]/[0.03]"
          : "border-[var(--color-border-soft)] bg-[var(--color-surface)]"
      }`}
    >
      <Checkbox checked={checked} onChange={onChange} />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-[var(--color-ink)]">
            {title}
          </div>
          {badge && (
            <span className="inline-flex items-center rounded-full bg-[var(--color-gold)]/15 px-2 py-0.5 text-[9px] uppercase tracking-wider text-[var(--color-gold)] font-medium">
              {badge}
            </span>
          )}
        </div>
        <div className="text-xs text-[var(--color-muted)] mt-0.5">{subtitle}</div>
      </div>
    </div>
  );
}

function StatusPill({ enabled }: { enabled: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
        enabled
          ? "bg-[var(--color-forest)]/[0.08] text-[var(--color-forest)]"
          : "bg-[var(--color-cream-deep)]/40 text-[var(--color-muted)]"
      }`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {enabled && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-forest)] opacity-70" />
        )}
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
            enabled ? "bg-[var(--color-forest)]" : "bg-[var(--color-muted)]"
          }`}
        />
      </span>
      {enabled ? "Automation active" : "Automation paused"}
    </span>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const map: Record<
    Status,
    { bg: string; text: string; dot: string; label: string }
  > = {
    Confirmed: {
      bg: "bg-[var(--color-forest)]/[0.08]",
      text: "text-[var(--color-forest)]",
      dot: "bg-[var(--color-forest)]",
      label: "Confirmed",
    },
    Pending: {
      bg: "bg-[var(--color-gold)]/15",
      text: "text-[var(--color-gold)]",
      dot: "bg-[var(--color-gold)]",
      label: "Not responded",
    },
    Cancelled: {
      bg: "bg-red-50",
      text: "text-red-600",
      dot: "bg-red-500",
      label: "Cancelled",
    },
    Scheduled: {
      bg: "bg-[var(--color-cream-deep)]/40",
      text: "text-[var(--color-ink-soft)]",
      dot: "bg-[var(--color-muted)]",
      label: "Scheduled",
    },
  };
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${s.bg} ${s.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

function ReplyChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[var(--color-surface)] border border-[var(--color-border-soft)] px-2.5 py-1 text-[11px] text-[var(--color-forest)] shadow-sm">
      {children}
    </span>
  );
}

function formatDuration(mins: number) {
  if (mins < 60) return `${mins} min`;
  if (mins % 60 === 0) return `${mins / 60} hr${mins / 60 === 1 ? "" : "s"}`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h} hr${h === 1 ? "" : "s"} ${m} min`;
}

/* ----------------- Icons ----------------- */

function svgProps() {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
  };
}

function BellIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M12 22a2 2 0 002-2H10a2 2 0 002 2z" />
      <path d="M18 16V11a6 6 0 10-12 0v5l-2 2h16l-2-2z" />
    </svg>
  );
}
function CheckCircle() {
  return (
    <svg {...svgProps()}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M12 3l8 4v6c0 5-3.5 7.5-8 8-4.5-.5-8-3-8-8V7l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg {...svgProps()}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
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
function ChevronRight() {
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
function DoubleCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-[#34c759]">
      <path d="M2 13l4 4L14 9" />
      <path d="M10 13l4 4 8-8" />
    </svg>
  );
}
