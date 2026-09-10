import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/biblioteca")({
  head: () => ({
    meta: [
      { title: "Biblioteca — Tipos de convulsiones" },
      {
        name: "description",
        content: "Guías educativas sobre convulsiones epilépticas y no epilépticas.",
      },
      { property: "og:title", content: "Biblioteca — Tipos de convulsiones" },
      {
        property: "og:description",
        content: "Aprende qué son las convulsiones y cómo asistir en cada tipo.",
      },
    ],
  }),
  component: Biblioteca,
});

const topics = [
  {
    slug: "que-es",
    title: "¿Qué es una convulsión?",
    excerpt:
      "Qué ocurre en el cerebro, cómo se clasifican (ILAE 2017) y por qué 5 minutos es la señal de alarma.",
    tag: "Fundamentos",
    minutes: 5,
  },
  {
    slug: "tonico-clonica",
    title: "Crisis tónico-clónica generalizada",
    excerpt:
      "Fase tónica, clónica y postictal, con el protocolo de primeros auxilios del CDC paso a paso.",
    tag: "Epiléptica",
    minutes: 6,
  },
  {
    slug: "ausencia",
    title: "Crisis de ausencia",
    excerpt:
      "Desconexiones de menos de 15 segundos, frecuentes entre los 4 y los 10 años. Cómo reconocerlas.",
    tag: "Epiléptica",
    minutes: 4,
  },
  {
    slug: "focal",
    title: "Crisis focales",
    excerpt:
      "Con o sin alteración de la conciencia. Auras, automatismos y cómo acompañar sin sujetar.",
    tag: "Epiléptica",
    minutes: 5,
  },
  {
    slug: "no-epilepticas",
    title: "Crisis no epilépticas psicógenas (CNEP)",
    excerpt:
      "Hasta el 30 % de las crisis resistentes en centros especializados. Diagnóstico por video-EEG y acompañamiento.",
    tag: "No epiléptica",
    minutes: 6,
  },
  {
    slug: "febriles",
    title: "Convulsiones febriles",
    excerpt:
      "Afectan al 2–5 % de los niños entre 6 meses y 5 años. Diferencia entre simples y complejas.",
    tag: "Pediátrica",
    minutes: 5,
  },
  {
    slug: "vivir-con-epilepsia",
    title: "Vivir con epilepsia: mitos y datos",
    excerpt:
      "Cinco creencias falsas desmontadas con datos de la OMS y el CDC, y cómo ayudar de verdad.",
    tag: "Fundamentos",
    minutes: 5,
  },
  {
    slug: "plan-de-accion",
    title: "Plan de acción ante convulsiones",
    excerpt:
      "Qué incluir en el plan, cómo llevar un diario de crisis y cómo preparar el entorno en casa.",
    tag: "Cuidadores",
    minutes: 5,
  },
];

function Biblioteca() {
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
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">Biblioteca</p>
        <h1 className="mt-1 text-2xl font-extrabold text-foreground">Aprende sobre convulsiones</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Contenido basado en fuentes oficiales (OMS, CDC, ILAE, NINDS) para entender cada tipo de crisis y saber cómo asistir.
        </p>
      </header>

      <ul className="space-y-3 px-5">
        {topics.map((t) => (
          <li key={t.slug}>
            <Link
              to="/biblioteca/$slug"
              params={{ slug: t.slug }}
              className="block rounded-2xl border border-border bg-card p-4 transition hover:border-brand/40 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-ink">
                  {t.tag}
                </span>
                <span className="text-[11px] text-muted-foreground">{t.minutes} min lectura</span>
              </div>
              <p className="mt-3 font-semibold text-foreground">{t.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </MobileShell>
  );
}
