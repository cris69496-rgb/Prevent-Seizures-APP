import { createFileRoute } from "@tanstack/react-router";
import { PlayCircle, Clock } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos — Demostraciones de primeros auxilios" },
      {
        name: "description",
        content: "Videos breves que muestran cómo asistir durante distintos tipos de convulsiones.",
      },
      { property: "og:title", content: "Videos — Prevents Seizures" },
      {
        property: "og:description",
        content: "Demostraciones visuales de primeros auxilios en convulsiones.",
      },
    ],
  }),
  component: Videos,
});

const videos = [
  { title: "Posición de seguridad paso a paso", duration: "2:14", tag: "Técnica" },
  { title: "Qué hacer si ocurre en la calle", duration: "3:02", tag: "Escenario" },
  { title: "Convulsión febril en niños", duration: "2:45", tag: "Pediátrica" },
  { title: "Después del episodio: cómo acompañar", duration: "1:58", tag: "Cuidado" },
  { title: "Errores comunes que debes evitar", duration: "2:30", tag: "Mitos" },
  { title: "Cómo cronometrar y documentar la crisis", duration: "1:40", tag: "Registro" },
];

function Videos() {
  return (
    <MobileShell>
      <header className="px-5 pb-4 pt-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">Videos</p>
        <h1 className="mt-1 text-2xl font-extrabold text-foreground">Aprende viendo</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Demostraciones visuales cortas para reforzar tu confianza.
        </p>
      </header>

      <ul className="space-y-4 px-5">
        {videos.map((v, i) => (
          <li
            key={i}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
          >
            <div
              className="relative flex aspect-video items-center justify-center"
              style={{ background: "var(--gradient-hero)" }}
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-white shadow-[var(--shadow-soft)]">
                <PlayCircle className="h-8 w-8 text-brand" />
              </span>
              <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white">
                <Clock className="h-3 w-3" /> {v.duration}
              </span>
            </div>
            <div className="p-4">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-brand">
                {v.tag}
              </span>
              <p className="mt-1 font-semibold text-foreground">{v.title}</p>
            </div>
          </li>
        ))}
      </ul>
    </MobileShell>
  );
}
