import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Award, CheckCircle2, Circle, LogOut, Lock, Cloud } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { useAuth } from "@/hooks/use-auth";
import { useAllGuideProgress, progressPercent } from "@/lib/guide-progress";
import { videoGuides } from "@/lib/video-guides";
import { supabase } from "@/integrations/supabase/client";

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

  const completed = videoGuides.filter((g) => progressMap[g.slug]?.completed).length;
  const pct = Math.round((completed / videoGuides.length) * 100);

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
          <div className="h-6 w-40 animate-pulse rounded-full bg-secondary" />
          <div className="mt-4 h-28 animate-pulse rounded-2xl bg-secondary" />
        </div>
      </MobileShell>
    );
  }

  if (!isAuthed) {
    return (
      <MobileShell>
        <div className="flex min-h-[75vh] flex-col items-center justify-center px-6 text-center">
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
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      <header className="flex items-start justify-between px-5 pb-4 pt-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">Progreso</p>
          <h1 className="mt-1 text-2xl font-extrabold text-foreground">
            Hola, {profile?.display_name ?? user?.email?.split("@")[0]}
          </h1>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <Cloud className="h-3.5 w-3.5" /> Sincronizado en la nube
          </p>
        </div>
        <button
          type="button"
          onClick={signOut}
          aria-label="Cerrar sesión"
          className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground"
        >
          <LogOut className="h-4 w-4" />
        </button>
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

      <ul className="mt-6 space-y-2 px-5">
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

      <div className="mt-6 px-5">
        <Link
          to="/perfiles"
          className="block rounded-2xl border border-border bg-card p-4 text-sm font-semibold text-brand"
        >
          Gestionar perfiles de seres queridos →
        </Link>
      </div>
    </MobileShell>
  );
}
