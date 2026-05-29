"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardNav } from "../components/DashboardNav";
import { Reveal } from "../components/Reveal";
import { Tilt3D } from "../components/Tilt3D";

type Automation = {
  id: string;
  name: string;
  description: string;
  trigger: string;
  icon: React.ReactNode;
  active: boolean;
  uses: string;
  category: string;
  href?: string;
};

type Template = {
  id: string;
  name: string;
  description: string;
  trigger: string;
  icon: React.ReactNode;
  popular?: boolean;
};

const initialAutomations: Automation[] = [
  {
    id: "a-1",
    name: "Smart Booking Reminders",
    description:
      "Sends Telegram reminders 1 hour and 30 minutes before every appointment.",
    trigger: "1 hr before any booking",
    icon: <BellIcon />,
    active: true,
    uses: "38 sent this week",
    category: "Bookings",
    href: "/reminders",
  },
  {
    id: "a-2",
    name: "Pricing Auto-Reply",
    description:
      "Sends your price list instantly when customers ask about pricing.",
    trigger: "Keyword: \"price\", \"cost\", \"how much\"",
    icon: <BoltIcon />,
    active: true,
    uses: "24 used this week",
    category: "Auto-Reply",
  },
  {
    id: "a-3",
    name: "Welcome Message",
    description:
      "Greets every new customer who messages you for the first time.",
    trigger: "First message from a new contact",
    icon: <SparkleIcon />,
    active: true,
    uses: "41 sent this week",
    category: "Onboarding",
  },
  {
    id: "a-4",
    name: "Payment Follow-up",
    description:
      "Polite reminders to customers with unpaid invoices after 3 days.",
    trigger: "Invoice unpaid for 3+ days",
    icon: <RupeeIcon />,
    active: false,
    uses: "8 sent last month",
    category: "Payments",
  },
  {
    id: "a-5",
    name: "After-hours Reply",
    description:
      "Lets customers know you'll respond tomorrow when they message after 8 PM.",
    trigger: "Message received between 8 PM – 8 AM",
    icon: <MoonIcon />,
    active: true,
    uses: "16 sent this week",
    category: "Auto-Reply",
  },
];

const templates: Template[] = [
  {
    id: "t-1",
    name: "Auto Welcome Message",
    description: "Greet every new customer instantly with a warm message.",
    trigger: "First message from a new contact",
    icon: <SparkleIcon />,
    popular: true,
  },
  {
    id: "t-2",
    name: "Price List Reply",
    description: "Auto-share your pricing when customers ask.",
    trigger: 'Keyword: "price"',
    icon: <BoltIcon />,
    popular: true,
  },
  {
    id: "t-3",
    name: "Booking System",
    description:
      "Customers book appointments by chatting. Wavly checks your calendar.",
    trigger: 'Keyword: "book", "appointment"',
    icon: <CalendarIcon />,
    popular: true,
  },
  {
    id: "t-4",
    name: "Payment Reminder",
    description: "Polite follow-ups for unpaid invoices.",
    trigger: "Invoice unpaid for 3+ days",
    icon: <RupeeIcon />,
  },
  {
    id: "t-5",
    name: "Appointment Confirmation",
    description: "Send confirmation message right after a booking.",
    trigger: "New appointment created",
    icon: <CheckCircleIcon />,
  },
  {
    id: "t-6",
    name: "After-hours Auto-reply",
    description: "Let customers know you'll respond tomorrow.",
    trigger: "Outside business hours",
    icon: <MoonIcon />,
  },
  {
    id: "t-7",
    name: "Customer Follow-up",
    description: "Re-engage customers who haven't visited in 30 days.",
    trigger: "Customer inactive for 30 days",
    icon: <UsersIcon />,
  },
  {
    id: "t-8",
    name: "Birthday Wishes",
    description:
      "Personalized birthday messages with a small offer to delight customers.",
    trigger: "On customer's birthday",
    icon: <GiftIcon />,
  },
];

const CATEGORY_OPTIONS = ["Auto-Reply", "Bookings", "Reminders", "Payments", "Onboarding", "Promotions"] as const;

function iconForCategory(cat: string): React.ReactNode {
  switch (cat) {
    case "Bookings":
      return <CalendarIcon />;
    case "Reminders":
      return <BellIcon />;
    case "Payments":
      return <RupeeIcon />;
    case "Onboarding":
      return <SparkleIcon />;
    case "Promotions":
      return <GiftIcon />;
    default:
      return <BoltIcon />;
  }
}

export default function AutomationsPage() {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [automations, setAutomations] = useState(initialAutomations);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Builder modal state
  const [builderOpen, setBuilderOpen] = useState(false);
  const [bName, setBName] = useState("");
  const [bCategory, setBCategory] = useState<string>("Auto-Reply");
  const [bTrigger, setBTrigger] = useState("");
  const [bMessage, setBMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("wavly.userName");
    if (stored) setUserName(stored);
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }

  function toggleAutomation(id: string) {
    setAutomations((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a;
        showToast(
          a.active ? `"${a.name}" paused` : `"${a.name}" activated`
        );
        return { ...a, active: !a.active };
      })
    );
  }

  function deleteAutomation(id: string) {
    setOpenMenu(null);
    const target = automations.find((a) => a.id === id);
    setAutomations((prev) => prev.filter((a) => a.id !== id));
    showToast(`"${target?.name || "Automation"}" deleted`);
  }

  function editAutomation(name: string) {
    setOpenMenu(null);
    showToast(`Opening editor for "${name}"…`);
  }

  function useTemplate(name: string) {
    // Pre-fill the builder from a template and open it
    setBName(name);
    setBCategory(
      /book/i.test(name) ? "Bookings" :
      /payment/i.test(name) ? "Payments" :
      /reminder|confirm/i.test(name) ? "Reminders" :
      /welcome|follow/i.test(name) ? "Onboarding" :
      /birthday|offer/i.test(name) ? "Promotions" : "Auto-Reply"
    );
    setBTrigger("");
    setBMessage("");
    setBuilderOpen(true);
  }

  function createNew() {
    setBName("");
    setBCategory("Auto-Reply");
    setBTrigger("");
    setBMessage("");
    setBuilderOpen(true);
  }

  function saveAutomation() {
    if (!bName.trim()) return;
    const newAuto: Automation = {
      id: `a-${Date.now()}`,
      name: bName.trim(),
      description: bMessage.trim() || "Custom automation created by you.",
      trigger: bTrigger.trim() || "Custom trigger",
      icon: iconForCategory(bCategory),
      active: true,
      uses: "Just created",
      category: bCategory,
    };
    setAutomations((prev) => [newAuto, ...prev]);
    setBuilderOpen(false);
    showToast(`"${newAuto.name}" created and turned on`);
  }

  const activeCount = automations.filter((a) => a.active).length;
  const totalSavedTime = "8.5 hrs this week";

  return (
    <div className="flex-1 flex flex-col">
      <DashboardNav userName={userName} />

      <main
        className="relative flex-1 px-6 lg:px-10 py-10 lg:py-14"
        onClick={() => setOpenMenu(null)}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[820px] rounded-full bg-[var(--color-gold-soft)]/15 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <nav className="text-xs text-[var(--color-muted)] flex items-center gap-2">
            <Link href="/dashboard" className="hover:text-[var(--color-forest)]">
              Dashboard
            </Link>
            <ChevronRight />
            <span className="text-[var(--color-ink-soft)]">Automations</span>
          </nav>

          {/* Header */}
          <section className="mt-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <Reveal>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                  Your workflows
                </div>
                <h1 className="mt-2 text-3xl sm:text-4xl tracking-tight text-[var(--color-ink)]">
                  <span className="font-display italic text-[var(--color-forest)]">
                    Automations
                  </span>
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-[var(--color-ink-soft)] leading-relaxed">
                  Each automation runs quietly in the background. Together they
                  save you{" "}
                  <span className="font-medium text-[var(--color-forest)]">
                    {totalSavedTime}
                  </span>{" "}
                  — and counting.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="flex items-center gap-3">
                <Link
                  href="/templates"
                  className="btn-press hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-4 py-2.5 text-sm font-medium text-[var(--color-ink-soft)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" />
                  </svg>
                  Templates
                </Link>
                <button
                  onClick={createNew}
                  className="btn-press group inline-flex items-center gap-2 rounded-full bg-[var(--color-forest)] px-5 py-3 text-sm font-medium text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 shadow-[0_8px_22px_-6px_rgba(20,58,47,0.5)] transition-all"
                >
                  <PlusIcon />
                  Create new automation
                  <span className="ml-1 hidden sm:inline-flex items-center gap-1 rounded-full bg-[var(--color-cream-soft)]/15 px-2 py-0.5 text-[10px] font-medium text-[var(--color-cream-soft)]/90">
                    <SparkleMini /> AI-guided
                  </span>
                </button>
              </div>
            </Reveal>
          </section>

          {/* Active Automations */}
          <section className="mt-12">
            <Reveal>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                    Active automations
                  </div>
                  <h2 className="mt-2 text-2xl tracking-tight text-[var(--color-ink)]">
                    Your running workflows
                  </h2>
                </div>
              </div>
            </Reveal>

            {automations.length === 0 ? (
              <div className="mt-6 rounded-3xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-cream-soft)]/40 p-12 text-center">
                <div className="mx-auto inline-flex h-12 w-12 rounded-2xl bg-[var(--color-forest)]/[0.07] text-[var(--color-forest)] items-center justify-center">
                  <BoltIcon />
                </div>
                <h3 className="mt-5 text-lg font-medium text-[var(--color-ink)]">
                  No automations yet
                </h3>
                <p className="mt-1.5 text-sm text-[var(--color-muted)]">
                  Pick a template below to set up your first one in seconds.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {automations.map((a, i) => (
                  <Reveal key={a.id} delay={80 + i * 70}>
                    <AutomationCard
                      automation={a}
                      onToggle={() => toggleAutomation(a.id)}
                      onDelete={() => deleteAutomation(a.id)}
                      onEdit={() => editAutomation(a.name)}
                      menuOpen={openMenu === a.id}
                      onMenuToggle={(e) => {
                        e.stopPropagation();
                        setOpenMenu(openMenu === a.id ? null : a.id);
                      }}
                    />
                  </Reveal>
                ))}
              </div>
            )}
          </section>

          {/* Starter Templates */}
          <section className="mt-16">
            <Reveal>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                    Starter templates
                  </div>
                  <h2 className="mt-2 text-2xl tracking-tight text-[var(--color-ink)]">
                    Pick a template, go live in{" "}
                    <span className="font-display italic text-[var(--color-forest)]">
                      30 seconds
                    </span>
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm text-[var(--color-ink-soft)]">
                    Pre-built, polished automations that work out of the box.
                    Tweak the message and turn them on.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {templates.map((t, i) => (
                <Reveal key={t.id} delay={80 + (i % 4) * 70}>
                  <Tilt3D max={5} perspective={1100}>
                    <TemplateCard template={t} onUse={() => useTemplate(t.name)} />
                  </Tilt3D>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Closing note */}
          <Reveal>
            <p className="mt-12 text-center text-xs text-[var(--color-muted)]">
              Want a custom automation built for you?{" "}
              <a
                href="mailto:hello@wavly.in"
                className="font-medium text-[var(--color-forest)] hover:underline underline-offset-2"
              >
                Talk to our team
              </a>{" "}
              — we&apos;ll build it for free during your trial.
            </p>
          </Reveal>
        </div>
      </main>

      {/* Builder modal */}
      {builderOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[8vh] sm:pt-[10vh]">
          <div
            className="absolute inset-0 bg-[var(--color-ink)]/30 backdrop-blur-sm animate-fade-up"
            onClick={() => setBuilderOpen(false)}
          />
          <div className="relative w-full max-w-lg rounded-3xl border border-[var(--color-border)] bg-[var(--color-cream-soft)] shadow-[0_40px_100px_-30px_rgba(20,33,28,0.5)] overflow-hidden animate-fade-up">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border-soft)]">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-[var(--color-forest)] text-[var(--color-cream-soft)] flex items-center justify-center">
                  <BoltIcon />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
                    New automation
                  </div>
                  <div className="text-sm font-medium text-[var(--color-ink)]">Build your workflow</div>
                </div>
              </div>
              <button onClick={() => setBuilderOpen(false)} aria-label="Close" className="text-[var(--color-muted)] hover:text-[var(--color-forest)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M6 6l12 12M6 18L18 6" /></svg>
              </button>
            </div>

            <div className="px-6 py-5 space-y-4 max-h-[64vh] overflow-y-auto">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium tracking-wide text-[var(--color-ink-soft)]">Name</label>
                <input
                  value={bName}
                  onChange={(e) => setBName(e.target.value)}
                  placeholder="e.g. Saturday booking reminder"
                  autoFocus
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/70 outline-none focus:border-[var(--color-forest)] focus:ring-4 focus:ring-[var(--color-forest)]/10 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium tracking-wide text-[var(--color-ink-soft)]">Category</label>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORY_OPTIONS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setBCategory(c)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                        bCategory === c
                          ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)]"
                          : "bg-[var(--color-surface)] border border-[var(--color-border-soft)] text-[var(--color-ink-soft)] hover:border-[var(--color-forest)]/40"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium tracking-wide text-[var(--color-ink-soft)]">Trigger</label>
                <input
                  value={bTrigger}
                  onChange={(e) => setBTrigger(e.target.value)}
                  placeholder='e.g. Keyword "price" · or "1 hour before booking"'
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/70 outline-none focus:border-[var(--color-forest)] focus:ring-4 focus:ring-[var(--color-forest)]/10 transition-all"
                />
                <span className="text-[11px] text-[var(--color-muted)]">When should this automation fire?</span>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium tracking-wide text-[var(--color-ink-soft)]">Message</label>
                <textarea
                  value={bMessage}
                  onChange={(e) => setBMessage(e.target.value)}
                  rows={4}
                  placeholder="What should the bot send? Use {{name}} to personalize."
                  className="w-full resize-none rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm leading-relaxed text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/60 outline-none focus:border-[var(--color-forest)] focus:ring-4 focus:ring-[var(--color-forest)]/10 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-[var(--color-border-soft)]">
              <span className="text-[11px] text-[var(--color-muted)]">It&apos;ll turn on automatically once created.</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setBuilderOpen(false)} className="btn-press rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-4 py-2 text-sm font-medium text-[var(--color-ink-soft)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] transition-colors">
                  Cancel
                </button>
                <button
                  onClick={saveAutomation}
                  disabled={!bName.trim()}
                  className={`btn-press inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    bName.trim()
                      ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)]"
                      : "bg-[var(--color-forest)]/40 text-[var(--color-cream-soft)]/70 cursor-not-allowed"
                  }`}
                >
                  <PlusIcon />
                  Create automation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

/* ----------------- Automation Card ----------------- */

function AutomationCard({
  automation,
  onToggle,
  onDelete,
  onEdit,
  menuOpen,
  onMenuToggle,
}: {
  automation: Automation;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
  menuOpen: boolean;
  onMenuToggle: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      className={`group relative h-full rounded-3xl border bg-[var(--color-cream-soft)] p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-22px_rgba(20,33,28,0.25)] ${
        automation.active
          ? "border-[var(--color-border-soft)]"
          : "border-[var(--color-border-soft)] opacity-75 hover:opacity-100"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          <div
            className={`h-11 w-11 shrink-0 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105 ${
              automation.active
                ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)]"
                : "bg-[var(--color-cream-deep)]/60 text-[var(--color-muted)]"
            }`}
          >
            {automation.icon}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-medium text-[var(--color-ink)] truncate">
                {automation.name}
              </h3>
              <span className="inline-flex items-center rounded-full bg-[var(--color-gold)]/12 px-2 py-0.5 text-[10px] font-medium text-[var(--color-gold)] uppercase tracking-wider">
                {automation.category}
              </span>
            </div>
            <p className="mt-1 text-sm text-[var(--color-ink-soft)] leading-relaxed">
              {automation.description}
            </p>
          </div>
        </div>

        {/* Menu */}
        <div className="relative">
          <button
            onClick={onMenuToggle}
            aria-label="More options"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)]/50 hover:text-[var(--color-forest)] transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <circle cx="5" cy="12" r="1.6" />
              <circle cx="12" cy="12" r="1.6" />
              <circle cx="19" cy="12" r="1.6" />
            </svg>
          </button>
          {menuOpen && (
            <div
              className="absolute right-0 top-9 z-20 w-44 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-1.5 shadow-[0_18px_40px_-15px_rgba(20,33,28,0.25)] animate-fade-up"
              onClick={(e) => e.stopPropagation()}
            >
              {automation.href && (
                <Link
                  href={automation.href}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)]/40 hover:text-[var(--color-forest)] transition-colors"
                >
                  <ExternalIcon />
                  Open settings
                </Link>
              )}
              <button
                onClick={onEdit}
                className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)]/40 hover:text-[var(--color-forest)] transition-colors"
              >
                <PencilIcon />
                Edit
              </button>
              <button
                onClick={() => {
                  if (
                    typeof window !== "undefined" &&
                    window.confirm(`Delete "${automation.name}"?`)
                  ) {
                    onDelete();
                  }
                }}
                className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <TrashIcon />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Trigger row */}
      <div className="mt-5 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-3.5">
        <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] font-medium">
          Trigger
        </div>
        <div className="mt-1 text-sm text-[var(--color-ink)] font-medium">
          {automation.trigger}
        </div>
      </div>

      {/* Footer row */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
          <span className="inline-flex items-center gap-1.5 text-[var(--color-ink-soft)]">
            <PulseIcon />
            {automation.uses}
          </span>
        </div>
        <Toggle
          checked={automation.active}
          onChange={onToggle}
          label={automation.active ? "Active" : "Paused"}
        />
      </div>
    </div>
  );
}

/* ----------------- Template Card ----------------- */

function TemplateCard({
  template,
  onUse,
}: {
  template: Template;
  onUse: () => void;
}) {
  return (
    <div className="group relative flex flex-col h-full rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-5 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-forest)]/25 hover:shadow-[0_22px_50px_-22px_rgba(20,33,28,0.25)]">
      {/* hover sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[var(--color-gold-soft)]/25 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500"
      />

      {template.popular && (
        <div
          style={{ transform: "translateZ(15px)" }}
          className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-[var(--color-gold)]/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--color-gold)]"
        >
          <SparkleMini /> Popular
        </div>
      )}

      <div
        style={{ transform: "translateZ(25px)" }}
        className="h-11 w-11 rounded-xl bg-[var(--color-forest)] text-[var(--color-cream-soft)] flex items-center justify-center shadow-[0_8px_18px_-8px_rgba(20,58,47,0.5)]"
      >
        {template.icon}
      </div>

      <h3
        style={{ transform: "translateZ(15px)" }}
        className="mt-5 text-base font-medium text-[var(--color-ink)]"
      >
        {template.name}
      </h3>
      <p className="mt-1.5 text-sm text-[var(--color-ink-soft)] leading-relaxed flex-1">
        {template.description}
      </p>

      <div className="mt-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border-soft)] px-2.5 py-1.5 text-[10px] text-[var(--color-muted)]">
        <span className="uppercase tracking-[0.12em] font-medium">Trigger</span>{" "}
        · <span className="text-[var(--color-ink-soft)]">{template.trigger}</span>
      </div>

      <button
        onClick={onUse}
        className="btn-press mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-forest)]/[0.06] text-[var(--color-forest)] hover:bg-[var(--color-forest)] hover:text-[var(--color-cream-soft)] px-4 py-2 text-xs font-medium transition-all border border-[var(--color-forest)]/15"
      >
        Use template
        <ArrowRight />
      </button>
    </div>
  );
}

/* ----------------- Toggle ----------------- */

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="inline-flex items-center gap-2.5 group"
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
          className={`text-xs font-medium transition-colors ${
            checked ? "text-[var(--color-forest)]" : "text-[var(--color-muted)]"
          }`}
        >
          {label}
        </span>
      )}
    </button>
  );
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
function BoltIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg {...svgProps()}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}
function RupeeIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M6 5h12M6 9h12M9 5c4 0 6 2 6 4 0 3-2 4-6 4l8 8" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
    </svg>
  );
}
function CheckCircleIcon() {
  return (
    <svg {...svgProps()}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
function GiftIcon() {
  return (
    <svg {...svgProps()}>
      <rect x="3" y="8" width="18" height="13" rx="1" />
      <path d="M12 8v13M3 12h18" />
      <path d="M7.5 8a2.5 2.5 0 010-5C9 3 12 8 12 8s3-5 4.5-5a2.5 2.5 0 010 5" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function PulseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3 text-[var(--color-forest)]"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function SparkleMini() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-2.5 w-2.5"
    >
      <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <path d="M15 3h6v6M10 14L21 3" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M10 11v6M14 11v6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M5 12l4 4 10-10" />
    </svg>
  );
}
