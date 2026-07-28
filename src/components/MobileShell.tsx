import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BookOpen, PlayCircle, TrendingUp, AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

const tabs: { to: string; label: string; icon: typeof Home; highlight?: boolean }[] = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/biblioteca", label: "Aprender", icon: BookOpen },
  { to: "/emergencia", label: "SOS", icon: AlertCircle, highlight: true },
  { to: "/videos", label: "Videos", icon: PlayCircle },
  { to: "/progreso", label: "Progreso", icon: TrendingUp },
];


export function MobileShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background pb-24">
      <main className="flex-1">{children}</main>
      <nav
        aria-label="Navegación principal"
        className="fixed inset-x-0 bottom-0 z-40 mx-auto flex w-full max-w-md items-end justify-between border-t border-border bg-background/95 px-2 pb-3 pt-2 backdrop-blur"
      >
        {tabs.map((t) => {
          const active = t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
          const Icon = t.icon;
          if (t.highlight) {
            return (
              <Link
                key={t.to}
                to={t.to}
                aria-label={t.label}
                className="-mt-6 flex flex-col items-center gap-1"
              >
                <span
                  className="grid h-14 w-14 place-items-center rounded-full text-white shadow-[var(--shadow-soft)]"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-[10px] font-semibold text-brand-ink">{t.label}</span>
              </Link>
            );
          }
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-[11px] font-medium transition-colors ${
                active ? "text-brand" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "text-brand" : ""}`} />
              {t.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
