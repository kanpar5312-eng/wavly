"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Logo } from "../components/Logo";

type Plan = "Free" | "Pro";
type Status = "Active" | "Inactive";

type User = {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  status: Status;
  expiry: string | null; // ISO-ish display string
  joined: string;
};

type Activity = {
  text: string;
  time: string;
  type: "signup" | "payment" | "upgrade" | "trial" | "expired";
};

const initialUsers: User[] = [
  {
    id: "u-1",
    name: "Priya Sharma",
    email: "priya@glowsalon.in",
    plan: "Pro",
    status: "Active",
    expiry: "14 Jun 2026",
    joined: "12 Jan 2026",
  },
  {
    id: "u-2",
    name: "Rohan Mehta",
    email: "rohan@coachrohan.com",
    plan: "Free",
    status: "Active",
    expiry: null,
    joined: "22 Feb 2026",
  },
  {
    id: "u-3",
    name: "Dr. Anika Verma",
    email: "anika@verndaclinic.in",
    plan: "Pro",
    status: "Active",
    expiry: "2 Aug 2026",
    joined: "01 Mar 2026",
  },
  {
    id: "u-4",
    name: "Karthik Iyer",
    email: "karthik@iyertutorials.com",
    plan: "Pro",
    status: "Inactive",
    expiry: "11 Mar 2026",
    joined: "08 Sep 2025",
  },
  {
    id: "u-5",
    name: "Aanya Patel",
    email: "aanya@patelboutique.co",
    plan: "Free",
    status: "Active",
    expiry: null,
    joined: "14 Apr 2026",
  },
  {
    id: "u-6",
    name: "Vikram Singh",
    email: "vikram@coachvikram.in",
    plan: "Pro",
    status: "Active",
    expiry: "28 Jul 2026",
    joined: "02 May 2026",
  },
  {
    id: "u-7",
    name: "Diya Reddy",
    email: "diya@spabydiya.in",
    plan: "Free",
    status: "Active",
    expiry: null,
    joined: "10 May 2026",
  },
  {
    id: "u-8",
    name: "Aarav Nair",
    email: "aarav@nairdental.in",
    plan: "Pro",
    status: "Active",
    expiry: "15 Sep 2026",
    joined: "16 May 2026",
  },
  {
    id: "u-9",
    name: "Sneha Krishnan",
    email: "sneha@aurorabeauty.in",
    plan: "Pro",
    status: "Active",
    expiry: "Lifetime",
    joined: "20 May 2026",
  },
  {
    id: "u-10",
    name: "Manav Gupta",
    email: "manav@guptaclasses.in",
    plan: "Free",
    status: "Inactive",
    expiry: null,
    joined: "24 May 2026",
  },
];

const activities: Activity[] = [
  { text: "Aarav Nair signed up", time: "12 min ago", type: "signup" },
  {
    text: "Payment of ₹999 received from Priya Sharma",
    time: "1 h ago",
    type: "payment",
  },
  {
    text: "Rohan Mehta upgraded to Yearly plan",
    time: "3 h ago",
    type: "upgrade",
  },
  { text: "Manav Gupta started a free trial", time: "Yesterday", type: "trial" },
  {
    text: "₹19,999 (Lifetime) received from Sneha Krishnan",
    time: "Yesterday",
    type: "payment",
  },
  { text: "Karthik Iyer's subscription expired", time: "2 days ago", type: "expired" },
];

function addDays(date: string, days: number) {
  // Accepts our display strings; if Lifetime, return Lifetime.
  if (date === "Lifetime") return "Lifetime";
  // For demo, just add days to today.
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users, query]);

  const stats = useMemo(() => {
    const total = users.length;
    const activeSubs = users.filter((u) => u.plan === "Pro" && u.status === "Active").length;
    // Demo revenue calc: each active Pro user ≈ ₹999/mo (mocked)
    const revenue = activeSubs * 999;
    const thisMonth = users.length; // mocked — all our seed users joined "recently"
    return {
      totalUsers: total.toLocaleString("en-IN"),
      activeSubs: activeSubs.toLocaleString("en-IN"),
      revenue: `₹${revenue.toLocaleString("en-IN")}`,
      newThisMonth: thisMonth.toLocaleString("en-IN"),
    };
  }, [users]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }

  function activatePro(id: string) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              plan: "Pro" as Plan,
              status: "Active" as Status,
              expiry: addDays(new Date().toString(), 30),
            }
          : u
      )
    );
    const user = users.find((u) => u.id === id);
    showToast(`${user?.name || "User"} upgraded to Pro · 30 days added`);
  }

  function extendSubscription(id: string) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status: "Active" as Status,
              expiry: u.expiry === "Lifetime" ? "Lifetime" : addDays(new Date().toString(), 30),
            }
          : u
      )
    );
    const user = users.find((u) => u.id === id);
    showToast(`${user?.name || "User"}'s subscription extended by 30 days`);
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-[var(--color-border-soft)] bg-[var(--color-cream)]/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden sm:inline-flex items-center rounded-full border border-[var(--color-gold)]/50 bg-[var(--color-gold)]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-forest)]">
              Admin
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className="text-sm font-medium text-[var(--color-ink)]">
                Parneet Singh
              </span>
              <span className="text-[11px] text-[var(--color-muted)]">
                Owner
              </span>
            </div>
            <div className="h-9 w-9 rounded-full bg-[var(--color-forest)] text-[var(--color-cream-soft)] flex items-center justify-center text-sm font-medium">
              P
            </div>
            <Link
              href="/signin"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-4 py-2 text-xs font-medium text-[var(--color-ink-soft)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
              >
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <path d="M16 17l5-5-5-5M21 12H9" />
              </svg>
              Logout
            </Link>
          </div>
        </nav>
      </header>

      {/* Page */}
      <main className="flex-1 px-6 lg:px-10 py-10 lg:py-14">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                Internal · Owner only
              </div>
              <h1 className="mt-2 text-3xl sm:text-4xl tracking-tight text-[var(--color-ink)]">
                Owner{" "}
                <span className="font-display italic text-[var(--color-forest)]">
                  Dashboard
                </span>
              </h1>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                Manage users, subscriptions, and view key business metrics.
              </p>
            </div>
            <div className="self-start inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-4 py-2 text-xs text-[var(--color-ink-soft)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-forest)] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-forest)]" />
              </span>
              Live · synced just now
            </div>
          </section>

          {/* Stats */}
          <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total users"
              value={stats.totalUsers}
              hint="All registered accounts"
              icon={<UsersIcon />}
            />
            <StatCard
              label="Active subscriptions"
              value={stats.activeSubs}
              hint="Paying customers right now"
              icon={<CreditIcon />}
              change="+8.2%"
              trend="up"
            />
            <StatCard
              label="Monthly revenue"
              value={stats.revenue}
              hint="Recurring · this month"
              icon={<RupeeIcon />}
              change="+12.1%"
              trend="up"
            />
            <StatCard
              label="New signups"
              value={stats.newThisMonth}
              hint="This month"
              icon={<SparkIcon />}
              change="+24%"
              trend="up"
            />
          </section>

          {/* Users */}
          <section className="mt-14">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                  Users
                </div>
                <h2 className="mt-2 text-2xl tracking-tight text-[var(--color-ink)]">
                  Manage subscriptions
                </h2>
              </div>

              <div className="relative w-full sm:w-80">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
                <input
                  type="search"
                  placeholder="Search by name or email"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/80 outline-none focus:border-[var(--color-forest)] focus:ring-4 focus:ring-[var(--color-forest)]/10 transition-all"
                />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-[var(--color-border-soft)]">
                      <th className="px-5 py-3 text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">
                        User
                      </th>
                      <th className="px-5 py-3 text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">
                        Plan
                      </th>
                      <th className="px-5 py-3 text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">
                        Status
                      </th>
                      <th className="px-5 py-3 text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">
                        Expiry
                      </th>
                      <th className="px-5 py-3 text-right text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border-soft)]">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-5 py-14 text-center">
                          <div className="text-sm font-medium text-[var(--color-ink)]">
                            No users match &ldquo;{query}&rdquo;
                          </div>
                          <div className="mt-1 text-xs text-[var(--color-muted)]">
                            Try a different name or email.
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filtered.map((u) => (
                        <tr
                          key={u.id}
                          className="hover:bg-[var(--color-surface)] transition-colors"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-full bg-[var(--color-cream-deep)] text-[var(--color-forest)] flex items-center justify-center text-xs font-medium">
                                {initials(u.name)}
                              </div>
                              <div>
                                <div className="font-medium text-[var(--color-ink)] leading-tight">
                                  {u.name}
                                </div>
                                <div className="text-xs text-[var(--color-muted)] truncate max-w-[220px]">
                                  {u.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <PlanBadge plan={u.plan} />
                          </td>
                          <td className="px-5 py-4">
                            <StatusBadge status={u.status} />
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-[13px] text-[var(--color-ink-soft)]">
                              {u.expiry ?? "—"}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            {u.plan === "Free" ? (
                              <button
                                onClick={() => activatePro(u.id)}
                                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-forest)] px-4 py-1.5 text-xs font-medium text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] transition-colors"
                              >
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-3 w-3"
                                >
                                  <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
                                </svg>
                                Activate Pro
                              </button>
                            ) : (
                              <button
                                onClick={() => extendSubscription(u.id)}
                                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-4 py-1.5 text-xs font-medium text-[var(--color-ink-soft)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] transition-colors"
                              >
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-3 w-3"
                                >
                                  <path d="M12 6v6l4 2" />
                                  <circle cx="12" cy="12" r="10" />
                                </svg>
                                Extend
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-[var(--color-border-soft)] px-5 py-3 flex items-center justify-between text-xs text-[var(--color-muted)]">
                <div>
                  Showing{" "}
                  <span className="text-[var(--color-ink)] font-medium">
                    {filtered.length}
                  </span>{" "}
                  of{" "}
                  <span className="text-[var(--color-ink)] font-medium">
                    {users.length}
                  </span>{" "}
                  users
                </div>
                <div>Updated just now</div>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="mt-14">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
              Recent activity
            </div>
            <h2 className="mt-2 text-2xl tracking-tight text-[var(--color-ink)]">
              What&apos;s happening across Wavly
            </h2>

            <div className="mt-6 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] overflow-hidden">
              <ul className="divide-y divide-[var(--color-border-soft)]">
                {activities.map((a, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 px-5 py-4 hover:bg-[var(--color-surface)] transition-colors"
                  >
                    <ActivityIcon type={a.type} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-[var(--color-ink)] truncate">
                        {a.text}
                      </div>
                    </div>
                    <div className="text-[11px] text-[var(--color-muted)] shrink-0">
                      {a.time}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-up">
          <div className="flex items-center gap-3 rounded-full bg-[var(--color-forest)] px-5 py-3 text-sm font-medium text-[var(--color-cream-soft)] shadow-[0_18px_40px_-15px_rgba(20,33,28,0.45)]">
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
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------- Sub-components ------------- */

function StatCard({
  label,
  value,
  hint,
  icon,
  change,
  trend,
}: {
  label: string;
  value: string;
  hint: string;
  icon: React.ReactNode;
  change?: string;
  trend?: "up" | "down";
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-5 shadow-[0_4px_18px_-12px_rgba(20,33,28,0.18)] hover:shadow-[0_16px_40px_-20px_rgba(20,33,28,0.28)] hover:-translate-y-0.5 hover:border-[var(--color-border)] transition-all">
      <div className="flex items-center justify-between">
        <div className="h-10 w-10 rounded-xl bg-[var(--color-forest)]/[0.07] text-[var(--color-forest)] flex items-center justify-center">
          {icon}
        </div>
        {change && (
          <div
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
              trend === "up"
                ? "bg-[var(--color-forest)]/[0.08] text-[var(--color-forest)]"
                : "bg-red-50 text-red-600"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-3 w-3 ${trend === "down" ? "rotate-180" : ""}`}
            >
              <path d="M7 17l5-5 5 5M7 7h10" />
            </svg>
            {change}
          </div>
        )}
      </div>
      <div className="mt-5 font-display text-[2.2rem] leading-none tracking-tight text-[var(--color-forest)]">
        {value}
      </div>
      <div className="mt-2 text-sm font-medium text-[var(--color-ink)]">
        {label}
      </div>
      <div className="mt-1 text-xs text-[var(--color-muted)]">{hint}</div>
    </div>
  );
}

function PlanBadge({ plan }: { plan: Plan }) {
  if (plan === "Pro") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-forest)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-cream-soft)]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-2.5 w-2.5"
        >
          <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
        </svg>
        Pro
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-cream-deep)]/40 px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-ink-soft)]">
      Free
    </span>
  );
}

function StatusBadge({ status }: { status: Status }) {
  if (status === "Active") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-forest)]/[0.08] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-forest)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-forest)]" />
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-cream-deep)]/40 px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-muted)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-muted)]" />
      Inactive
    </span>
  );
}

function ActivityIcon({ type }: { type: Activity["type"] }) {
  const base = "h-10 w-10 shrink-0 rounded-xl flex items-center justify-center";
  if (type === "signup")
    return (
      <div className={`${base} bg-[var(--color-forest)]/[0.08] text-[var(--color-forest)]`}>
        <UserPlusIcon />
      </div>
    );
  if (type === "payment")
    return (
      <div className={`${base} bg-[var(--color-gold)]/15 text-[var(--color-gold)]`}>
        <RupeeIcon />
      </div>
    );
  if (type === "upgrade")
    return (
      <div className={`${base} bg-[#e7f0ea] text-[var(--color-forest)]`}>
        <ArrowUpIcon />
      </div>
    );
  if (type === "trial")
    return (
      <div className={`${base} bg-[#efe9dc] text-[var(--color-forest-soft)]`}>
        <SparkIcon />
      </div>
    );
  return (
    <div className={`${base} bg-red-50 text-red-500`}>
      <AlertIcon />
    </div>
  );
}

/* ------------- helpers + icons ------------- */

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || "")
    .join("");
}

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

function UsersIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
function CreditIcon() {
  return (
    <svg {...svgProps()}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20M6 15h4" />
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
function SparkIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
    </svg>
  );
}
function UserPlusIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="M20 8v6M17 11h6" />
    </svg>
  );
}
function ArrowUpIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}
function AlertIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M12 9v4M12 17h.01" />
      <path d="M10.3 3.3L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.3a2 2 0 00-3.4 0z" />
    </svg>
  );
}
