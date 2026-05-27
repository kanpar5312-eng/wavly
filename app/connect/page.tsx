"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { DashboardNav } from "../components/DashboardNav";
import { Tilt3D } from "../components/Tilt3D";

type ConnectedNumber = {
  id: string;
  label: string;
  number: string;
  connectedSince: string;
  lastSync: string;
};

const initialConnected: ConnectedNumber[] = [
  {
    id: "n-1",
    label: "Glow Salon · Main",
    number: "+91 98765 43210",
    connectedSince: "15 May 2026",
    lastSync: "4 min ago",
  },
  {
    id: "n-2",
    label: "Glow Salon · Booking",
    number: "+91 98765 43211",
    connectedSince: "22 May 2026",
    lastSync: "12 min ago",
  },
];

/* ---------- QR pattern generator ---------- */

function generateQrPattern(seed: number): boolean[][] {
  const size = 25;
  const grid: boolean[][] = Array.from({ length: size }, () =>
    Array(size).fill(false)
  );

  let s = seed;
  const random = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      grid[i][j] = random() > 0.56;
    }
  }

  // Position markers (the three big corner squares)
  function placeMarker(row: number, col: number) {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        const r = row + i;
        const c = col + j;
        if (r >= size || c >= size) continue;
        const isOuter = i === 0 || i === 6 || j === 0 || j === 6;
        const isInner = i >= 2 && i <= 4 && j >= 2 && j <= 4;
        grid[r][c] = isOuter || isInner;
        // ring is empty
        if (
          (i === 1 || i === 5) &&
          j >= 1 &&
          j <= 5
        ) {
          grid[r][c] = false;
        }
        if (
          (j === 1 || j === 5) &&
          i >= 1 &&
          i <= 5
        ) {
          grid[r][c] = false;
        }
      }
    }
    // Quiet zone around marker (1px)
    for (let k = -1; k <= 7; k++) {
      const r1 = row + k;
      const r2 = row + 7;
      const c1 = col + k;
      const c2 = col + 7;
      if (r1 >= 0 && r1 < size && col + 7 < size) grid[r1][col + 7] = false;
      if (r2 >= 0 && r2 < size && col + k >= 0 && col + k < size)
        grid[r2][col + k] = false;
      if (c1 >= 0 && c1 < size && row + 7 < size) grid[row + 7][c1] = false;
      if (c2 >= 0 && c2 < size && row + k >= 0 && row + k < size)
        grid[row + k][c2] = false;
    }
  }

  placeMarker(0, 0);
  placeMarker(0, size - 7);
  placeMarker(size - 7, 0);

  // Carve out center for logo
  for (let i = 9; i < 16; i++) {
    for (let j = 9; j < 16; j++) {
      grid[i][j] = false;
    }
  }

  return grid;
}

/* ---------- Page ---------- */

export default function ConnectPage() {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [connected, setConnected] = useState<ConnectedNumber[]>(initialConnected);
  const [qrSeed, setQrSeed] = useState(42);
  const [qrFade, setQrFade] = useState(false);
  const [qrFresh, setQrFresh] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [disconnectingId, setDisconnectingId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("wavly.userName");
    if (stored) setUserName(stored);
  }, []);

  const pattern = useMemo(() => generateQrPattern(qrSeed), [qrSeed]);

  function regenerateQr() {
    setQrFade(true);
    setQrFresh(false);
    setTimeout(() => {
      setQrSeed((s) => s + 1 + Math.floor(Math.random() * 999));
      setQrFade(false);
      setQrFresh(true);
      showToast("New QR code generated · valid for 60 seconds");
    }, 280);
  }

  function disconnect(id: string) {
    setDisconnectingId(id);
    setTimeout(() => {
      const num = connected.find((n) => n.id === id);
      setConnected((prev) => prev.filter((n) => n.id !== id));
      setDisconnectingId(null);
      showToast(`${num?.label || "Number"} disconnected`);
    }, 700);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }

  const isConnected = connected.length > 0;

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
            <span className="text-[var(--color-ink-soft)]">Connect WhatsApp</span>
          </nav>

          {/* Header */}
          <section className="mt-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                Step 1 of your Wavly setup
              </div>
              <h1 className="mt-2 text-3xl sm:text-4xl tracking-tight text-[var(--color-ink)]">
                Connect your{" "}
                <span className="font-display italic text-[var(--color-forest)]">
                  WhatsApp number
                </span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-[var(--color-ink-soft)] leading-relaxed">
                Scan the QR code with your WhatsApp Business app to securely
                link your number. Wavly only accesses your business chats —
                never your personal WhatsApp.
              </p>
            </div>

            <ConnectionPill isConnected={isConnected} count={connected.length} />
          </section>

          {/* Main 2-col layout */}
          <section className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-6">
            {/* QR card */}
            <Tilt3D max={3} perspective={1600}>
              <div className="relative h-full rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-8 sm:p-10 overflow-hidden shadow-[0_10px_40px_-20px_rgba(20,33,28,0.18)]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[var(--color-gold-soft)]/25 blur-3xl"
                />

                <div className="relative flex flex-col items-center text-center">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
                    Scan to connect
                  </div>
                  <h2 className="mt-2 text-xl tracking-tight text-[var(--color-ink)]">
                    Point your phone here
                  </h2>

                  {/* QR holder */}
                  <div
                    style={{ transform: "translateZ(30px)" }}
                    className="relative mt-7"
                  >
                    {/* outer glow ring */}
                    <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[var(--color-gold-soft)]/30 to-[var(--color-forest-soft)]/20 blur-2xl" />

                    {/* card */}
                    <div className="relative rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-[0_30px_70px_-30px_rgba(20,33,28,0.4)]">
                      {/* Pulsing corner brackets */}
                      <Corner pos="tl" />
                      <Corner pos="tr" />
                      <Corner pos="bl" />
                      <Corner pos="br" />

                      <div
                        className={`relative transition-all duration-500 ease-out ${
                          qrFade
                            ? "opacity-0 scale-95"
                            : "opacity-100 scale-100"
                        } ${qrFresh ? "animate-fade-up" : ""}`}
                        key={qrSeed}
                      >
                        <QrCodeSvg pattern={pattern} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-14 w-14 rounded-2xl bg-[var(--color-forest)] border-[3px] border-white flex items-center justify-center shadow-[0_8px_18px_-8px_rgba(20,58,47,0.6)]">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              className="h-7 w-7 text-[var(--color-cream-soft)]"
                              aria-hidden
                            >
                              <path
                                d="M3 13c2-3 4-3 6 0s4 3 6 0 4-3 6 0"
                                stroke="currentColor"
                                strokeWidth="2.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status text */}
                  <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--color-forest)]/[0.06] px-3.5 py-1.5 text-xs text-[var(--color-forest)] font-medium">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-forest)] opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-forest)]" />
                    </span>
                    Waiting for scan · QR refreshes in 60s
                  </div>

                  <button
                    onClick={regenerateQr}
                    className="btn-press mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--color-forest)] px-6 py-3 text-sm font-medium text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 shadow-[0_8px_22px_-6px_rgba(20,58,47,0.5)] transition-all"
                  >
                    <RefreshIcon />
                    Generate new QR code
                  </button>

                  <p className="mt-5 text-[11px] text-[var(--color-muted)] max-w-sm">
                    QR code expires after 60 seconds for security. We never
                    store the scanned session locally — it&apos;s passed
                    directly to Meta&apos;s WhatsApp Business API.
                  </p>
                </div>
              </div>
            </Tilt3D>

            {/* Instructions + Safety */}
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-7">
                <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
                  Setup · 30 seconds
                </div>
                <h3 className="mt-2 text-lg font-medium text-[var(--color-ink)]">
                  How to scan
                </h3>

                <ol className="mt-6 space-y-4">
                  <Step
                    n={1}
                    title="Open WhatsApp Business on your phone"
                    detail="Use the number you want to connect to Wavly."
                  />
                  <Step
                    n={2}
                    title="Go to Settings → Linked Devices"
                    detail="On iPhone: Settings. On Android: tap the three dots."
                  />
                  <Step
                    n={3}
                    title='Tap "Link a Device"'
                    detail="Your phone camera will open to scan a QR code."
                  />
                  <Step
                    n={4}
                    title="Point your phone at the QR code on this page"
                    detail="Hold steady for a second — it'll auto-detect."
                  />
                  <Step
                    n={5}
                    title="Done — you're connected"
                    detail="Wavly will sync your business chats in real time."
                    last
                  />
                </ol>
              </div>

              <div className="rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-7">
                <div className="flex items-center gap-2">
                  <ShieldIcon />
                  <h3 className="text-lg font-medium text-[var(--color-ink)]">
                    Safe and private
                  </h3>
                </div>
                <ul className="mt-5 space-y-3 text-sm">
                  <SafetyItem>
                    Your customer chats are <strong>end-to-end encrypted</strong>{" "}
                    in transit and at rest (AES-256).
                  </SafetyItem>
                  <SafetyItem>
                    Wavly never accesses your <strong>personal WhatsApp</strong>{" "}
                    — only the business number you connect.
                  </SafetyItem>
                  <SafetyItem>
                    Connection runs through <strong>Meta&apos;s official
                    WhatsApp Business API</strong> — the same infrastructure
                    used by enterprise brands.
                  </SafetyItem>
                  <SafetyItem>
                    <strong>Disconnect anytime</strong> from this page. We
                    delete related data within 30 days of disconnection.
                  </SafetyItem>
                </ul>
              </div>
            </div>
          </section>

          {/* Connected Numbers */}
          <section className="mt-14">
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                  Connected numbers
                </div>
                <h2 className="mt-2 text-2xl tracking-tight text-[var(--color-ink)]">
                  Your linked WhatsApp lines
                </h2>
              </div>
              <span className="text-sm text-[var(--color-muted)]">
                {connected.length} of 5 used
              </span>
            </div>

            {connected.length === 0 ? (
              <div className="mt-6 rounded-3xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-cream-soft)]/50 p-12 text-center">
                <div className="mx-auto inline-flex h-12 w-12 rounded-2xl bg-[var(--color-forest)]/[0.07] text-[var(--color-forest)] items-center justify-center">
                  <PhoneIcon />
                </div>
                <h3 className="mt-5 text-lg font-medium text-[var(--color-ink)]">
                  No numbers connected yet
                </h3>
                <p className="mt-1.5 text-sm text-[var(--color-muted)]">
                  Scan the QR code above to connect your first WhatsApp number.
                </p>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] overflow-hidden">
                <ul className="divide-y divide-[var(--color-border-soft)]">
                  {connected.map((n) => (
                    <li
                      key={n.id}
                      className={`group flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4 hover:bg-[var(--color-surface)] transition-all ${
                        disconnectingId === n.id
                          ? "opacity-50 -translate-x-2"
                          : ""
                      } animate-fade-up`}
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="h-11 w-11 shrink-0 rounded-xl bg-[#25d366]/10 text-[#25d366] flex items-center justify-center">
                          <WhatsAppIcon />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[var(--color-ink)] truncate">
                              {n.label}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-forest)]/[0.08] px-2 py-0.5 text-[10px] font-medium text-[var(--color-forest)]">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-forest)] opacity-70" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-forest)]" />
                              </span>
                              Connected
                            </span>
                          </div>
                          <div className="text-xs text-[var(--color-muted)] mt-0.5 truncate">
                            {n.number} · since {n.connectedSince} · last sync {n.lastSync}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => disconnect(n.id)}
                        disabled={disconnectingId === n.id}
                        className="btn-press self-start sm:self-auto inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-4 py-1.5 text-xs font-medium text-[var(--color-ink-soft)] hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <UnlinkIcon />
                        Disconnect
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Footer note */}
          <p className="mt-10 text-center text-xs text-[var(--color-muted)]">
            Need help connecting?{" "}
            <a
              href="mailto:support@wavly.in"
              className="font-medium text-[var(--color-forest)] hover:underline underline-offset-2"
            >
              support@wavly.in
            </a>{" "}
            — we&apos;ll walk you through it.
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

/* ---------- Sub-components ---------- */

function QrCodeSvg({ pattern }: { pattern: boolean[][] }) {
  const size = pattern.length;
  const cellSize = 10;
  const totalSize = size * cellSize;
  return (
    <svg
      viewBox={`0 0 ${totalSize} ${totalSize}`}
      className="w-56 h-56 sm:w-64 sm:h-64"
      aria-label="WhatsApp connection QR code"
    >
      {pattern.flatMap((row, i) =>
        row.map((cell, j) =>
          cell ? (
            <rect
              key={`${i}-${j}`}
              x={j * cellSize}
              y={i * cellSize}
              width={cellSize}
              height={cellSize}
              rx={2}
              ry={2}
              fill="var(--color-forest-deep)"
            />
          ) : null
        )
      )}
    </svg>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const positions: Record<typeof pos, string> = {
    tl: "top-2 left-2 border-t-2 border-l-2 rounded-tl-xl",
    tr: "top-2 right-2 border-t-2 border-r-2 rounded-tr-xl",
    bl: "bottom-2 left-2 border-b-2 border-l-2 rounded-bl-xl",
    br: "bottom-2 right-2 border-b-2 border-r-2 rounded-br-xl",
  };
  return (
    <div
      className={`absolute h-5 w-5 ${positions[pos]} border-[var(--color-forest)]/40 animate-soft-pulse`}
    />
  );
}

function ConnectionPill({
  isConnected,
  count,
}: {
  isConnected: boolean;
  count: number;
}) {
  return (
    <div
      className={`shrink-0 self-start inline-flex items-center gap-2.5 rounded-2xl border px-4 py-2.5 ${
        isConnected
          ? "border-[var(--color-forest)]/30 bg-[var(--color-forest)]/[0.04]"
          : "border-[var(--color-border)] bg-[var(--color-cream-soft)]"
      }`}
    >
      <div
        className={`h-9 w-9 rounded-xl flex items-center justify-center ${
          isConnected
            ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)]"
            : "bg-[var(--color-cream-deep)]/60 text-[var(--color-muted)]"
        }`}
      >
        {isConnected ? <CheckShield /> : <PhoneIcon />}
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-muted)] font-medium">
          Status
        </div>
        <div
          className={`text-sm font-medium ${
            isConnected ? "text-[var(--color-forest)]" : "text-[var(--color-ink-soft)]"
          }`}
        >
          {isConnected
            ? `${count} number${count > 1 ? "s" : ""} connected`
            : "No numbers connected"}
        </div>
      </div>
    </div>
  );
}

function Step({
  n,
  title,
  detail,
  last,
}: {
  n: number;
  title: string;
  detail: string;
  last?: boolean;
}) {
  return (
    <li className="relative flex gap-4">
      {!last && (
        <span
          aria-hidden
          className="absolute left-[18px] top-9 h-[calc(100%-1rem)] w-px bg-[var(--color-border)]"
        />
      )}
      <div className="relative h-9 w-9 shrink-0 rounded-full bg-[var(--color-forest)]/[0.08] border border-[var(--color-forest)]/20 text-[var(--color-forest)] flex items-center justify-center text-[13px] font-medium">
        {n}
      </div>
      <div className="pt-1">
        <div className="text-sm font-medium text-[var(--color-ink)]">{title}</div>
        <div className="mt-0.5 text-xs text-[var(--color-muted)] leading-relaxed">
          {detail}
        </div>
      </div>
    </li>
  );
}

function SafetyItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-[var(--color-ink-soft)]">
      <span className="mt-1 text-[var(--color-forest)]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5"
        >
          <path d="M5 12l4 4 10-10" />
        </svg>
      </span>
      <span className="text-sm leading-relaxed">{children}</span>
    </li>
  );
}

/* ---------- Icons ---------- */

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

function RefreshIcon() {
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
      <path d="M21 12a9 9 0 11-3.4-7L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-[var(--color-forest)]"
    >
      <path d="M12 3l8 4v6c0 5-3.5 7.5-8 8-4.5-.5-8-3-8-8V7l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.79a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.29-1.29a2 2 0 012.11-.45c.89.35 1.83.59 2.79.72A2 2 0 0122 16.92z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M17.6 14.4c-.3-.2-1.8-.9-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.6.1c-.3-.2-1.2-.5-2.3-1.4-.9-.7-1.4-1.7-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.5 3.1 1.2 3.1.8 3.7.8.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4zM12 2a10 10 0 00-8.6 15l-1.4 5 5.2-1.4A10 10 0 1012 2z" />
    </svg>
  );
}

function CheckShield() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M12 3l8 4v6c0 5-3.5 7.5-8 8-4.5-.5-8-3-8-8V7l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function UnlinkIcon() {
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
      <path d="M18.84 12.25l1.72-1.71h-.01a5.004 5.004 0 00-.12-7.07 5.006 5.006 0 00-6.95 0L11.5 5.34M3 21l3-3" />
      <path d="M9 11L7 13a3 3 0 104.24 4.24L13 15" />
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
