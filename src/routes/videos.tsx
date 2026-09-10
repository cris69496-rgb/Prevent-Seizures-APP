import { createFileRoute, Link } from "@tanstack/react-router";
import { PlayCircle, Clock, CheckCircle2, RotateCcw, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { MobileShell } from "@/components/MobileShell";
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

type Filter = "todas" | "pendientes" | "completadas" | string;

function Videos() {
  const progressMap = useAllGuideProgress();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("todas");

  const completedCount = videoGuides.filter((v) => progressMap[v.slug]?.completed).length;
  const tags = useMemo(() => Array.from(new Set(videoGuides.map((v) => v.tag))), []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return videoGuides.filter((v) => {
      const p = progressMap[v.slug];
      if (filter === "completadas" && !p?.completed) return false;
      if (filter === "pendientes" && p?.completed) return false;
      if (filter !== "todas" && filter !== "completadas" && filter !== "pendientes" && v.tag !== filter)
        return false;
      if (!q) return true;
      return (
        v.title.toLowerCase().includes(q) ||
        v.summary.toLowerCase().includes(q) ||
        v.tag.toLowerCase().includes(q) ||
        v.steps.some((s) => s.title.toLowerCase().includes(q))
      );
    });
  }, [query, filter, progressMap]);

  const chips: { key: Filter; label: string }[] = [
    { key: "todas", label: "Todas" },
    { key: "pendientes", label: "Pendientes" },
    { key: "completadas", label: "Completadas" },
    ...tags.map((t) => ({ key: t as Filter, label: t })),
  ];

  return (
    <MobileShell>
      <header className="px-5 pb-4 pt-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">Videos</p>
        <h1 className="mt-1 text-2xl font-extrabold text-foreground">Aprende viendo</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Guías animadas paso a paso, con ilustraciones claras y un reproductor que avanza contigo.
        </p>
        <div className="mt-4 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-foreground">Tu avance</span>
            <span className="text-muted-foreground">
              {completedCount}/{videoGuides.length} guías completadas
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-brand transition-[width]"
              style={{ width: `${(completedCount / videoGuides.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="relative mt-4">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar guía, tema o paso…"
            aria-label="Buscar guías"
            className="w-full rounded-full border border-input bg-background py-2.5 pl-10 pr-9 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
          {query && (
            <button
              type="button"
              aria-label="Limpiar búsqueda"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1">
          {chips.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setFilter(c.key)}
              aria-pressed={filter === c.key}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                filter === c.key
                  ? "border-brand bg-brand text-white"
                  : "border-border bg-card text-muted-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </header>

      {visible.length === 0 ? (
        <p className="px-6 py-10 text-center text-sm text-muted-foreground">
          No encontramos guías con ese criterio. Prueba con otra palabra o quita los filtros.
        </p>
      ) : (
        <ul className="space-y-4 px-5">
          {visible.map((v) => {
            const p = progressMap[v.slug];
            const pct = progressPercent(p);
            const inProgress = !!p && !p.completed && p.step > 0;
            return (
              <li key={v.slug}>
                <Link
                  to="/videos/$slug"
                  params={{ slug: v.slug }}
                  className="block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:border-brand/40 hover:shadow-[var(--shadow-soft)]"
                >
                  <div className="relative aspect-video">
                    <img
                      src={`https://i.ytimg.com/vi/${v.video.youtubeId}/hqdefault.jpg`}
                      alt={v.video.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 shadow-[var(--shadow-soft)]">
                        <PlayCircle className="h-8 w-8 text-brand" />
                      </span>
                    </span>
                    {p?.completed && (
                      <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold text-white">
                        <CheckCircle2 className="h-3 w-3" /> Completada
                      </span>
                    )}
                    {inProgress && (
                      <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-brand-ink/85 px-2 py-0.5 text-[11px] font-semibold text-white">
                        <RotateCcw className="h-3 w-3" /> Paso {p.step + 1}/{v.steps.length}
                      </span>
                    )}
                    <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white">
                      <Clock className="h-3 w-3" /> {v.duration}
                    </span>
                  </div>
                  {pct > 0 && (
                    <div className="h-1 w-full bg-secondary">
                      <div className="h-full bg-brand" style={{ width: `${pct}%` }} />
                    </div>
                  )}
                  <div className="p-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-brand">
                      {v.tag} · {v.steps.length} pasos
                    </span>
                    <p className="mt-1 font-semibold text-foreground">{v.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{v.summary}</p>
                    {inProgress && (
                      <p className="mt-2 text-xs font-semibold text-brand">
                        Continuar donde te quedaste
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </MobileShell>
  );
}
