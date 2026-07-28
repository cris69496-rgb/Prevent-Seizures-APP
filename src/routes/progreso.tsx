import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, CheckCircle2, Circle, Lock } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/progreso")({
  head: () => ({
    meta: [
      { title: "Progreso — Tu aprendizaje" },
      { name: "description", content: "Revisa guías completadas, videos vistos y certificados." },
      { property: "og:title", content: "Progreso — Prevents Seizures" },
      { property: "og:description", content: "Rastrea tu aprendizaje sobre primeros auxilios." },
    ],
  }),
  component: Progreso,
});

const modules = [
  { title: "Fundamentos de convulsiones", done: true },
  { title: "Guía de emergencia SOS", done: true },
  { title: "Tipos de crisis epilépticas", done: true },
  { title: "Crisis no epilépticas", done: false },
  { title: "Cuidado post-episodio", done: false },
];

function Progreso() {
  const isAuthed = false; // mock: cambia a true para ver estado logueado
  const completed = modules.filter((m) => m.done).length;
  const pct = Math.round((completed / modules.length) * 100);

  if (!isAuthed) {
    return (
      <MobileShell>
        <div className="flex min-h-[75vh] flex-col items-center justify-center px-6 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-secondary text-brand">
            <Lock className="h-7 w-7" />
          </span>
          <h1 className="mt-4 text-xl font-extrabold text-foreground">
            Guarda tu progreso
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Inicia sesión para llevar registro de guías completadas, videos vistos y obtener tu
            certificado.
          </p>
          <Link
            to="/auth"
            className="mt-6 w-full max-w-xs rounded-full py-3 text-center text-sm font-semibold text-white shadow-[var(--shadow-soft)]"
            style={{ background: "var(--gradient-brand)" }}
          >
            Iniciar sesión
          </Link>
          <Link to="/emergencia" className="mt-4 text-sm font-medium text-brand">
            O ir directo a la guía SOS
          </Link>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      <header className="px-5 pb-4 pt-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">Progreso</p>
        <h1 className="mt-1 text-2xl font-extrabold text-foreground">Tu aprendizaje</h1>
      </header>

      <section className="px-5">
        <div
          className="rounded-2xl p-5 text-white shadow-[var(--shadow-soft)]"
          style={{ background: "var(--gradient-brand)" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/80">Módulos completados</p>
              <p className="mt-1 text-3xl font-extrabold">
                {completed}/{modules.length}
              </p>
            </div>
            <Award className="h-10 w-10" />
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-white" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </section>

      <ul className="mt-6 space-y-2 px-5">
        {modules.map((m, i) => (
          <li
            key={i}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
          >
            {m.done ? (
              <CheckCircle2 className="h-6 w-6 text-brand" />
            ) : (
              <Circle className="h-6 w-6 text-muted-foreground" />
            )}
            <p className={`text-sm ${m.done ? "text-foreground" : "text-muted-foreground"}`}>
              {m.title}
            </p>
          </li>
        ))}
      </ul>
    </MobileShell>
  );
}
