import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Pause,
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { GuideScene } from "@/components/GuideScene";
import { useGuideProgress } from "@/lib/guide-progress";
import { getGuide, videoGuides, type VideoGuide } from "@/lib/video-guides";


export const Route = createFileRoute("/videos_/$slug")({
  loader: ({ params }) => {
    const guide = getGuide(params.slug);
    if (!guide) throw notFound();
    return { guide };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Guía no disponible" }, { name: "robots", content: "noindex" }],
      };
    }
    const { guide } = loaderData;
    return {
      meta: [
        { title: `${guide.title} — Guía animada` },
        { name: "description", content: guide.summary },
        { property: "og:title", content: `${guide.title} — Prevent Seizures S.A.S.` },
        { property: "og:description", content: guide.summary },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: GuidePlayer,
});

function GuidePlayer() {
  const { guide } = Route.useLoaderData() as { guide: VideoGuide };
  const stepCount = guide.steps.length;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [resumed, setResumed] = useState(false);
  const [resumedFrom, setResumedFrom] = useState<number | null>(null);

  const { progress: saved, save, reset, hydrated } = useGuideProgress(guide.slug, stepCount);

  const step = guide.steps[index];
  const total = useMemo(
    () => guide.steps.reduce((acc, s) => acc + s.seconds, 0),
    [guide],
  );

  // Retomar donde se quedó (una sola vez, tras hidratar).
  useEffect(() => {
    if (!hydrated || resumed) return;
    setResumed(true);
    if (saved && !saved.completed && saved.step > 0 && saved.step < stepCount) {
      setIndex(saved.step);
      setResumedFrom(saved.step);
      setPlaying(false);
    }
  }, [hydrated, resumed, saved, stepCount]);

  useEffect(() => {
    setElapsed(0);
  }, [index]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setElapsed((e) => {
        if (e + 0.1 >= step.seconds) {
          setIndex((i) => {
            if (i + 1 < guide.steps.length) return i + 1;
            setPlaying(false);
            return i;
          });
          return step.seconds;
        }
        return e + 0.1;
      });
    }, 100);
    return () => window.clearInterval(id);
  }, [playing, step, guide.steps.length]);

  const progress = Math.min(100, (elapsed / step.seconds) * 100);
  const finished = index === guide.steps.length - 1 && !playing && elapsed >= step.seconds;

  // Guarda el marcador cada vez que cambia el paso.
  useEffect(() => {
    if (!resumed) return;
    save(index, false);
  }, [index, resumed, save]);

  useEffect(() => {
    if (!resumed || !finished) return;
    save(stepCount - 1, true);
  }, [finished, resumed, save, stepCount]);

  const restart = () => {
    reset();
    setResumedFrom(null);
    setIndex(0);
    setElapsed(0);
    setPlaying(true);
  };


  return (
    <MobileShell>
      <header className="px-5 pb-3 pt-6">
        <Link
          to="/videos"
          className="inline-flex items-center gap-1 text-sm font-medium text-brand"
        >
          <ArrowLeft className="h-4 w-4" /> Volver
        </Link>
        <p className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-brand">
          {guide.tag} · Guía animada · {Math.round(total / 60)} min aprox.
        </p>
        <h1 className="mt-1 text-xl font-extrabold text-foreground">{guide.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{guide.summary}</p>
      </header>

      {(resumedFrom !== null || saved?.completed) && (
        <div className="mx-5 mb-3 flex items-center gap-3 rounded-2xl border border-brand/30 bg-secondary p-3">
          {saved?.completed ? (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" />
          ) : (
            <RotateCcw className="h-5 w-5 shrink-0 text-brand" />
          )}
          <p className="flex-1 text-xs text-brand-ink">
            {saved?.completed
              ? "Ya completaste esta guía. Puedes repasarla cuando quieras."
              : `Retomaste desde el paso ${(resumedFrom ?? 0) + 1} de ${stepCount}.`}
          </p>
          <button
            type="button"
            onClick={restart}
            className="shrink-0 rounded-full border border-brand px-3 py-1 text-xs font-semibold text-brand"
          >
            Empezar de nuevo
          </button>
        </div>
      )}



      <section className="px-5">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
          <div key={index} className="animate-fade-in aspect-video w-full">
            <GuideScene variant={step.scene} />
          </div>

          <div className="h-1.5 w-full bg-secondary">
            <div
              className="h-full bg-brand transition-[width] duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Paso {index + 1} de {guide.steps.length}
            </p>
            <h2 className="mt-1 text-base font-bold text-foreground">{step.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>

            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label="Paso anterior"
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                disabled={index === 0}
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground disabled:opacity-40"
              >
                <SkipBack className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label={playing ? "Pausar" : "Reproducir"}
                onClick={() => {
                  if (finished) {
                    setIndex(0);
                    setElapsed(0);
                  }
                  setPlaying((p) => !p);
                }}
                className="grid h-14 w-14 place-items-center rounded-full text-white shadow-[var(--shadow-soft)]"
                style={{ background: "var(--gradient-brand)" }}
              >
                {finished ? (
                  <RotateCcw className="h-6 w-6" />
                ) : playing ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </button>
              <button
                type="button"
                aria-label="Paso siguiente"
                onClick={() =>
                  setIndex((i) => Math.min(guide.steps.length - 1, i + 1))
                }
                disabled={index === guide.steps.length - 1}
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground disabled:opacity-40"
              >
                <SkipForward className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 px-5">
        <h2 className="text-sm font-bold text-foreground">Pasos de la guía</h2>
        <ol className="mt-3 space-y-2">
          {guide.steps.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${
                  i === index
                    ? "border-brand bg-secondary"
                    : "border-border bg-card hover:border-brand/40"
                }`}
              >
                <span
                  className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                    i === index ? "bg-brand text-white" : "bg-secondary text-brand-ink"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-foreground">{s.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-6 px-5">
        <h2 className="text-sm font-bold text-foreground">Fuentes</h2>
        <ul className="mt-2 space-y-1">
          {guide.sources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand underline underline-offset-2"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 px-5">
        <h2 className="text-sm font-bold text-foreground">Otras guías</h2>
        <ul className="mt-3 space-y-2">
          {videoGuides
            .filter((g) => g.slug !== guide.slug)
            .slice(0, 3)
            .map((g) => (
              <li key={g.slug}>
                <Link
                  to="/videos/$slug"
                  params={{ slug: g.slug }}
                  className="block rounded-xl border border-border bg-card p-3 text-sm font-medium text-foreground"
                >
                  {g.title}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </MobileShell>
  );
}
