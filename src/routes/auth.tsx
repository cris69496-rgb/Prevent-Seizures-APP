import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión — Prevents Seizures" },
      { name: "description", content: "Accede para guardar tu progreso y perfiles." },
      { property: "og:title", content: "Iniciar sesión — Prevents Seizures" },
      { property: "og:description", content: "Guarda tu progreso y crea perfiles personalizados." },
    ],
  }),
  component: Auth,
});

function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("login");

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
          {mode === "login" ? "Bienvenido de vuelta" : "Crea tu cuenta"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "login"
            ? "Accede para continuar tu aprendizaje."
            : "Guarda tu progreso y perfiles de seres queridos."}
        </p>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
      >
        {mode === "signup" && (
          <Field label="Nombre" type="text" placeholder="Tu nombre" />
        )}
        <Field label="Correo electrónico" type="email" placeholder="tu@correo.com" />
        <Field label="Contraseña" type="password" placeholder="••••••••" />

        <button
          type="submit"
          className="mt-2 w-full rounded-full py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)]"
          style={{ background: "var(--gradient-brand)" }}
        >
          {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
        </button>

        {mode === "login" && (
          <button type="button" className="w-full text-center text-xs text-muted-foreground">
            ¿Olvidaste tu contraseña?
          </button>
        )}
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {mode === "login" ? "¿Aún no tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="font-semibold text-brand"
        >
          {mode === "login" ? "Crear una" : "Iniciar sesión"}
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
