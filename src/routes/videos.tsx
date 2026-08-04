import { createFileRoute, Link } from "@tanstack/react-router";
import { PlayCircle, Clock, CheckCircle2, RotateCcw } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { GuideScene } from "@/components/GuideScene";
import { useAllGuideProgress, progressPercent } from "@/lib/guide-progress";
import { videoGuides } from "@/lib/video-guides";



export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos — Demostraciones de primeros auxilios" },
      {
        name: "description",
        content: "Videos breves que muestran cómo asistir durante distintos tipos de convulsiones.",
      },
      { property: "og:title", content: "Videos — Prevent Seizures S.A.S." },
      {
        property: "og:description",
        content: "Demostraciones visuales de primeros auxilios en convulsiones.",
      },
    ],
  }),
  component: Videos,
});

function Videos() {
  return (
    <MobileShell>
      <header className="px-5 pb-4 pt-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">Videos</p>
        <h1 className="mt-1 text-2xl font-extrabold text-foreground">Aprende viendo</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Guías animadas paso a paso, con ilustraciones claras y un reproductor que avanza contigo.
        </p>
      </header>

      <ul className="space-y-4 px-5">
        {videoGuides.map((v) => (
          <li key={v.slug}>
            <Link
              to="/videos/$slug"
              params={{ slug: v.slug }}
              className="block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:border-brand/40 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="relative aspect-video">
                <GuideScene variant={v.steps[0].scene} />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 shadow-[var(--shadow-soft)]">
                    <PlayCircle className="h-8 w-8 text-brand" />
                  </span>
                </span>
                <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white">
                  <Clock className="h-3 w-3" /> {v.duration}
                </span>
              </div>
              <div className="p-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand">
                  {v.tag} · {v.steps.length} pasos
                </span>
                <p className="mt-1 font-semibold text-foreground">{v.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{v.summary}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </MobileShell>
  );
}

