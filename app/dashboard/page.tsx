"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { DashboardNav } from "../components/DashboardNav";
import { Reveal } from "../components/Reveal";
import { Tilt3D } from "../components/Tilt3D";

type Stat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change?: { value: string; trend: "up" | "down" };
  icon: React.ReactNode;
  hint: string;
  trendData: number[];
};

type QuickAction = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

type Activity = {
  title: string;
  detail: string;
  time: string;
  icon: React.ReactNode;
  iconBg: string;
};

const stats: Stat[] = [
  {
    label: "Connected numbers",
    value: 2,
    icon: <PhoneIcon />,
    hint: "Verified WhatsApp lines",
    trendData: [1, 1, 1, 2, 2, 2, 2],
  },
  {
    label: "Messages today",
    value: 1248,
    change: { value: "+12.4%", trend: "up" },
    icon: <ChatIcon />,
    hint: "vs. yesterday",
    trendData: [820, 940, 880, 1020, 990, 1110, 1248],
  },
  {
    label: "Active automations",
    value: 8,
    change: { value: "+2", trend: "up" },
    icon: <BoltIcon />,
    hint: "Running across all numbers",
    trendData: [4, 4, 5, 6, 6, 7, 8],
  },
  {
    label: "Total customers",
    value: 342,
    change: { value: "+18", trend: "up" },
    icon: <UsersIcon />,
    hint: "New this week",
    trendData: [280, 290, 305, 312, 318, 330, 342],
  },
];

const quickActions: QuickAction[] = [
  {
    title: "Create automation",
    description: "Set up smart replies, bookings or reminders.",
    href: "/automations",
    icon: <BoltIcon />,
  },
  {
    title: "Connect new number",
    description: "Add another WhatsApp line to your workspace.",
    href: "/connect",
    icon: <PhoneIcon />,
  },
  {
    title: "Open inbox",
    description: "Reply to every customer from one place.",
    href: "/inbox",
    icon: <InboxIcon />,
  },
  {
    title: "View analytics",
    description: "See response time, growth and revenue.",
    href: "/analytics",
    icon: <ChartIcon />,
  },
];

const activities: Activity[] = [
  {
    title: "Auto-reply sent",
    detail: "Replied to Priya about Saturday appointment availability.",
    time: "Just now",
    icon: <BoltIcon />,
    iconBg: "bg-[var(--color-forest)]/[0.08] text-[var(--color-forest)]",
  },
  {
    title: "New booking received",
    detail: "Rohan booked a facial for Sat, 6:00 PM.",
    time: "4 min ago",
    icon: <CalendarIcon />,
    iconBg: "bg-[#e7f0ea] text-[var(--color-forest)]",
  },
  {
    title: "Payment reminder sent",
    detail: "Reminded Dr. Mehta about pending invoice #1042.",
    time: "22 min ago",
    icon: <RupeeIcon />,
    iconBg: "bg-[var(--color-gold)]/15 text-[var(--color-gold)]",
  },
  {
    title: "New customer added",
    detail: "Anaya joined from your Instagram link.",
    time: "1 h ago",
    icon: <UserPlusIcon />,
    iconBg: "bg-[#efe9dc] text-[var(--color-forest)]",
  },
  {
    title: "Appointment reminder sent",
    detail: "Reminded 8 customers about today's bookings.",
    time: "3 h ago",
    icon: <BellIcon />,
    iconBg: "bg-[var(--color-forest)]/[0.08] text-[var(--color-forest)]",
  },
  {
    title: "Automation updated",
    detail: 'You edited "Saturday booking reminder" template.',
    time: "Yesterday",
    icon: <PencilIcon />,
    iconBg: "bg-[#ece3d1] text-[var(--color-forest-soft)]",
  },
];

function greetingForHour(h: number) {
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [greeting, setGreeting] = useState("Good afternoon");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("wavly.userName");
    if (stored) setUserName(stored);
    setGreeting(greetingForHour(new Date().getHours()));
    setDate(
      new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    );
  }, []);

  const firstName = (userName || "there").split(" ")[0];

  return (
    <div className="flex-1 flex flex-col">
      <DashboardNav userName={userName} />

      <main className="relative flex-1 px-6 lg:px-10 py-10 lg:py-14">
        {/* very subtle background tint */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-[var(--color-gold-soft)]/15 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl">
          {/* Greeting */}
          <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <Reveal>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                  <span>{date || "Today"}</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--color-gold)]/60" />
                  <span>Day 12 of trial</span>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-2 text-3xl sm:text-[2.5rem] tracking-tight text-[var(--color-ink)] leading-tight">
                  {greeting},{" "}
                  <span className="font-display italic text-[var(--color-forest)]">
                    {firstName}
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--color-ink-soft)]">
                  <div className="inline-flex items-center gap-2">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-forest)] opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-forest)]" />
                    </span>
                    Wavly handled{" "}
                    <span className="font-medium text-[var(--color-forest)]">
                      92%
                    </span>{" "}
                    of chats today
                  </div>
                  <div className="hidden sm:block h-3 w-px bg-[var(--color-border)]" />
                  <div>
                    You saved{" "}
                    <span className="font-medium text-[var(--color-forest)]">
                      ~3.2 hours
                    </span>{" "}
                    vs last week
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={220}>
              <Link
                href="/automations"
                className="self-start inline-flex items-center gap-2 rounded-full bg-[var(--color-forest)] px-5 py-2.5 text-sm font-medium text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 transition-all shadow-[0_8px_22px_-6px_rgba(20,58,47,0.45)]"
              >
                <PlusIcon />
                New automation
              </Link>
            </Reveal>
          </section>

          {/* Stats */}
          <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={120 + i * 90}>
                <Tilt3D max={5} perspective={1100}>
                  <StatCard stat={s} />
                </Tilt3D>
              </Reveal>
            ))}
          </section>

          {/* Quick Actions */}
          <section className="mt-14">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                Quick actions
              </div>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="mt-2 text-2xl tracking-tight text-[var(--color-ink)]">
                Jump back in
              </h2>
            </Reveal>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((a, i) => (
                <Reveal key={a.title} delay={120 + i * 80}>
                  <Tilt3D max={6} perspective={1100}>
                  <Link
                    href={a.href}
                    className="group relative block h-full rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-5 overflow-hidden transition-all duration-500 ease-out hover:border-[var(--color-forest)]/25 hover:shadow-[0_28px_50px_-22px_rgba(20,33,28,0.28)]"
                  >
                    {/* hover sheen */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[var(--color-gold-soft)]/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"
                    />
                    <div className="relative">
                      <div
                        style={{ transform: "translateZ(25px)" }}
                        className="h-11 w-11 rounded-xl bg-[var(--color-forest)] text-[var(--color-cream-soft)] flex items-center justify-center group-hover:bg-[var(--color-forest-deep)] transition-colors shadow-[0_8px_18px_-8px_rgba(20,58,47,0.5)]"
                      >
                        {a.icon}
                      </div>
                      <div className="mt-5 text-base font-medium text-[var(--color-ink)] flex items-center justify-between">
                        {a.title}
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 text-[var(--color-muted)] group-hover:text-[var(--color-forest)] group-hover:translate-x-1 transition-all duration-300"
                        >
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </div>
                      <p className="mt-1.5 text-sm text-[var(--color-ink-soft)] leading-relaxed">
                        {a.description}
                      </p>
                    </div>
                  </Link>
                  </Tilt3D>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section className="mt-14">
            <div className="flex items-end justify-between">
              <div>
                <Reveal>
                  <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium flex items-center gap-2">
                    Recent activity
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-forest)]/[0.08] px-2 py-0.5 text-[10px] font-medium text-[var(--color-forest)] normal-case tracking-normal">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-forest)] opacity-70" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-forest)]" />
                      </span>
                      Live
                    </span>
                  </div>
                </Reveal>
                <Reveal delay={60}>
                  <h2 className="mt-2 text-2xl tracking-tight text-[var(--color-ink)]">
                    What Wavly did for you
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={120}>
                <Link
                  href="/inbox"
                  className="hidden sm:inline-flex items-center gap-1 text-sm text-[var(--color-forest)] hover:text-[var(--color-forest-deep)] transition-colors"
                >
                  View all
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <div className="mt-6 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] overflow-hidden shadow-[0_4px_18px_-12px_rgba(20,33,28,0.12)]">
                <ul className="divide-y divide-[var(--color-border-soft)]">
                  {activities.map((a, i) => (
                    <Reveal key={i} delay={60 + i * 70} as="li">
                      <div className="group flex items-start gap-4 px-5 py-4 hover:bg-[var(--color-surface)] transition-colors cursor-pointer">
                        <div
                          className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.06] ${a.iconBg}`}
                        >
                          {a.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-sm font-medium text-[var(--color-ink)] truncate">
                              {a.title}
                            </div>
                            <div className="text-[11px] text-[var(--color-muted)] shrink-0">
                              {a.time}
                            </div>
                          </div>
                          <div className="mt-0.5 text-sm text-[var(--color-ink-soft)] truncate">
                            {a.detail}
                          </div>
                        </div>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="hidden sm:block h-4 w-4 mt-3 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 text-[var(--color-forest)] transition-all duration-300"
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </div>
                    </Reveal>
                  ))}
                </ul>
                <div className="border-t border-[var(--color-border-soft)] bg-[var(--color-cream)]/40 px-5 py-3 flex items-center justify-between text-[11px] text-[var(--color-muted)]">
                  <div>Showing latest 6 activities</div>
                  <Link
                    href="/inbox"
                    className="font-medium text-[var(--color-forest)] hover:text-[var(--color-forest-deep)] sm:hidden"
                  >
                    View all →
                  </Link>
                </div>
              </div>
            </Reveal>
          </section>
        </div>
      </main>
    </div>
  );
}

/* ----------------- Stat card with sparkline + counter ----------------- */

function StatCard({ stat }: { stat: Stat }) {
  const display = useCounter(stat.value, 1000);

  const formatted = useMemo(() => {
    const n = display.toLocaleString("en-IN");
    return `${stat.prefix ?? ""}${n}${stat.suffix ?? ""}`;
  }, [display, stat.prefix, stat.suffix]);

  return (
    <div className="group relative h-full rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-5 shadow-[0_4px_18px_-12px_rgba(20,33,28,0.18)] hover:shadow-[0_22px_50px_-22px_rgba(20,33,28,0.28)] hover:-translate-y-1 hover:scale-[1.01] hover:border-[var(--color-border)] transition-all duration-500 ease-out overflow-hidden">
      {/* very faint hover sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[var(--color-gold-soft)]/25 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500"
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 rounded-xl bg-[var(--color-forest)]/[0.07] text-[var(--color-forest)] flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            {stat.icon}
          </div>
          {stat.change && (
            <div
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                stat.change.trend === "up"
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
                className={`h-3 w-3 ${
                  stat.change.trend === "down" ? "rotate-180" : ""
                }`}
              >
                <path d="M7 17l5-5 5 5M7 7h10" />
              </svg>
              {stat.change.value}
            </div>
          )}
        </div>

        <div className="mt-5 font-display text-[2.4rem] leading-none tracking-tight text-[var(--color-forest)] tabular-nums">
          {formatted}
        </div>
        <div className="mt-2 text-sm font-medium text-[var(--color-ink)]">
          {stat.label}
        </div>
        <div className="text-xs text-[var(--color-muted)]">{stat.hint}</div>

        <div className="mt-4 -mx-1">
          <Sparkline data={stat.trendData} />
        </div>
      </div>
    </div>
  );
}

/* ----------------- Animated counter hook ----------------- */

function useCounter(target: number, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const initial = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(initial + (target - initial) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

/* ----------------- Sparkline ----------------- */

function Sparkline({ data }: { data: number[] }) {
  const w = 120;
  const h = 32;
  const padding = 2;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = (w - padding * 2) / (data.length - 1);
  const points = data.map((v, i) => {
    const x = padding + i * step;
    const y = padding + (h - padding * 2) - ((v - min) / range) * (h - padding * 2);
    return { x, y };
  });
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L${w - padding},${h} L${padding},${h} Z`;
  const lastPoint = points[points.length - 1];

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="w-full h-8"
      aria-hidden
    >
      <defs>
        <linearGradient id={`spark-gradient`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-forest)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--color-forest)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#spark-gradient)" />
      <path
        d={linePath}
        fill="none"
        stroke="var(--color-forest)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx={lastPoint.x}
        cy={lastPoint.y}
        r="2.2"
        fill="var(--color-forest)"
      />
      <circle
        cx={lastPoint.x}
        cy={lastPoint.y}
        r="5"
        fill="var(--color-forest)"
        opacity="0.18"
      />
    </svg>
  );
}

/* ---------- Icons ---------- */

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

function PhoneIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.79a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.29-1.29a2 2 0 012.11-.45c.89.35 1.83.59 2.79.72A2 2 0 0122 16.92z" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M21 11.5a8.5 8.5 0 11-3.4-6.8" />
      <path d="M21 4v4h-4" />
      <path d="M9 11h6M9 14h4" />
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
function UsersIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
function InboxIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.5 5h13l3.5 7v7a2 2 0 01-2 2h-16a2 2 0 01-2-2v-7l3.5-7z" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M3 3v18h18" />
      <path d="M7 15l4-4 3 3 5-6" />
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
function BellIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M12 22a2 2 0 002-2H10a2 2 0 002 2z" />
      <path d="M18 16V11a6 6 0 10-12 0v5l-2 2h16l-2-2z" />
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
function UserPlusIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="M20 8v6M17 11h6" />
    </svg>
  );
}
function PencilIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
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
