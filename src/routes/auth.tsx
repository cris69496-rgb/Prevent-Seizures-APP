import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión — Prevent Seizures S.A.S." },
      { name: "description", content: "Accede para guardar tu progreso y perfiles." },
      { property: "og:title", content: "Iniciar sesión — Prevent Seizures S.A.S." },
      { property: "og:description", content: "Guarda tu progreso y crea perfiles personalizados." },
    ],
  }),
  component: Auth,
});

type Mode = "login" | "signup" | "forgot";

function Auth() {
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const { isAuthed, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthed) void navigate({ to: "/progreso", replace: true });
  }, [isAuthed, loading, navigate]);

  const translate = (msg: string) => {
    const m = msg.toLowerCase();
    if (m.includes("invalid login")) return "Correo o contraseña incorrectos.";
    if (m.includes("already registered")) return "Ese correo ya tiene una cuenta. Inicia sesión.";
    if (m.includes("password")) return "La contraseña debe tener al menos 6 caracteres.";
    if (m.includes("email")) return "Revisa que el correo sea válido.";
    return msg;
  };

  const validate = () => {
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return "Escribe un correo válido.";
    if (mode !== "forgot" && password.length < 6)
      return "La contraseña debe tener al menos 6 caracteres.";
    if (mode === "signup" && name.trim().length < 2) return "Escribe tu nombre.";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    const invalid = validate();
    if (invalid) return setError(invalid);

    setBusy(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: name.trim() },
          },
        });
        if (error) throw error;
        if (!data.session) {
          setInfo("Te enviamos un correo para confirmar tu cuenta. Revisa tu bandeja.");
        }
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setInfo("Si el correo existe, te enviamos un enlace para restablecer tu contraseña.");
      }
    } catch (err) {
      setError(translate(err instanceof Error ? err.message : String(err)));
    } finally {
      setBusy(false);
    }
  };

  const onGoogle = async () => {
    setError(null);
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError("No pudimos conectar con Google. Inténtalo de nuevo.");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    setBusy(false);
  };

  return (
    <div
      className="mx-auto min-h-screen w-full max-w-md px-5 pb-10 pt-4"
      style={{ background: "var(--gradient-hero)" }}
    >
      <Link
        to="/"
        aria-label="Volver"
        className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm"
      >
        <ArrowLeft className="h-5 w-5 text-brand-ink" />
      </Link>

      <div className="mt-8 text-center">
        <div
          className="mx-auto grid h-14 w-14 place-items-center rounded-2xl text-white shadow-[var(--shadow-soft)]"
          style={{ background: "var(--gradient-brand)" }}
        >
          <span className="text-2xl font-black">P</span>
        </div>
        <h1 className="mt-4 text-2xl font-extrabold text-foreground">
          {mode === "login"
            ? "Bienvenido de vuelta"
            : mode === "signup"
              ? "Crea tu cuenta"
              : "Recupera tu acceso"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "login"
            ? "Accede para continuar tu aprendizaje."
            : mode === "signup"
              ? "Guarda tu progreso y perfiles de seres queridos."
              : "Te enviaremos un enlace a tu correo."}
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
      >
        {mode === "signup" && (
          <Field
            label="Nombre"
            type="text"
            placeholder="Tu nombre"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <Field
          label="Correo electrónico"
          type="email"
          placeholder="tu@correo.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {mode !== "forgot" && (
          <Field
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        {error && (
          <p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {error}
          </p>
        )}
        {info && (
          <p role="status" className="rounded-xl bg-secondary px-3 py-2 text-xs text-brand-ink">
            {info}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)] disabled:opacity-60"
          style={{ background: "var(--gradient-brand)" }}
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "login" ? "Iniciar sesión" : mode === "signup" ? "Crear cuenta" : "Enviar enlace"}
        </button>

        {mode === "login" && (
          <button
            type="button"
            onClick={() => {
              setMode("forgot");
              setError(null);
              setInfo(null);
            }}
            className="w-full text-center text-xs text-muted-foreground"
          >
            ¿Olvidaste tu contraseña?
          </button>
        )}
        {mode === "forgot" && (
          <button
            type="button"
            onClick={() => setMode("login")}
            className="w-full text-center text-xs text-muted-foreground"
          >
            Volver a iniciar sesión
          </button>
        )}
      </form>

      {mode !== "forgot" && (
        <>
          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">o</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            onClick={onGoogle}
            disabled={busy}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-border bg-card py-3 text-sm font-semibold text-foreground shadow-sm disabled:opacity-60"
          >
            <GoogleMark />
            Continuar con Google
          </button>
        </>
      )}

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {mode === "signup" ? "¿Ya tienes cuenta?" : "¿Aún no tienes cuenta?"}{" "}
        <button
          onClick={() => {
            setMode(mode === "signup" ? "login" : "signup");
            setError(null);
            setInfo(null);
          }}
          className="font-semibold text-brand"
        >
          {mode === "signup" ? "Iniciar sesión" : "Crear una"}
        </button>
      </p>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        La guía de emergencia es siempre gratuita y no requiere cuenta.
        <br />
        <Link to="/emergencia" className="font-semibold text-brand">
          Ir a la guía SOS →
        </Link>
      </p>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-4 w-4" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.1 17.6 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.9 7.2l7.6 5.9c4.4-4.1 7.1-10.1 7.1-17.6z" />
      <path fill="#FBBC05" d="M10.4 28.7a14.5 14.5 0 0 1 0-9.4l-7.8-6.1a24 24 0 0 0 0 21.6l7.8-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.8 2.2-8.3 2.2-6.4 0-11.7-3.6-13.6-8.8l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

function Field({
  label,
  ...rest
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-foreground">{label}</span>
      <input
        {...rest}
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
    </label>
  );
}
