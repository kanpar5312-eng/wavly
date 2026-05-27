"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { DashboardNav } from "../components/DashboardNav";
import { Reveal } from "../components/Reveal";
import { Tilt3D } from "../components/Tilt3D";

/* ----------------- Mock data ----------------- */

// 30 days of message volume (oldest → newest)
const messageVolume: number[] = [
  120, 145, 132, 168, 180, 240, 260, 175, 162, 188, 195, 220, 280, 310,
  225, 210, 235, 260, 285, 320, 360, 270, 290, 310, 340, 375, 420, 305, 340, 380,
];

// 7-day sparkline data per KPI
const kpis = [
  {
    label: "Total messages",
    value: 5184,
    change: "+12.2%",
    trend: "up" as const,
    spark: [820, 940, 880, 1020, 990, 1110, 1248],
    hint: "vs. previous 7 days",
    icon: <ChatIcon />,
  },
  {
    label: "Response rate",
    value: 94,
    suffix: "%",
    change: "+2.1%",
    trend: "up" as const,
    spark: [86, 88, 89, 91, 90, 92, 94],
    hint: "Replied within 5 min",
    icon: <BoltIcon />,
  },
  {
    label: "Bookings completed",
    value: 84,
    change: "+18%",
    trend: "up" as const,
    spark: [9, 12, 10, 14, 15, 13, 11],
    hint: "Last 7 days",
    icon: <CalendarIcon />,
  },
  {
    label: "Time saved",
    value: 22,
    suffix: " hrs",
    change: "+3.2 hrs",
    trend: "up" as const,
    spark: [2.4, 3.1, 2.8, 3.5, 3.2, 3.6, 3.4],
    hint: "Last 7 days · est.",
    icon: <ClockIcon />,
  },
];

const engagement = [
  { label: "Active", value: 187, color: "var(--color-forest)" },
  { label: "Returning", value: 91, color: "var(--color-forest-soft)" },
  { label: "New", value: 41, color: "var(--color-gold)" },
  { label: "Dormant", value: 23, color: "var(--color-cream-deep)" },
];

const topAutomations = [
  {
    name: "Saturday booking reminder",
    uses: 38,
    rate: "91% confirmed",
    trend: 12,
    icon: <BellIcon />,
  },
  {
    name: "Welcome message",
    uses: 32,
    rate: "First-message coverage",
    trend: 8,
    icon: <SparkleIcon />,
  },
  {
    name: "Pricing auto-reply",
    uses: 24,
    rate: "Avg reply 0.4s",
    trend: 4,
    icon: <BoltIcon />,
  },
  {
    name: "Payment reminder",
    uses: 18,
    rate: "78% paid within 48h",
    trend: 2,
    icon: <RupeeIcon />,
  },
  {
    name: "After-hours reply",
    uses: 16,
    rate: "Covers 7–8 PM gap",
    trend: -1,
    icon: <MoonIcon />,
  },
];

const insights = [
  {
    title: "Your Saturday booking reminder is your MVP",
    detail:
      "It prevented an estimated 6 no-shows this week, saving you ~₹7,200 in lost bookings.",
    icon: <ShieldIcon />,
    tone: "forest" as const,
  },
  {
    title: "Pricing replies misfire 6% of the time",
    detail:
      'Customers asking "what are your hours?" sometimes trigger the pricing reply. Wavly AI can rewrite this for you.',
    icon: <AlertIcon />,
    tone: "gold" as const,
  },
  {
    title: "Best day to send marketing is Thursday at 11 AM",
    detail:
      "Open rates from your customers peak between 10 AM – 12 PM on Thursdays, based on last 8 weeks of data.",
    icon: <SparkleIcon />,
    tone: "forest" as const,
  },
];

// 12 weeks × 7 days activity matrix (deterministic-ish)
function buildHeatmap() {
  const weeks = 12;
  const days = 7;
  const grid: number[][] = [];
  let s = 17;
  const random = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let w = 0; w < weeks; w++) {
    const row: number[] = [];
    for (let d = 0; d < days; d++) {
      // Weekend bonus
      const weekend = d >= 5 ? 0.2 : 0;
      // Trend up
      const trend = (w / weeks) * 0.4;
      const value = Math.min(4, Math.floor((random() + weekend + trend) * 4));
      row.push(value);
    }
    grid.push(row);
  }
  return grid;
}
const heatmap = buildHeatmap();

/* ----------------- Page ----------------- */

type Range = "7d" | "30d" | "90d";

export default function AnalyticsPage() {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [range, setRange] = useState<Range>("30d");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("wavly.userName");
    if (stored) setUserName(stored);
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <DashboardNav userName={userName} />

      <main className="relative flex-1 px-6 lg:px-10 py-10 lg:py-14">
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
            <span className="text-[var(--color-ink-soft)]">Analytics</span>
          </nav>

          {/* Header */}
          <section className="mt-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <Reveal>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                  Performance · last {range === "7d" ? "7 days" : range === "30d" ? "30 days" : "90 days"}
                </div>
                <h1 className="mt-2 text-3xl sm:text-4xl tracking-tight text-[var(--color-ink)]">
                  <span className="font-display italic text-[var(--color-forest)]">
                    Analytics
                  </span>
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-[var(--color-ink-soft)]">
                  See what&apos;s working, what isn&apos;t, and how much
                  Wavly is actually saving you.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="flex items-center gap-2">
                <RangePicker range={range} setRange={setRange} />
                <button className="btn-press inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-ink-soft)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] transition-colors">
                  <DownloadIcon />
                  Export
                </button>
              </div>
            </Reveal>
          </section>

          {/* KPI cards */}
          <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((k, i) => (
              <Reveal key={k.label} delay={120 + i * 90}>
                <Tilt3D max={5} perspective={1100}>
                  <KpiCard kpi={k} />
                </Tilt3D>
              </Reveal>
            ))}
          </section>

          {/* Main chart - Messages over time */}
          <section className="mt-12">
            <Reveal>
              <div className="rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-6 sm:p-8 shadow-[0_4px_24px_-16px_rgba(20,33,28,0.2)]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
                      Message volume
                    </div>
                    <h2 className="mt-1.5 text-xl tracking-tight text-[var(--color-ink)]">
                      Daily activity over the last 30 days
                    </h2>
                  </div>
                  <div className="inline-flex items-center gap-3 text-xs">
                    <LegendDot color="var(--color-forest)" label="Total messages" />
                    <LegendDot color="var(--color-gold)" label="AI handled" dashed />
                  </div>
                </div>
                <div className="mt-7">
                  <AreaChart data={messageVolume} />
                </div>
              </div>
            </Reveal>
          </section>

          {/* Two-column: Donut + Top Automations */}
          <section className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6">
            {/* Donut */}
            <Reveal>
              <div className="h-full rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-6 sm:p-8">
                <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
                  Customer engagement
                </div>
                <h2 className="mt-1.5 text-xl tracking-tight text-[var(--color-ink)]">
                  Who&apos;s talking to you
                </h2>

                <div className="mt-6 flex flex-col sm:flex-row items-center gap-6">
                  <DonutChart data={engagement} />

                  <ul className="flex-1 w-full space-y-2.5">
                    {engagement.map((e) => {
                      const total = engagement.reduce((s, x) => s + x.value, 0);
                      const pct = ((e.value / total) * 100).toFixed(0);
                      return (
                        <li
                          key={e.label}
                          className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 hover:bg-[var(--color-surface)] transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ background: e.color }}
                            />
                            <span className="text-sm text-[var(--color-ink)]">
                              {e.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-[var(--color-muted)]">
                              {pct}%
                            </span>
                            <span className="text-sm font-medium text-[var(--color-ink)] tabular-nums">
                              {e.value}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Top automations */}
            <Reveal delay={100}>
              <div className="h-full rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-6 sm:p-8">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
                      Top performing
                    </div>
                    <h2 className="mt-1.5 text-xl tracking-tight text-[var(--color-ink)]">
                      Your best automations
                    </h2>
                  </div>
                  <Link
                    href="/automations"
                    className="text-xs text-[var(--color-forest)] hover:text-[var(--color-forest-deep)] inline-flex items-center gap-1"
                  >
                    View all
                    <ArrowRight />
                  </Link>
                </div>

                <ul className="mt-6 space-y-3">
                  {topAutomations.map((a, i) => {
                    const max = topAutomations[0].uses;
                    const pct = (a.uses / max) * 100;
                    return (
                      <Reveal key={a.name} delay={i * 70}>
                        <li className="group">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-[var(--color-cream-deep)]/60 text-[var(--color-forest)] text-xs font-medium tabular-nums">
                              {i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-medium text-[var(--color-ink)] truncate">
                                  {a.name}
                                </span>
                                <span className="text-sm font-medium text-[var(--color-forest)] tabular-nums">
                                  {a.uses}
                                </span>
                              </div>
                              <div className="mt-1.5 flex items-center gap-3">
                                <div className="flex-1 h-1.5 rounded-full bg-[var(--color-border-soft)] overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-[var(--color-forest)] to-[var(--color-forest-soft)] rounded-full transition-all duration-700 ease-out"
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                                <span
                                  className={`text-[10px] font-medium tabular-nums inline-flex items-center gap-0.5 ${
                                    a.trend >= 0
                                      ? "text-[var(--color-forest)]"
                                      : "text-red-500"
                                  }`}
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={`h-2.5 w-2.5 ${
                                      a.trend < 0 ? "rotate-180" : ""
                                    }`}
                                  >
                                    <path d="M7 17l5-5 5 5M7 7h10" />
                                  </svg>
                                  {Math.abs(a.trend)}
                                </span>
                              </div>
                              <div className="mt-1 text-[11px] text-[var(--color-muted)] truncate">
                                {a.rate}
                              </div>
                            </div>
                          </div>
                        </li>
                      </Reveal>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </section>

          {/* Activity heatmap */}
          <section className="mt-12">
            <Reveal>
              <div className="rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
                      Activity
                    </div>
                    <h2 className="mt-1.5 text-xl tracking-tight text-[var(--color-ink)]">
                      When your customers reach out
                    </h2>
                    <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
                      Last 12 weeks · each square is one day
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-muted)]">
                    Less
                    {[0, 1, 2, 3, 4].map((l) => (
                      <span
                        key={l}
                        className="h-3 w-3 rounded-sm"
                        style={{
                          background:
                            l === 0
                              ? "var(--color-border-soft)"
                              : `color-mix(in srgb, var(--color-forest) ${l * 22}%, var(--color-cream-soft))`,
                        }}
                      />
                    ))}
                    More
                  </div>
                </div>

                <Heatmap grid={heatmap} />
              </div>
            </Reveal>
          </section>

          {/* Insights */}
          <section className="mt-12">
            <Reveal>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                    AI insights
                  </div>
                  <h2 className="mt-2 text-2xl tracking-tight text-[var(--color-ink)]">
                    What Wavly noticed{" "}
                    <span className="font-display italic text-[var(--color-forest)]">
                      this week
                    </span>
                  </h2>
                </div>
              </div>
            </Reveal>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {insights.map((i, idx) => (
                <Reveal key={i.title} delay={idx * 90}>
                  <InsightCard insight={i} />
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* ----------------- KPI Card with sparkline + counter ----------------- */

function KpiCard({
  kpi,
}: {
  kpi: typeof kpis[number];
}) {
  const display = useCounter(kpi.value, 1100);
  const formatted = useMemo(() => {
    let n: string;
    if (kpi.value >= 100) n = Math.round(display).toLocaleString("en-IN");
    else n = display.toFixed(0);
    return `${n}${kpi.suffix || ""}`;
  }, [display, kpi.suffix, kpi.value]);

  return (
    <div className="group relative h-full rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-5 shadow-[0_4px_18px_-12px_rgba(20,33,28,0.18)] hover:shadow-[0_22px_50px_-22px_rgba(20,33,28,0.28)] hover:border-[var(--color-border)] transition-all duration-500 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[var(--color-gold-soft)]/25 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500"
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div
            style={{ transform: "translateZ(20px)" }}
            className="h-10 w-10 rounded-xl bg-[var(--color-forest)]/[0.07] text-[var(--color-forest)] flex items-center justify-center"
          >
            {kpi.icon}
          </div>
          <div
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
              kpi.trend === "up"
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
              className={`h-3 w-3 ${kpi.trend !== "up" ? "rotate-180" : ""}`}
            >
              <path d="M7 17l5-5 5 5M7 7h10" />
            </svg>
            {kpi.change}
          </div>
        </div>

        <div className="mt-5 font-display text-[2.4rem] leading-none tracking-tight text-[var(--color-forest)] tabular-nums">
          {formatted}
        </div>
        <div className="mt-2 text-sm font-medium text-[var(--color-ink)]">
          {kpi.label}
        </div>
        <div className="text-xs text-[var(--color-muted)]">{kpi.hint}</div>

        <div className="mt-4 -mx-1">
          <Sparkline data={kpi.spark} />
        </div>
      </div>
    </div>
  );
}

/* ----------------- AreaChart ----------------- */

function AreaChart({ data }: { data: number[] }) {
  const [hover, setHover] = useState<number | null>(null);

  const w = 800;
  const h = 240;
  const padL = 40;
  const padR = 20;
  const padT = 20;
  const padB = 30;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;

  const max = Math.max(...data) * 1.1;
  const min = 0;
  const step = innerW / (data.length - 1);
  const points = data.map((v, i) => ({
    x: padL + i * step,
    y: padT + innerH - ((v - min) / (max - min)) * innerH,
    v,
    i,
  }));

  // Smooth bezier path
  const linePath = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x},${p.y}`;
    const prev = points[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} C ${cx},${prev.y} ${cx},${p.y} ${p.x},${p.y}`;
  }, "");

  const areaPath = `${linePath} L ${padL + innerW},${padT + innerH} L ${padL},${padT + innerH} Z`;

  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) =>
    Math.round((max / yTicks) * (yTicks - i))
  );

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full h-auto"
        onMouseLeave={() => setHover(null)}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-forest)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--color-forest)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y grid lines */}
        {ticks.map((t, i) => {
          const y = padT + (innerH / yTicks) * i;
          return (
            <g key={i}>
              <line
                x1={padL}
                x2={padL + innerW}
                y1={y}
                y2={y}
                stroke="var(--color-border)"
                strokeWidth="1"
                strokeDasharray="2 4"
                opacity="0.6"
              />
              <text
                x={padL - 8}
                y={y + 3}
                textAnchor="end"
                fontSize="10"
                fill="var(--color-muted)"
              >
                {t}
              </text>
            </g>
          );
        })}

        {/* Area */}
        <path d={areaPath} fill="url(#area-gradient)" className="animate-fade-up" />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="var(--color-forest)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Hover dots / tooltip lines */}
        {points.map((p, i) => (
          <g key={i}>
            <rect
              x={p.x - step / 2}
              y={padT}
              width={step}
              height={innerH}
              fill="transparent"
              onMouseEnter={() => setHover(i)}
              style={{ cursor: "crosshair" }}
            />
            {hover === i && (
              <>
                <line
                  x1={p.x}
                  x2={p.x}
                  y1={padT}
                  y2={padT + innerH}
                  stroke="var(--color-forest)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity="0.4"
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="9"
                  fill="var(--color-forest)"
                  opacity="0.15"
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="4.5"
                  fill="var(--color-forest)"
                  stroke="var(--color-cream-soft)"
                  strokeWidth="2"
                />
              </>
            )}
          </g>
        ))}

        {/* X labels every 5 */}
        {points.map((p, i) =>
          i % 5 === 0 ? (
            <text
              key={`x-${i}`}
              x={p.x}
              y={padT + innerH + 18}
              textAnchor="middle"
              fontSize="10"
              fill="var(--color-muted)"
            >
              D-{data.length - i}
            </text>
          ) : null
        )}
      </svg>

      {/* Tooltip */}
      {hover !== null && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full"
          style={{
            left: `${((points[hover].x / w) * 100).toFixed(2)}%`,
            top: `${((points[hover].y / h) * 100).toFixed(2)}%`,
          }}
        >
          <div className="-mt-2 rounded-xl bg-[var(--color-forest)] text-[var(--color-cream-soft)] px-3 py-2 shadow-[0_12px_24px_-12px_rgba(20,58,47,0.5)] whitespace-nowrap">
            <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-cream-soft)]/70">
              Day {hover + 1}
            </div>
            <div className="text-sm font-medium tabular-nums">
              {points[hover].v} messages
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------- DonutChart ----------------- */

function DonutChart({
  data,
}: {
  data: { label: string; value: number; color: string }[];
}) {
  const [hover, setHover] = useState<number | null>(null);
  const total = data.reduce((s, d) => s + d.value, 0);
  const size = 200;
  const r = 80;
  const cx = size / 2;
  const cy = size / 2;
  const stroke = 28;

  let cumulative = 0;
  const segments = data.map((d, i) => {
    const startAngle = (cumulative / total) * Math.PI * 2 - Math.PI / 2;
    cumulative += d.value;
    const endAngle = (cumulative / total) * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    return {
      ...d,
      i,
      path: `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
    };
  });

  const activeSegment = hover !== null ? segments[hover] : null;
  const centerLabel = activeSegment
    ? { value: activeSegment.value.toString(), label: activeSegment.label }
    : { value: total.toString(), label: "Total customers" };

  return (
    <div className="relative shrink-0">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-44 h-44 sm:w-48 sm:h-48">
        {segments.map((seg, i) => {
          const isActive = hover === i;
          return (
            <path
              key={seg.label}
              d={seg.path}
              fill="none"
              stroke={seg.color}
              strokeWidth={isActive ? stroke + 6 : stroke}
              strokeLinecap="butt"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="transition-all duration-300 cursor-pointer"
              style={{ filter: isActive ? "brightness(1.1)" : "none" }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-display text-3xl tracking-tight text-[var(--color-forest)] tabular-nums">
          {centerLabel.value}
        </div>
        <div className="mt-0.5 text-[11px] text-[var(--color-muted)] uppercase tracking-[0.14em] text-center px-2">
          {centerLabel.label}
        </div>
      </div>
    </div>
  );
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
    const y =
      padding + (h - padding * 2) - ((v - min) / range) * (h - padding * 2);
    return { x, y };
  });
  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");
  const areaPath = `${linePath} L${w - padding},${h} L${padding},${h} Z`;
  const last = points[points.length - 1];

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="w-full h-8"
    >
      <defs>
        <linearGradient id="spark-grad-an" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-forest)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--color-forest)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#spark-grad-an)" />
      <path
        d={linePath}
        fill="none"
        stroke="var(--color-forest)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={last.x} cy={last.y} r="2.2" fill="var(--color-forest)" />
      <circle cx={last.x} cy={last.y} r="5" fill="var(--color-forest)" opacity="0.18" />
    </svg>
  );
}

/* ----------------- Heatmap ----------------- */

function Heatmap({ grid }: { grid: number[][] }) {
  const [hover, setHover] = useState<{ w: number; d: number; v: number } | null>(null);
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="mt-6">
      <div className="flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-1 pr-2 text-[10px] text-[var(--color-muted)]">
          {dayLabels.map((d, i) => (
            <span key={i} className="h-4 leading-4">
              {i % 2 === 0 ? d : ""}
            </span>
          ))}
        </div>
        {grid.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((value, di) => (
              <button
                key={di}
                onMouseEnter={() => setHover({ w: wi, d: di, v: value })}
                onMouseLeave={() => setHover(null)}
                className="h-4 w-4 rounded-[3px] hover:ring-2 hover:ring-[var(--color-forest)]/30 transition-all animate-fade-up"
                style={{
                  background:
                    value === 0
                      ? "var(--color-border-soft)"
                      : `color-mix(in srgb, var(--color-forest) ${value * 22}%, var(--color-cream-soft))`,
                  animationDelay: `${(wi * 7 + di) * 6}ms`,
                }}
                aria-label={`Week ${wi + 1}, day ${di + 1}: ${value} activity`}
              />
            ))}
          </div>
        ))}
      </div>
      {hover && (
        <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--color-forest)] text-[var(--color-cream-soft)] px-3 py-1.5 text-xs">
          <span className="font-medium tabular-nums">{hover.v * 38} messages</span>
          <span className="text-[var(--color-cream-soft)]/60">
            · week {12 - hover.w}, {dayLabels[hover.d]}
          </span>
        </div>
      )}
    </div>
  );
}

/* ----------------- Insight card ----------------- */

function InsightCard({
  insight,
}: {
  insight: {
    title: string;
    detail: string;
    icon: React.ReactNode;
    tone: "forest" | "gold";
  };
}) {
  return (
    <div className="group relative h-full rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_50px_-22px_rgba(20,33,28,0.25)]">
      <div
        className={`h-10 w-10 rounded-xl flex items-center justify-center ${
          insight.tone === "gold"
            ? "bg-[var(--color-gold)]/15 text-[var(--color-gold)]"
            : "bg-[var(--color-forest)]/[0.08] text-[var(--color-forest)]"
        }`}
      >
        {insight.icon}
      </div>
      <h3 className="mt-4 text-base font-medium text-[var(--color-ink)] leading-snug">
        {insight.title}
      </h3>
      <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
        {insight.detail}
      </p>
    </div>
  );
}

/* ----------------- Helpers ----------------- */

function useCounter(target: number, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

function RangePicker({
  range,
  setRange,
}: {
  range: Range;
  setRange: (r: Range) => void;
}) {
  const options: { value: Range; label: string }[] = [
    { value: "7d", label: "7d" },
    { value: "30d", label: "30d" },
    { value: "90d", label: "90d" },
  ];
  return (
    <div className="inline-flex items-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => setRange(o.value)}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
            range === o.value
              ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)] shadow-[0_4px_12px_-4px_rgba(20,58,47,0.4)]"
              : "text-[var(--color-ink-soft)] hover:text-[var(--color-forest)]"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function LegendDot({
  color,
  label,
  dashed,
}: {
  color: string;
  label: string;
  dashed?: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-1.5 text-[var(--color-ink-soft)]">
      <span
        className={`h-0.5 w-4 rounded-full ${dashed ? "border-t-2 border-dashed" : ""}`}
        style={{
          background: dashed ? "transparent" : color,
          borderColor: color,
        }}
      />
      {label}
    </div>
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
function CalendarIcon() {
  return (
    <svg {...svgProps()}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
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
function BellIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M12 22a2 2 0 002-2H10a2 2 0 002 2z" />
      <path d="M18 16V11a6 6 0 10-12 0v5l-2 2h16l-2-2z" />
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
function ShieldIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M12 3l8 4v6c0 5-3.5 7.5-8 8-4.5-.5-8-3-8-8V7l8-4z" />
      <path d="M9 12l2 2 4-4" />
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
      className="h-3 w-3"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
function DownloadIcon() {
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
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}
