import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BookOpen, PlayCircle, TrendingUp, AlertCircle } from "lucide-react";
import type { ReactNode } from "react";
import logoAsset from "@/assets/logo.png.asset.json";

const tabs: { to: string; label: string; icon: typeof Home; highlight?: boolean }[] = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/biblioteca", label: "Aprender", icon: BookOpen },
  { to: "/emergencia", label: "SOS", icon: AlertCircle, highlight: true },
  { to: "/videos", label: "Videos", icon: PlayCircle },
  { to: "/progreso", label: "Progreso", icon: TrendingUp },
];

export function MobileShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <div className="min-h-screen bg-background">
      {/* Barra superior para tablet y computador */}
      <header className="sticky top-0 z-40 hidden border-b border-border bg-background/95 backdrop-blur md:block">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img src={logoAsset.url} alt="" className="h-10 w-10 shrink-0 rounded-xl object-cover" />
            <span className="truncate text-base font-bold text-brand-ink">Prevent Seizures S.A.S.</span>
          </Link>
          <nav aria-label="Navegación principal" className="flex items-center gap-1">
            {tabs.map((t) => {
              const Icon = t.icon;
              if (t.highlight) {
                return (
                  <Link
                    key={t.to}
                    to={t.to}
                    className="ml-2 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)]"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    <Icon className="h-4 w-4" />
                    {t.label}
                  </Link>
                );
              }
              return (
                <Link
                  key={t.to}
                  to={t.to}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(t.to) ? "bg-secondary text-brand" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col pb-24 md:min-h-0 md:max-w-3xl md:pb-12 lg:max-w-5xl">
        <main className="flex-1 md:px-2">{children}</main>
      </div>

      {/* Barra inferior solo en celular */}
      <nav
        aria-label="Navegación principal"
        className="fixed inset-x-0 bottom-0 z-40 mx-auto flex w-full max-w-md items-end justify-between border-t border-border bg-background/95 px-2 pb-3 pt-2 backdrop-blur md:hidden"
      >
        {tabs.map((t) => {
          const active = isActive(t.to);
          const Icon = t.icon;
          if (t.highlight) {
            return (
              <Link key={t.to} to={t.to} aria-label={t.label} className="-mt-6 flex flex-col items-center gap-1">
                <span
                  className="grid h-14 w-14 place-items-center rounded-full text-primary-foreground shadow-[var(--shadow-soft)]"
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
