// Next.js App Router: `template.tsx` re-mounts on every route change,
// so the entrance animation re-fires when navigating between pages.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
