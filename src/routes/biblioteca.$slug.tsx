import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

const articles: Record<
  string,
  { title: string; tag: string; sections: { h: string; p: string }[] }
> = {
  "que-es": {
    title: "¿Qué es una convulsión?",
    tag: "Fundamentos",
    sections: [
      {
        h: "Una respuesta del cerebro",
        p: "Una convulsión es el resultado de una actividad eléctrica anormal en un grupo de neuronas. Puede afectar el movimiento, la conciencia o las sensaciones durante un breve período.",
      },
      {
        h: "No siempre es epilepsia",
        p: "Una convulsión aislada no equivale a epilepsia. El diagnóstico requiere evaluación médica y suele considerar episodios recurrentes.",
      },
      {
        h: "Qué esperar",
        p: "La mayoría de las crisis duran entre 30 segundos y 2 minutos. Después la persona puede estar cansada, confundida o dormida durante un rato.",
      },
    ],
  },
  "tonico-clonica": {
    title: "Crisis tónico-clónica generalizada",
    tag: "Epiléptica",
    sections: [
      {
        h: "Cómo se ve",
        p: "Comienza con rigidez muscular (fase tónica) seguida de sacudidas rítmicas de brazos y piernas (fase clónica). Puede haber pérdida de conciencia y salivación.",
      },
      {
        h: "Qué hacer",
        p: "Protege la cabeza, retira objetos, gira a la persona de lado y cronometra la duración. No sujetes sus movimientos ni pongas nada en la boca.",
      },
      {
        h: "Cuándo llamar a emergencias",
        p: "Si la crisis dura más de 5 minutos, se repite sin recuperación, ocurre en agua, o la persona no responde después.",
      },
    ],
  },
  ausencia: {
    title: "Crisis de ausencia",
    tag: "Epiléptica",
    sections: [
      {
        h: "Cómo se ve",
        p: "La persona (frecuentemente un niño) se queda con la mirada fija durante 5–20 segundos. Puede parpadear o hacer pequeños gestos.",
      },
      {
        h: "Qué hacer",
        p: "Mantén la calma y evita asustar al niño. Al terminar, retoma la conversación con naturalidad y avisa a un adulto responsable si es la primera vez.",
      },
    ],
  },
  focal: {
    title: "Crisis focales",
    tag: "Epiléptica",
    sections: [
      {
        h: "Cómo se ve",
        p: "Comienzan en una zona específica del cerebro. Pueden causar movimientos involuntarios en una parte del cuerpo, sensaciones extrañas o alteración de la conciencia.",
      },
      {
        h: "Qué hacer",
        p: "Acompaña a la persona, evita que se dañe con el entorno y habla con voz calmada. No intentes detener sus movimientos.",
      },
    ],
  },
  "no-epilepticas": {
    title: "Crisis no epilépticas (PNES)",
    tag: "No epiléptica",
    sections: [
      {
        h: "Origen distinto",
        p: "Aunque se parecen a una crisis epiléptica, su origen es psicológico y no eléctrico. No responden a fármacos antiepilépticos.",
      },
      {
        h: "Qué hacer",
        p: "Ofrece un entorno seguro y tranquilo. Habla con voz suave, evita rodearla de mucha gente y acompáñala hasta que se recupere.",
      },
    ],
  },
  febriles: {
    title: "Convulsiones febriles",
    tag: "Pediátrica",
    sections: [
      {
        h: "Cuándo ocurren",
        p: "En niños entre 6 meses y 5 años, asociadas a fiebre alta. Suelen ser breves y benignas.",
      },
      {
        h: "Qué hacer",
        p: "Coloca al niño de lado sobre una superficie segura, no intentes bajar la fiebre bruscamente, y consulta al pediatra tras el episodio.",
      },
    ],
  },
};

export const Route = createFileRoute("/biblioteca/$slug")({
  loader: ({ params }) => {
    const a = articles[params.slug];
    if (!a) throw notFound();
    return a;
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.title} — Prevents Seizures` },
            { name: "description", content: loaderData.sections[0]?.p ?? "" },
            { property: "og:title", content: loaderData.title },
            { property: "og:description", content: loaderData.sections[0]?.p ?? "" },
          ],
        }
      : { meta: [{ title: "Artículo no encontrado" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: () => (
    <div className="mx-auto max-w-md p-8 text-center">
      <p className="text-lg font-semibold">Artículo no encontrado</p>
      <Link to="/biblioteca" className="mt-4 inline-block text-brand underline">
        Volver a la biblioteca
      </Link>
    </div>
  ),
  component: Article,
});

function Article() {
  const a = Route.useLoaderData();
  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-background pb-16">
      <header
        className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 text-white"
        style={{ background: "var(--gradient-brand)" }}
      >
        <Link
          to="/biblioteca"
          aria-label="Volver"
          className="grid h-9 w-9 place-items-center rounded-full bg-white/15"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <p className="text-sm font-semibold">Biblioteca</p>
      </header>

      <article className="px-5 pt-6">
        <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-ink">
          {a.tag}
        </span>
        <h1 className="mt-3 text-2xl font-extrabold text-foreground">{a.title}</h1>

        <div className="mt-6 space-y-6">
          {a.sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-sm font-bold uppercase tracking-wider text-brand">{s.h}</h2>
              <p className="mt-1.5 text-[15px] leading-relaxed text-foreground/90">{s.p}</p>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-secondary p-5 text-sm text-muted-foreground">
          Contenido educativo con fines informativos. Ante dudas, consulta con un profesional de la
          salud.
        </div>
      </article>
    </div>
  );
}
