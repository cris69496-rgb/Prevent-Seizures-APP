import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Nueva contraseña — Prevent Seizures S.A.S." },
      { name: "description", content: "Define una nueva contraseña para tu cuenta." },
      { property: "og:title", content: "Nueva contraseña — Prevent Seizures S.A.S." },
      { property: "og:description", content: "Restablece el acceso a tu cuenta." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) return setError("La contraseña debe tener al menos 6 caracteres.");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      setError("El enlace expiró o no es válido. Solicita uno nuevo.");
      return;
    }
    setDone(true);
    setTimeout(() => void navigate({ to: "/progreso", replace: true }), 1200);
  };

  return (
    <div
      className="mx-auto min-h-screen w-full max-w-md px-5 pb-10 pt-4"
      style={{ background: "var(--gradient-hero)" }}
    >
      <Link
        to="/auth"
        aria-label="Volver"
        className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm"
      >
        <ArrowLeft className="h-5 w-5 text-brand-ink" />
      </Link>

      <h1 className="mt-8 text-center text-2xl font-extrabold text-foreground">
        Define tu nueva contraseña
      </h1>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
      >
        <label className="block">
          <span className="text-xs font-semibold text-foreground">Nueva contraseña</span>
          <input
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </label>

        {error && (
          <p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {error}
          </p>
        )}
        {done && (
          <p role="status" className="rounded-xl bg-secondary px-3 py-2 text-xs text-brand-ink">
            Contraseña actualizada. Redirigiendo…
          </p>
        )}

        <button
          type="submit"
          disabled={busy || done}
          className="flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)] disabled:opacity-60"
          style={{ background: "var(--gradient-brand)" }}
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Guardar contraseña
        </button>
      </form>
    </div>
  );
}
