import { createFileRoute, Link } from "@tanstack/react-router";
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
    excerpt: "Una descarga eléctrica anormal en el cerebro que altera brevemente el comportamiento.",
    tag: "Fundamentos",
    minutes: 4,
  },
  {
    slug: "tonico-clonica",
    title: "Crisis tónico-clónica generalizada",
    excerpt: "Rigidez seguida de sacudidas rítmicas. Es la más reconocida y suele durar 1–3 min.",
    tag: "Epiléptica",
    minutes: 5,
  },
  {
    slug: "ausencia",
    title: "Crisis de ausencia",
    excerpt: "Breves lapsos de desconexión, comunes en niños. Duran segundos y se confunden con distracción.",
    tag: "Epiléptica",
    minutes: 3,
  },
  {
    slug: "focal",
    title: "Crisis focales",
    excerpt: "Se originan en una zona del cerebro. Pueden causar movimientos o sensaciones extrañas sin perder la conciencia.",
    tag: "Epiléptica",
    minutes: 4,
  },
  {
    slug: "no-epilepticas",
    title: "Crisis no epilépticas (PNES)",
    excerpt: "Se manifiestan como convulsiones pero tienen un origen psicógeno. La asistencia enfatiza la calma y el acompañamiento.",
    tag: "No epiléptica",
    minutes: 5,
  },
  {
    slug: "febriles",
    title: "Convulsiones febriles",
    excerpt: "Ocurren en niños pequeños asociadas a fiebre alta. Casi siempre son benignas.",
    tag: "Pediátrica",
    minutes: 3,
  },
];

function Biblioteca() {
  return (
    <MobileShell>
      <header className="px-5 pb-4 pt-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">Biblioteca</p>
        <h1 className="mt-1 text-2xl font-extrabold text-foreground">Aprende sobre convulsiones</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Lecturas breves para entender los distintos tipos y cómo asistir en cada caso.
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
