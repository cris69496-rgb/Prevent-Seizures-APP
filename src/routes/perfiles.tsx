import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Plus, User } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/perfiles")({
  head: () => ({
    meta: [
      { title: "Perfiles — Seres queridos" },
      {
        name: "description",
        content: "Crea planes de acción personalizados para cada ser querido.",
      },
      { property: "og:title", content: "Perfiles — Prevent Seizures S.A.S." },
      { property: "og:description", content: "Planes de acción personalizados por persona." },
    ],
  }),
  component: Perfiles,
});

function Perfiles() {
  const isAuthed = false;

  if (!isAuthed) {
    return (
      <MobileShell>
        <div className="flex min-h-[75vh] flex-col items-center justify-center px-6 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-secondary text-brand">
            <Lock className="h-7 w-7" />
          </span>
          <h1 className="mt-4 text-xl font-extrabold text-foreground">Perfiles privados</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Inicia sesión para crear planes de acción específicos para cada ser querido.
          </p>
          <Link
            to="/auth"
            className="mt-6 w-full max-w-xs rounded-full py-3 text-center text-sm font-semibold text-white shadow-[var(--shadow-soft)]"
            style={{ background: "var(--gradient-brand)" }}
          >
            Iniciar sesión
          </Link>
        </div>
      </MobileShell>
    );
  }

  const perfiles = [
    { name: "Mamá", tipo: "Epilepsia focal", notas: "Medicación a las 8:00 y 20:00" },
    { name: "Lucas (hijo)", tipo: "Convulsiones febriles", notas: "Vigilar temperatura > 38.5°" },
  ];

  return (
    <MobileShell>
      <header className="flex items-center justify-between px-5 pb-4 pt-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">Perfiles</p>
          <h1 className="mt-1 text-2xl font-extrabold text-foreground">Seres queridos</h1>
        </div>
        <button
          aria-label="Agregar perfil"
          className="grid h-10 w-10 place-items-center rounded-full text-white"
          style={{ background: "var(--gradient-brand)" }}
        >
          <Plus className="h-5 w-5" />
        </button>
      </header>

      <ul className="space-y-3 px-5">
        {perfiles.map((p, i) => (
          <li key={i} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-brand">
                <User className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.tipo}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{p.notas}</p>
          </li>
        ))}
      </ul>
    </MobileShell>
  );
}
