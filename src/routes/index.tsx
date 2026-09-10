import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, BookOpen, PlayCircle, ShieldCheck, Users } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import logoAsset from "@/assets/logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prevent Seizures S.A.S. — Ayuda ante una convulsión" },
      {
        name: "description",
        content:
          "Guía de emergencia, biblioteca educativa y videos para asistir con calma a alguien que sufre una convulsión.",
      },
      { property: "og:title", content: "Prevent Seizures S.A.S. — Ayuda ante una convulsión" },
      {
        property: "og:description",
        content: "Actúa con confianza en los primeros minutos. Aprende paso a paso.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <MobileShell>
      <section
        className="relative overflow-hidden rounded-b-[2rem] px-5 pb-8 pt-10"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="flex items-center gap-3">
          <img
            src={logoAsset.url}
            alt="Logo de Prevent Seizures S.A.S."
            className="h-20 w-20 rounded-2xl object-cover shadow-[var(--shadow-soft)]"
          />
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            Prevent Seizures S.A.S.
          </p>
        </div>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight text-foreground">
          Lee, Infórmate,
          <br />
          <span className="text-brand">Previene y Salva</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Una guía clara para acompañar a tus seres queridos durante una convulsión, sin miedo y con
          información confiable.
        </p>

        <Link
          to="/emergencia"
          className="mt-6 flex items-center justify-between rounded-2xl px-5 py-4 text-white shadow-[var(--shadow-soft)]"
          style={{ background: "var(--gradient-brand)" }}
        >
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white/20">
              <AlertCircle className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wider text-white/80">Emergencia</p>
              <p className="text-base font-bold">Abrir guía SOS</p>
            </div>
          </div>
          <span aria-hidden className="text-2xl">›</span>
        </Link>
      </section>

      <section className="px-5 pt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Explora
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <QuickCard
            to="/biblioteca"
            icon={BookOpen}
            title="Biblioteca"
            subtitle="Tipos de convulsiones"
          />
          <QuickCard
            to="/videos"
            icon={PlayCircle}
            title="Videos"
            subtitle="Demostraciones breves"
          />
          <QuickCard
            to="/progreso"
            icon={ShieldCheck}
            title="Progreso"
            subtitle="Tu aprendizaje"
          />
          <QuickCard to="/perfiles" icon={Users} title="Perfiles" subtitle="Ser queridos" />
        </div>
      </section>

      <section className="px-5 pt-8">
        <div className="rounded-2xl border border-border bg-secondary/60 p-5">
          <p className="text-sm font-semibold text-brand-ink">¿Sabías que…?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            La mayoría de las convulsiones ceden solas en menos de 2 minutos. Tu rol es proteger, no
            detenerlas.
          </p>
          <Link
            to="/biblioteca"
            className="mt-3 inline-block text-sm font-semibold text-brand underline-offset-4 hover:underline"
          >
            Aprender más →
          </Link>
        </div>
      </section>
    </MobileShell>
  );
}

function QuickCard({
  to,
  icon: Icon,
  title,
  subtitle,
}: {
  to: string;
  icon: typeof BookOpen;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      to={to}
      className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-[var(--shadow-soft)]"
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-brand">
        <Icon className="h-5 w-5" />
      </span>
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </Link>
  );
}
