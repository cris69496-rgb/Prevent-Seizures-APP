import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { markSosViewed } from "@/lib/achievements";

export const Route = createFileRoute("/emergencia")({
  head: () => ({
    meta: [
      { title: "Guía SOS — Primeros auxilios en convulsiones" },
      {
        name: "description",
        content:
          "Pasos claros para asistir a una persona durante una convulsión. Accesible sin registro.",
      },
      { property: "og:title", content: "Guía SOS — Primeros auxilios en convulsiones" },
      {
        property: "og:description",
        content: "Actúa con calma en los primeros minutos. Guía paso a paso.",
      },
    ],
  }),
  component: Emergencia,
});

const steps = [
  {
    title: "Mantén la calma",
    body: "Respira. La mayoría de las convulsiones ceden solas en menos de 2 minutos.",
    icon: "🧘",
  },
  {
    title: "Protege la cabeza",
    body: "Coloca algo suave (una chaqueta, almohada) bajo su cabeza. Retira objetos peligrosos.",
    icon: "🛡️",
  },
  {
    title: "Ponla de costado",
    body: "Cuando puedas, gira su cuerpo de lado para facilitar la respiración.",
    icon: "↩️",
  },
  {
    title: "Afloja la ropa",
    body: "Suelta cuellos, corbatas o cinturones que puedan dificultar respirar.",
    icon: "👕",
  },
  {
    title: "NO sujetes ni introduzcas nada en la boca",
    body: "No hay peligro de tragarse la lengua. Sujetarla puede causar lesiones.",
    icon: "🚫",
  },
  {
    title: "Cronometra la duración",
    body: "Si dura más de 5 minutos o se repite, llama a emergencias inmediatamente.",
    icon: "⏱️",
  },
  {
    title: "Acompaña hasta que se recupere",
    body: "Habla con voz suave. La persona puede estar confundida varios minutos.",
    icon: "🤝",
  },
];

function Emergencia() {
  useEffect(() => markSosViewed(), []);
  const [done, setDone] = useState<Set<number>>(new Set());
  const toggle = (i: number) => {
    setDone((prev) => {
      const n = new Set(prev);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-background pb-10">
      <header
        className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 text-white"
        style={{ background: "var(--gradient-brand)" }}
      >
        <Link to="/" aria-label="Volver" className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-white/80">Guía activa</p>
          <p className="text-sm font-bold">Primeros auxilios</p>
        </div>
        <a
          href="tel:911"
          aria-label="Llamar a emergencias"
          className="grid h-9 w-9 place-items-center rounded-full bg-white text-brand-ink shadow"
        >
          <Phone className="h-5 w-5" />
        </a>
      </header>

      <div className="px-5 pt-5">
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm">
          <p className="font-semibold text-destructive">Si la convulsión dura más de 5 minutos</p>
          <p className="text-muted-foreground">llama de inmediato al servicio de emergencias.</p>
        </div>

        <h1 className="mt-6 text-2xl font-extrabold text-foreground">Sigue estos pasos</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Toca cada tarjeta cuando lo hayas hecho para no perderte.
        </p>

        <ol className="mt-5 space-y-3">
          {steps.map((s, i) => {
            const checked = done.has(i);
            return (
              <li key={i}>
                <button
                  onClick={() => toggle(i)}
                  className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
                    checked
                      ? "border-brand/40 bg-secondary/60"
                      : "border-border bg-card hover:border-brand/30"
                  }`}
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg ${
                      checked ? "bg-brand text-white" : "bg-secondary"
                    }`}
                  >
                    {checked ? <Check className="h-5 w-5" /> : s.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-brand">
                      Paso {i + 1}
                    </p>
                    <p className="mt-0.5 font-semibold text-foreground">{s.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 rounded-2xl bg-secondary p-5">
          <p className="text-sm font-semibold text-brand-ink">Después del episodio</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Anota la duración, qué movimientos observaste y si hubo pérdida de conciencia. Esta
            información es muy útil para el equipo médico.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Este contenido es orientativo y no reemplaza el consejo médico profesional.
        </p>
      </div>
    </div>
  );
}
