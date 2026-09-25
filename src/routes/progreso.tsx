import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Award, Brain, CheckCircle2, Circle, LogOut, Lock, Cloud, Sparkles, UserCheck, Siren, BookOpen, PlayCircle, Heart, Trophy } from "lucide-react";
import { useAchievementState } from "@/lib/achievements";

const ARTICLE_SLUGS = ["que-es", "tonico-clonica", "ausencia", "focal", "no-epilepticas", "febriles", "vivir-con-epilepsia", "plan-de-accion"];
import { MobileShell } from "@/components/MobileShell";
import { useAuth } from "@/hooks/use-auth";
import { useAllGuideProgress, progressPercent } from "@/lib/guide-progress";
import { videoGuides } from "@/lib/video-guides";
import { supabase } from "@/integrations/supabase/client";
import { quizzes, useQuizResults } from "@/lib/quizzes";

export const Route = createFileRoute("/progreso")({
  head: () => ({
    meta: [
      { title: "Progreso — Tu aprendizaje" },
      { name: "description", content: "Revisa guías completadas, videos vistos y certificados." },
      { property: "og:title", content: "Progreso — Prevent Seizures S.A.S." },
      { property: "og:description", content: "Rastrea tu aprendizaje sobre primeros auxilios." },
    ],
  }),
  component: Progreso,
});

function Progreso() {
  const { isAuthed, loading, user } = useAuth();
  const progressMap = useAllGuideProgress();
  const quizResults = useQuizResults();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user!.id)
        .maybeSingle();
      return data;
    },
  });

  const { data: lovedCount = 0 } = useQuery({
    queryKey: ["loved-count", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { count } = await supabase
        .from("loved_ones")
        .select("id", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const ach = useAchievementState();
  const completed = videoGuides.filter((g) => progressMap[g.slug]?.completed).length;
  const pct = Math.round((completed / videoGuides.length) * 100);
  const articlesRead = ach.articles.filter((s) => ARTICLE_SLUGS.includes(s)).length;
  const achievements = [
    { icon: Sparkles, title: "Bienvenida", desc: "Abriste la app por primera vez", done: !!ach.firstOpen },
    { icon: UserCheck, title: "Parte del equipo", desc: "Te registraste", done: isAuthed },
    { icon: Siren, title: "Listo para actuar", desc: "Viste la guía SOS", done: !!ach.sosViewed },
    { icon: BookOpen, title: "Lector experto", desc: `Leíste todas las guías de Aprender (${articlesRead}/${ARTICLE_SLUGS.length})`, done: articlesRead >= ARTICLE_SLUGS.length },
    { icon: PlayCircle, title: "Maratón de videos", desc: `Viste todos los videos (${completed}/${videoGuides.length})`, done: completed >= videoGuides.length },
    { icon: Heart, title: "Red de apoyo", desc: "Agregaste a un ser querido", done: lovedCount > 0 },
  ];
  const unlocked = achievements.filter((a) => a.done).length;

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/auth", replace: true });
  };

  if (loading) {
    return (
      <MobileShell>
        <div className="min-h-[75vh] px-5 pt-10">
          <Link
            to="/"
            aria-label="Regresar al inicio"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-brand"
          >
            <ArrowLeft className="h-5 w-5" />
            Inicio
          </Link>
          <div className="h-6 w-40 animate-pulse rounded-full bg-secondary" />
          <div className="mt-4 h-28 animate-pulse rounded-2xl bg-secondary" />
        </div>
      </MobileShell>
    );
  }

  if (!isAuthed) {
    return (
      <MobileShell>
        <div className="min-h-[75vh] px-5 pt-8">
          <Link
            to="/"
            aria-label="Regresar al inicio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand"
          >
            <ArrowLeft className="h-5 w-5" />
            Inicio
          </Link>
          <div className="flex min-h-[65vh] flex-col items-center justify-center px-1 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-secondary text-brand">
            <Lock className="h-7 w-7" />
          </span>
          <h1 className="mt-4 text-xl font-extrabold text-foreground">Guarda tu progreso</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Inicia sesión para sincronizar en la nube tus guías completadas y retomarlas desde
            cualquier dispositivo.
          </p>
          {completed > 0 && (
            <p className="mt-3 rounded-xl bg-secondary px-3 py-2 text-xs text-brand-ink">
              Tienes {completed} guía{completed === 1 ? "" : "s"} completada
              {completed === 1 ? "" : "s"} en este dispositivo. Al entrar se guardarán en tu cuenta.
            </p>
          )}
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
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      <header className="px-5 pb-4 pt-8">
        <Link
          to="/"
          aria-label="Regresar al inicio"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-brand"
        >
          <ArrowLeft className="h-5 w-5" />
          Inicio
        </Link>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">Progreso</p>
          <h1 className="mt-1 text-2xl font-extrabold text-foreground">
            Hola, {profile?.display_name ?? user?.email?.split("@")[0]}
          </h1>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <Cloud className="h-3.5 w-3.5" /> Sincronizado en la nube
          </p>
        </div>
      </header>

      <section className="px-5">
        <div
          className="rounded-2xl p-5 text-white shadow-[var(--shadow-soft)]"
          style={{ background: "var(--gradient-brand)" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/80">Guías completadas</p>
              <p className="mt-1 text-3xl font-extrabold">
                {completed}/{videoGuides.length}
              </p>
            </div>
            <Award className="h-10 w-10" />
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-white transition-[width]" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </section>

      <section className="mt-6 px-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Trophy className="h-4 w-4 text-brand" /> Logros
          </h2>
          <span className="text-xs font-semibold text-brand">
            {unlocked}/{achievements.length} desbloqueados
          </span>
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
          {achievements.map((a) => {
            const Icon = a.icon;
            return (
              <li
                key={a.title}
                className={`flex flex-col items-center rounded-2xl border p-4 text-center ${
                  a.done ? "border-brand/30 bg-secondary" : "border-border bg-card opacity-60"
                }`}
              >
                <span
                  className={`grid h-12 w-12 place-items-center rounded-full ${
                    a.done ? "text-primary-foreground shadow-[var(--shadow-soft)]" : "bg-muted text-muted-foreground"
                  }`}
                  style={a.done ? { background: "var(--gradient-brand)" } : undefined}
                >
                  {a.done ? <Icon className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
                </span>
                <p className="mt-2 text-sm font-bold text-foreground">{a.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{a.desc}</p>
                <span className="sr-only">{a.done ? "Desbloqueado" : "Bloqueado"}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <h2 className="mt-8 px-5 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Guías animadas</h2>
      <ul className="mt-3 space-y-2 px-5">
        {videoGuides.map((g) => {
          const p = progressMap[g.slug];
          const gp = progressPercent(p);
          return (
            <li key={g.slug}>
              <Link
                to="/videos/$slug"
                params={{ slug: g.slug }}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
              >
                {p?.completed ? (
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-brand" />
                ) : (
                  <Circle className="h-6 w-6 shrink-0 text-muted-foreground" />
                )}
                <div className="min-w-0 flex-1">
                  <p className={`text-sm ${p?.completed ? "text-foreground" : "text-muted-foreground"}`}>
                    {g.title}
                  </p>
                  {gp > 0 && !p?.completed && (
                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-secondary">
                      <div className="h-full bg-brand" style={{ width: `${gp}%` }} />
                    </div>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <section className="mt-8 px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Trivias</h2>
          <span className="text-xs font-semibold text-brand">
            {Object.keys(quizResults).length}/{Object.keys(quizzes).length} completadas
          </span>
        </div>
        <ul className="mt-3 space-y-2">
          {Object.entries(quizzes).map(([slug, qz]) => {
            const r = quizResults[slug];
            return (
              <li key={slug}>
                <Link
                  to="/biblioteca/$slug"
                  params={{ slug }}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
                >
                  <Brain className={`h-6 w-6 shrink-0 ${r ? "text-brand" : "text-muted-foreground"}`} />
                  <p className="flex-1 text-sm text-foreground">{qz.title}</p>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${r ? "bg-secondary text-brand-ink" : "text-muted-foreground"}`}>
                    {r ? `${r.score}/${r.total}` : "Pendiente"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="mt-6 px-5">
        <Link
          to="/perfiles"
          className="block rounded-2xl border border-border bg-card p-4 text-sm font-semibold text-brand"
        >
          Gestionar perfiles de seres queridos →
        </Link>
      </div>

      <div className="mt-6 px-5 pb-4">
        <button
          type="button"
          onClick={signOut}
          className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-destructive/30 bg-destructive/5 py-3 text-sm font-semibold text-destructive transition hover:bg-destructive/10 active:scale-[0.98]"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </div>
    </MobileShell>
  );
}
