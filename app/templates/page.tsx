"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { DashboardNav } from "../components/DashboardNav";

type Category = "Greetings" | "Booking" | "Payments" | "Reminders" | "Promotions" | "Support";

const CATEGORIES: Category[] = ["Greetings", "Booking", "Payments", "Reminders", "Promotions", "Support"];

type Template = {
  id: string;
  name: string;
  category: Category;
  body: string;
  uses: number;
};

const initialTemplates: Template[] = [
  { id: "t1", name: "Warm welcome", category: "Greetings", body: "Hi {{name}} 🌿 Thanks for reaching out to {{business}}! How can I help you today?", uses: 128 },
  { id: "t2", name: "Booking confirmation", category: "Booking", body: "All set, {{name}}! Your appointment is confirmed for {{time}}. We'll send a reminder an hour before 🌿", uses: 96 },
  { id: "t3", name: "Price list", category: "Promotions", body: "Here's our menu, {{name}}:\n• Facial · ₹1,200\n• Hair colour · ₹2,500\n• Spa · ₹1,800\nReply BOOK to grab a slot!", uses: 74 },
  { id: "t4", name: "Payment reminder", category: "Payments", body: "Hi {{name}}, a gentle reminder that ₹{{amount}} is pending for your last visit. You can pay via the UPI link here: {{link}} 🙏", uses: 41 },
  { id: "t5", name: "Appointment reminder", category: "Reminders", body: "Hi {{name}} 🌿 Reminder: your {{service}} is tomorrow at {{time}}. Reply YES to confirm or CHANGE to reschedule.", uses: 210 },
  { id: "t6", name: "After-hours reply", category: "Support", body: "Thanks for messaging {{business}}! We're closed right now but I'll get back to you first thing tomorrow morning ☀️", uses: 58 },
];

const VARS = ["{{name}}", "{{business}}", "{{time}}", "{{service}}", "{{amount}}", "{{link}}"];

const CAT_STYLE: Record<Category, string> = {
  Greetings: "bg-[var(--color-forest)]/[0.08] text-[var(--color-forest)]",
  Booking: "bg-[var(--color-tg)]/10 text-[var(--color-tg-deep)]",
  Payments: "bg-[var(--color-gold)]/15 text-[var(--color-gold)]",
  Reminders: "bg-[#e7f0ea] text-[var(--color-forest)]",
  Promotions: "bg-[#efe3d1] text-[#8a6c2c]",
  Support: "bg-[var(--color-cream-deep)]/60 text-[var(--color-ink-soft)]",
};

export default function TemplatesPage() {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("Greetings");
  const [body, setBody] = useState("");
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

  function openNew() {
    setEditId(null);
    setName("");
    setCategory("Greetings");
    setBody("");
    setEditorOpen(true);
  }

  function openEdit(t: Template) {
    setEditId(t.id);
    setName(t.name);
    setCategory(t.category);
    setBody(t.body);
    setEditorOpen(true);
  }

  function save() {
    if (!name.trim() || !body.trim()) return;
    if (editId) {
      setTemplates((prev) => prev.map((t) => (t.id === editId ? { ...t, name: name.trim(), category, body: body.trim() } : t)));
      showToast("Template updated");
    } else {
      setTemplates((prev) => [
        { id: `t-${Date.now()}`, name: name.trim(), category, body: body.trim(), uses: 0 },
        ...prev,
      ]);
      showToast("Template created");
    }
    setEditorOpen(false);
  }

  function remove(id: string) {
    const t = templates.find((x) => x.id === id);
    if (typeof window !== "undefined" && window.confirm(`Delete "${t?.name}"?`)) {
      setTemplates((prev) => prev.filter((x) => x.id !== id));
      showToast("Template deleted");
    }
  }

  function copy(t: Template) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(t.body).catch(() => {});
    }
    setTemplates((prev) => prev.map((x) => (x.id === t.id ? { ...x, uses: x.uses + 1 } : x)));
    showToast("Copied to clipboard");
  }

  function insertVar(v: string) {
    setBody((b) => b + v);
  }

  const filtered = useMemo(
    () => (filter === "All" ? templates : templates.filter((t) => t.category === filter)),
    [templates, filter]
  );

  return (
    <div className="flex-1 flex flex-col">
      <DashboardNav userName={userName} />

      <main className="relative flex-1 px-6 lg:px-10 py-10 lg:py-14">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-[var(--color-gold-soft)]/15 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl">
          <nav className="text-xs text-[var(--color-muted)] flex items-center gap-2">
            <Link href="/dashboard" className="hover:text-[var(--color-forest)]">Dashboard</Link>
            <Chevron />
            <Link href="/automations" className="hover:text-[var(--color-forest)]">Automations</Link>
            <Chevron />
            <span className="text-[var(--color-ink-soft)]">Templates</span>
          </nav>

          <section className="mt-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                Message library
              </div>
              <h1 className="mt-2 text-3xl sm:text-4xl tracking-tight text-[var(--color-ink)]">
                <span className="font-display italic text-[var(--color-forest)]">Templates</span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-[var(--color-ink-soft)] leading-relaxed">
                Save your best replies once, reuse them everywhere — in automations, the inbox, and broadcasts.
              </p>
            </div>
            <button
              onClick={openNew}
              className="btn-press self-start inline-flex items-center gap-2 rounded-full bg-[var(--color-forest)] px-5 py-2.5 text-sm font-medium text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 shadow-[0_8px_22px_-6px_rgba(20,58,47,0.5)] transition-all"
            >
              <PlusIcon />
              New template
            </button>
          </section>

          {/* Editor */}
          {editorOpen && (
            <section className="mt-8 rounded-3xl border border-[var(--color-forest)]/25 bg-[var(--color-cream-soft)] p-6 sm:p-8 animate-fade-up ring-4 ring-[var(--color-forest)]/[0.06]">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-[var(--color-ink)]">
                  {editId ? "Edit template" : "New template"}
                </h2>
                <button onClick={() => setEditorOpen(false)} className="text-[var(--color-muted)] hover:text-[var(--color-forest)]" aria-label="Close">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M6 6l12 12M6 18L18 6" /></svg>
                </button>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium tracking-wide text-[var(--color-ink-soft)]">Template name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Warm welcome"
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/70 outline-none focus:border-[var(--color-forest)] focus:ring-4 focus:ring-[var(--color-forest)]/10 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium tracking-wide text-[var(--color-ink-soft)]">Category</label>
                  <div className="flex flex-wrap gap-1.5">
                    {CATEGORIES.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCategory(c)}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                          category === c
                            ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)]"
                            : "bg-[var(--color-surface)] border border-[var(--color-border-soft)] text-[var(--color-ink-soft)] hover:border-[var(--color-forest)]/40"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="text-xs font-medium tracking-wide text-[var(--color-ink-soft)]">Message</label>
                <div className="mt-2 flex flex-wrap gap-1.5 mb-2">
                  {VARS.map((v) => (
                    <button
                      key={v}
                      onClick={() => insertVar(v)}
                      className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 font-mono text-[10px] text-[var(--color-muted)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] transition-colors"
                    >
                      {v}
                    </button>
                  ))}
                </div>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={4}
                  placeholder="Write your message… use {{name}} to personalize."
                  className="w-full resize-none rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm leading-relaxed text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/60 outline-none focus:border-[var(--color-forest)] focus:ring-4 focus:ring-[var(--color-forest)]/10 transition-all"
                />
              </div>

              <div className="mt-5 flex items-center justify-end gap-3">
                <button onClick={() => setEditorOpen(false)} className="btn-press rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-5 py-2.5 text-sm font-medium text-[var(--color-ink-soft)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] transition-colors">
                  Cancel
                </button>
                <button
                  onClick={save}
                  disabled={!name.trim() || !body.trim()}
                  className={`btn-press rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                    name.trim() && body.trim()
                      ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)]"
                      : "bg-[var(--color-forest)]/40 text-[var(--color-cream-soft)]/70 cursor-not-allowed"
                  }`}
                >
                  {editId ? "Save changes" : "Create template"}
                </button>
              </div>
            </section>
          )}

          {/* Filters */}
          <section className="mt-8 flex items-center gap-2 flex-wrap">
            {(["All", ...CATEGORIES] as const).map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  filter === c
                    ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)]"
                    : "bg-[var(--color-cream-soft)] border border-[var(--color-border-soft)] text-[var(--color-ink-soft)] hover:border-[var(--color-forest)]/40 hover:text-[var(--color-forest)]"
                }`}
              >
                {c}
              </button>
            ))}
          </section>

          {/* Grid */}
          <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.length === 0 ? (
              <div className="col-span-full rounded-3xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-cream-soft)]/50 p-12 text-center">
                <div className="text-sm font-medium text-[var(--color-ink)]">No templates here yet</div>
                <button onClick={openNew} className="mt-3 text-sm font-medium text-[var(--color-forest)] hover:underline underline-offset-2">
                  Create your first one →
                </button>
              </div>
            ) : (
              filtered.map((t) => (
                <div key={t.id} className="group flex flex-col rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-5 hover:-translate-y-1 hover:shadow-[0_22px_50px_-22px_rgba(20,33,28,0.22)] transition-all duration-500">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${CAT_STYLE[t.category]}`}>
                      {t.category}
                    </span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(t)} aria-label="Edit" className="h-7 w-7 inline-flex items-center justify-center rounded-full text-[var(--color-muted)] hover:bg-[var(--color-cream-deep)]/50 hover:text-[var(--color-forest)]">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                      </button>
                      <button onClick={() => remove(t.id)} aria-label="Delete" className="h-7 w-7 inline-flex items-center justify-center rounded-full text-[var(--color-muted)] hover:bg-red-50 hover:text-red-600">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" /></svg>
                      </button>
                    </div>
                  </div>

                  <h3 className="mt-3 text-base font-medium text-[var(--color-ink)]">{t.name}</h3>
                  <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed flex-1 whitespace-pre-line line-clamp-4">{t.body}</p>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-[var(--color-muted)]">Used {t.uses} times</span>
                    <button
                      onClick={() => copy(t)}
                      className="btn-press inline-flex items-center gap-1.5 rounded-full bg-[var(--color-forest)]/[0.06] text-[var(--color-forest)] hover:bg-[var(--color-forest)] hover:text-[var(--color-cream-soft)] px-3.5 py-1.5 text-xs font-medium transition-all border border-[var(--color-forest)]/15"
                    >
                      <CopyIcon />
                      Use
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-up">
          <div className="flex items-center gap-3 rounded-full bg-[var(--color-forest)] px-5 py-3 text-sm font-medium text-[var(--color-cream-soft)] shadow-[0_18px_40px_-15px_rgba(20,33,28,0.45)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 12l4 4 10-10" /></svg>
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

function Chevron() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="M9 18l6-6-6-6" /></svg>;
}
function PlusIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M12 5v14M5 12h14" /></svg>;
}
function CopyIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>;
}
