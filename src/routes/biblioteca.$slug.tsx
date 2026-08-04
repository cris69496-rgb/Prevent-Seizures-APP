import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";

type Source = { label: string; url: string };
type Article = {
  title: string;
  tag: string;
  minutes: number;
  intro: string;
  sections: { h: string; p: string; list?: string[] }[];
  sources: Source[];
};

const articles: Record<string, Article> = {
  "que-es": {
    title: "¿Qué es una convulsión?",
    tag: "Fundamentos",
    minutes: 5,
    intro:
      "Una crisis o convulsión es el resultado de descargas eléctricas excesivas y sincronizadas en un grupo de células cerebrales. Según la OMS, sus manifestaciones pueden ir desde un breve lapso de atención hasta convulsiones intensas y prolongadas.",
    sections: [
      {
        h: "Qué ocurre en el cerebro",
        p: "Las neuronas se comunican con impulsos eléctricos. Cuando un grupo de ellas se descarga de forma excesiva y sincronizada, aparece una crisis. La parte del cerebro donde se origina y hasta dónde se extiende determinan qué se ve por fuera: movimientos, sensaciones, emociones o pérdida de conciencia.",
      },
      {
        h: "Qué tan frecuentes son",
        p: "Los Centros para el Control y la Prevención de Enfermedades (CDC) estiman que aproximadamente 1 de cada 10 personas tendrá una crisis a lo largo de su vida. La OMS calcula que alrededor de 50 millones de personas en el mundo viven con epilepsia, lo que la convierte en una de las enfermedades neurológicas más comunes.",
      },
      {
        h: "Una crisis no es lo mismo que epilepsia",
        p: "La OMS señala que hasta el 10 % de la población tiene una crisis alguna vez, sin desarrollar epilepsia. La epilepsia se define, en términos generales, por la presencia de dos o más crisis no provocadas. El diagnóstico es clínico y corresponde a un profesional de la salud, apoyado en historia clínica, electroencefalograma (EEG) e imágenes.",
      },
      {
        h: "Cómo se clasifican",
        p: "La Liga Internacional contra la Epilepsia (ILAE), en su clasificación de 2017, agrupa las crisis según dónde comienzan:",
        list: [
          "De inicio focal: empiezan en una red de un solo hemisferio; pueden cursar con o sin alteración de la conciencia.",
          "De inicio generalizado: comprometen redes de ambos hemisferios desde el principio (por ejemplo, tónico-clónicas y de ausencia).",
          "De inicio desconocido: cuando no hay información suficiente para determinar el origen.",
        ],
      },
      {
        h: "Cuánto duran y qué pasa después",
        p: "La mayoría de las crisis terminan solas en pocos minutos. Después puede haber una fase postictal con confusión, somnolencia, dolor de cabeza o dolores musculares que dura de minutos a horas. Es normal que la persona no recuerde el episodio.",
      },
      {
        h: "Señal de alarma: 5 minutos",
        p: "El CDC indica que se debe cronometrar la crisis y buscar atención médica inmediata si dura más de 5 minutos. La ILAE define el estado epiléptico convulsivo a partir de los 5 minutos de actividad continua, por ser el punto donde la crisis difícilmente se detendrá sola.",
      },
      {
        h: "Desencadenantes frecuentes",
        p: "No todas las crisis tienen un desencadenante identificable, pero entre los más reportados están la falta de sueño, el olvido de la medicación, la fiebre o infecciones, el consumo o la abstinencia de alcohol, el estrés intenso y, en un pequeño grupo de personas, las luces intermitentes (epilepsia fotosensible).",
      },
    ],
    sources: [
      { label: "OMS — Nota descriptiva: Epilepsia", url: "https://www.who.int/es/news-room/fact-sheets/detail/epilepsy" },
      { label: "CDC — Primeros auxilios en convulsiones", url: "https://www.cdc.gov/epilepsy/first-aid-for-seizures/index.html" },
      { label: "ILAE — Clasificación de los tipos de crisis (2017)", url: "https://www.ilae.org/guidelines/definition-and-classification/the-2017-ilae-classification-of-seizures" },
    ],
  },

  "tonico-clonica": {
    title: "Crisis tónico-clónica generalizada",
    tag: "Epiléptica",
    minutes: 6,
    intro:
      "Es el tipo de crisis más reconocible. Antes se llamaba «gran mal». Suele durar entre 1 y 3 minutos y, aunque impresiona, en la mayoría de los casos termina sola.",
    sections: [
      {
        h: "Fase tónica",
        p: "Los músculos se ponen rígidos, la persona pierde la conciencia y cae. Puede emitir un sonido gutural al salir el aire de los pulmones y adquirir un tono azulado alrededor de los labios por unos segundos. Dura habitualmente entre 10 y 20 segundos.",
      },
      {
        h: "Fase clónica",
        p: "Aparecen sacudidas rítmicas de brazos y piernas que se van espaciando hasta detenerse. Puede haber mordedura de lengua o mejilla, salivación abundante y pérdida del control de esfínteres. Suele durar de 30 segundos a 2 minutos.",
      },
      {
        h: "Fase postictal",
        p: "Al terminar, la respiración se normaliza y la persona queda somnolienta, confusa o con dolor de cabeza y muscular durante minutos u horas. Acompáñala hasta que esté completamente orientada y explícale con calma lo que pasó.",
      },
      {
        h: "Qué hacer (protocolo CDC)",
        p: "Los pasos recomendados por el CDC para una crisis generalizada son:",
        list: [
          "Mantén la calma y quédate con la persona; cronometra la crisis desde el inicio.",
          "Ayúdala a bajar al suelo si está cayendo y aparta objetos duros o filosos.",
          "Colócala de lado, con la boca hacia el suelo, para mantener la vía aérea libre.",
          "Pon algo blando y plano bajo su cabeza y retírale las gafas.",
          "Afloja la ropa o cualquier cosa alrededor del cuello que dificulte respirar.",
          "Al terminar, ayúdala a sentarse en un lugar seguro y quédate hasta que esté alerta.",
        ],
      },
      {
        h: "Qué NO hacer",
        p: "El CDC es explícito: no sujetes ni intentes frenar los movimientos, no pongas nada en la boca (es imposible tragarse la lengua y se pueden causar lesiones dentales o de mandíbula), no intentes reanimación boca a boca durante la crisis y no des agua, alimentos ni medicamentos por vía oral hasta que la persona esté completamente despierta.",
      },
      {
        h: "Cuándo llamar a emergencias",
        p: "Llama al número local de emergencias (123 en Colombia, 911 en EE. UU.) si:",
        list: [
          "La crisis dura más de 5 minutos.",
          "Ocurre una segunda crisis sin que la persona recupere la conciencia entre ellas.",
          "La persona no recupera la conciencia o la respiración normal después.",
          "La crisis ocurre dentro del agua.",
          "Hay lesión, embarazo, diabetes u otra enfermedad de base.",
          "Es la primera crisis conocida de esa persona.",
        ],
      },
    ],
    sources: [
      { label: "CDC — Primeros auxilios en convulsiones", url: "https://www.cdc.gov/epilepsy/first-aid-for-seizures/index.html" },
      { label: "Epilepsy Foundation — Tonic-clonic seizures", url: "https://www.epilepsy.com/what-is-epilepsy/seizure-types/tonic-clonic-seizures" },
      { label: "ILAE — Definición de estado epiléptico (2015)", url: "https://www.ilae.org/guidelines/definition-and-classification/status-epilepticus-definition-2015" },
    ],
  },

  ausencia: {
    title: "Crisis de ausencia",
    tag: "Epiléptica",
    minutes: 4,
    intro:
      "Son crisis generalizadas muy breves que se confunden con distracción o «estar en las nubes». Aparecen sobre todo en la infancia y pueden repetirse muchas veces al día.",
    sections: [
      {
        h: "Cómo se ven",
        p: "La persona interrumpe de golpe lo que está haciendo, queda con la mirada fija y no responde. Las ausencias típicas duran habitualmente menos de 15 segundos —muchas veces menos de 10— y terminan de forma igual de brusca, retomando la actividad sin recordar el episodio.",
      },
      {
        h: "Automatismos",
        p: "Pueden acompañarse de parpadeo rápido, chasqueo de labios, pequeños movimientos de las manos o de la cabeza. No hay caída ni sacudidas intensas, y no existe la confusión prolongada típica de otras crisis.",
      },
      {
        h: "A quién afectan",
        p: "La epilepsia de ausencia infantil suele iniciarse entre los 4 y los 10 años. Muchos niños dejan de tener ausencias en la adolescencia. Como pasan desapercibidas, con frecuencia se detectan primero en el colegio, cuando el rendimiento baja o el docente nota «desconexiones» repetidas.",
      },
      {
        h: "Qué hacer",
        p: "Normalmente no requieren primeros auxilios. Acompaña a la persona, evita que quede en una situación de riesgo (cruzar la calle, escaleras, agua) y, cuando termine, retoma la conversación con naturalidad sin dramatizar. Anota la hora, la duración y cuántas veces ocurre: ese registro es muy útil para el neurólogo.",
      },
      {
        h: "Cuándo consultar",
        p: "Si es la primera vez que se observan estos episodios, si aumentan en frecuencia o si se acompañan de caídas o sacudidas, se debe consultar al médico. El diagnóstico se apoya en el EEG, donde las ausencias típicas muestran un patrón característico de punta-onda a 3 Hz.",
      },
    ],
    sources: [
      { label: "Epilepsy Foundation — Absence seizures", url: "https://www.epilepsy.com/what-is-epilepsy/seizure-types/absence-seizures" },
      { label: "NINDS — Epilepsy and seizures", url: "https://www.ninds.nih.gov/health-information/disorders/epilepsy-and-seizures" },
      { label: "ILAE — Childhood absence epilepsy", url: "https://www.epilepsydiagnosis.org/syndrome/cae-overview.html" },
    ],
  },

  focal: {
    title: "Crisis focales",
    tag: "Epiléptica",
    minutes: 5,
    intro:
      "Comienzan en una red de neuronas de un solo hemisferio cerebral. Antes se llamaban crisis «parciales». Son el tipo más frecuente en adultos y sus síntomas dependen de la zona donde se originan.",
    sections: [
      {
        h: "Con conciencia conservada",
        p: "La persona está despierta y consciente de lo que ocurre, aunque no pueda controlarlo. Puede sentir hormigueo, olores o sabores extraños, déjà vu, miedo súbito, náuseas o presentar sacudidas en una mano o en un lado de la cara. Este tipo de crisis es lo que muchas personas describen como «aura».",
      },
      {
        h: "Con alteración de la conciencia",
        p: "La persona parece despierta pero no responde con normalidad. Puede mirar fijamente, repetir gestos automáticos (chasquear labios, frotarse las manos, manipular la ropa), caminar sin rumbo o murmurar. No recordará el episodio y quedará confusa durante varios minutos.",
      },
      {
        h: "Pueden evolucionar",
        p: "Una crisis focal puede propagarse a ambos hemisferios y convertirse en una crisis tónico-clónica bilateral. Si esto ocurre, aplica el protocolo de la crisis tónico-clónica y cronometra desde el inicio.",
      },
      {
        h: "Qué hacer",
        p: "El acompañamiento es la principal ayuda:",
        list: [
          "Quédate con la persona y habla con voz suave y tranquila.",
          "No la sujetes ni intentes detener sus movimientos automáticos; puede reaccionar con agitación.",
          "Guíala con delicadeza lejos de peligros (tráfico, escaleras, fuego, agua).",
          "Cronometra el episodio y observa cómo empieza y cómo termina.",
          "Cuando recupere la conciencia, explícale lo que pasó y quédate hasta que esté orientada.",
        ],
      },
      {
        h: "Cuándo llamar a emergencias",
        p: "Si dura más de 5 minutos, si se repite sin recuperación, si la persona sufre una lesión, si es su primera crisis o si evoluciona a una crisis convulsiva bilateral.",
      },
    ],
    sources: [
      { label: "Epilepsy Foundation — Focal onset seizures", url: "https://www.epilepsy.com/what-is-epilepsy/seizure-types/focal-onset-aware-seizures" },
      { label: "ILAE — Clasificación de los tipos de crisis (2017)", url: "https://www.ilae.org/guidelines/definition-and-classification/the-2017-ilae-classification-of-seizures" },
      { label: "CDC — Tipos de convulsiones", url: "https://www.cdc.gov/epilepsy/about/types-of-seizures.html" },
    ],
  },

  "no-epilepticas": {
    title: "Crisis no epilépticas psicógenas (CNEP)",
    tag: "No epiléptica",
    minutes: 6,
    intro:
      "Se parecen a las crisis epilépticas, pero no las causa una descarga eléctrica anormal. Son un trastorno neurológico funcional real y reconocido, no algo fingido ni voluntario.",
    sections: [
      {
        h: "Qué son",
        p: "Las crisis no epilépticas psicógenas (CNEP, o PNES por sus siglas en inglés) son episodios paroxísticos de origen psicológico. No hay actividad epiléptica en el electroencefalograma durante el evento, por lo que no responden a los fármacos antiepilépticos.",
      },
      {
        h: "Qué tan frecuentes son",
        p: "La ILAE señala que entre el 20 % y el 30 % de las personas evaluadas en centros especializados por crisis resistentes al tratamiento tienen en realidad CNEP. También son comunes en personas que además tienen epilepsia, lo que hace el diagnóstico especialmente delicado.",
      },
      {
        h: "Cómo se diagnostican",
        p: "El estándar de referencia es el video-EEG prolongado, que registra simultáneamente el comportamiento y la actividad eléctrica cerebral durante un episodio. El diagnóstico solo puede darlo un equipo médico especializado: no se puede determinar por la apariencia del episodio.",
      },
      {
        h: "Qué hacer durante un episodio",
        p: "Ante la duda, la seguridad va primero. Si no sabes con certeza qué tipo de crisis es, aplica los primeros auxilios generales para convulsiones.",
        list: [
          "Mantén la calma y quédate con la persona.",
          "Retira objetos peligrosos y protege la cabeza.",
          "Reduce estímulos: pide a los curiosos que se retiren y baja el ruido.",
          "Habla con voz suave y frases cortas, recordándole que está a salvo.",
          "No la sujetes, no la sacudas ni le grites; no pongas nada en su boca.",
          "Quédate hasta que se recupere y ofrécele privacidad al terminar.",
        ],
      },
      {
        h: "Tratamiento",
        p: "El abordaje principal es la psicoterapia; la terapia cognitivo-conductual adaptada a CNEP cuenta con la mejor evidencia disponible. Recibir el diagnóstico explicado con claridad y sin estigma es en sí mismo parte del tratamiento.",
      },
    ],
    sources: [
      { label: "ILAE — Psychogenic nonepileptic seizures", url: "https://www.ilae.org/patient-care/psychogenic-nonepileptic-seizures" },
      { label: "Epilepsy Foundation — Nonepileptic seizures", url: "https://www.epilepsy.com/what-is-epilepsy/types-epilepsy-syndromes/nonepileptic-seizures" },
      { label: "FND Hope — Functional seizures", url: "https://fndhope.org/fnd-guide/types-of-fnd/functional-seizures-dissociative-seizures/" },
    ],
  },

  febriles: {
    title: "Convulsiones febriles",
    tag: "Pediátrica",
    minutes: 5,
    intro:
      "Son crisis desencadenadas por fiebre en niños pequeños sanos. Aunque para las familias resultan aterradoras, la gran mayoría son benignas y no dejan secuelas.",
    sections: [
      {
        h: "A quién afectan",
        p: "Ocurren típicamente entre los 6 meses y los 5 años de edad, con un pico alrededor de los 12 a 18 meses. El NINDS estima que afectan a entre el 2 % y el 5 % de los niños. Suelen aparecer el primer día de la enfermedad febril, a veces antes de que la familia note la fiebre.",
      },
      {
        h: "Simples y complejas",
        p: "Distinguirlas ayuda a saber qué esperar:",
        list: [
          "Simples: generalizadas, duran menos de 15 minutos y no se repiten en 24 horas. Son la gran mayoría.",
          "Complejas: duran más de 15 minutos, son focales o se repiten dentro de las mismas 24 horas. Requieren evaluación médica más detallada.",
        ],
      },
      {
        h: "Qué hacer",
        p: "Los pasos son los mismos de cualquier convulsión, adaptados a un niño pequeño:",
        list: [
          "Coloca al niño de lado sobre una superficie plana y segura, lejos de muebles y escaleras.",
          "Cronometra desde el inicio.",
          "No lo sujetes ni le pongas nada en la boca; no lo metas en agua fría ni en la bañera.",
          "Afloja la ropa apretada y retira objetos cercanos.",
          "Quédate con él y observa cómo se comporta la crisis para poder describirla al médico.",
        ],
      },
      {
        h: "Cuándo llamar a emergencias",
        p: "Llama de inmediato si la crisis dura más de 5 minutos, si el niño tiene dificultad para respirar o color azulado, si no despierta después, si presenta rigidez de cuello, vómito persistente o somnolencia extrema, o si es su primera convulsión febril.",
      },
      {
        h: "Lo que conviene saber",
        p: "Los antipiréticos alivian el malestar, pero la evidencia no muestra que prevengan las convulsiones febriles. Alrededor de un tercio de los niños que tienen una tendrá otra en episodios febriles posteriores. Aun así, la mayoría no desarrolla epilepsia: el riesgo a largo plazo es solo ligeramente mayor que el de la población general. Toda primera convulsión febril debe ser evaluada por un médico para descartar infecciones graves como la meningitis.",
      },
    ],
    sources: [
      { label: "NINDS — Febrile seizures", url: "https://www.ninds.nih.gov/health-information/disorders/febrile-seizures" },
      { label: "American Academy of Pediatrics — Febrile seizures", url: "https://www.healthychildren.org/English/health-issues/conditions/head-neck-nervous-system/Pages/Febrile-Seizures.aspx" },
      { label: "CDC — Primeros auxilios en convulsiones", url: "https://www.cdc.gov/epilepsy/first-aid-for-seizures/index.html" },
    ],
  },

  "vivir-con-epilepsia": {
    title: "Vivir con epilepsia: mitos y datos",
    tag: "Fundamentos",
    minutes: 5,
    intro:
      "El estigma sigue siendo, según la OMS, una de las mayores cargas para las personas con epilepsia y sus familias. Desmontar mitos con datos verificables es parte de los primeros auxilios.",
    sections: [
      {
        h: "Mito: «hay que sujetar a la persona»",
        p: "Falso y peligroso. El CDC recomienda no restringir los movimientos: sujetar puede causar lesiones musculares o articulares tanto a la persona como a quien ayuda. La crisis seguirá su curso igualmente.",
      },
      {
        h: "Mito: «se puede tragar la lengua»",
        p: "Anatómicamente imposible. Introducir dedos u objetos en la boca puede provocar fracturas dentales, heridas o atragantamiento. El CDC lo desaconseja de forma expresa.",
      },
      {
        h: "Mito: «la epilepsia es contagiosa»",
        p: "No lo es. La OMS la define como una enfermedad crónica no transmisible del cerebro y señala que la creencia contraria alimenta la discriminación en muchos países.",
      },
      {
        h: "Mito: «no tiene tratamiento»",
        p: "La OMS estima que hasta el 70 % de las personas con epilepsia podrían vivir sin crisis con un diagnóstico y tratamiento adecuados. El problema principal es la brecha de acceso: tres cuartas partes de las personas con epilepsia en países de ingresos bajos no reciben el tratamiento que necesitan.",
      },
      {
        h: "Mito: «todas las crisis son convulsivas»",
        p: "El CDC recuerda que muchas crisis no se ven como uno espera: algunas solo provocan confusión, mirada fija o movimientos automáticos. Reconocerlas evita que pasen desapercibidas.",
      },
      {
        h: "Cómo ayudar de verdad",
        p: "Aprende el protocolo de primeros auxilios, cronometra siempre, respeta la privacidad de la persona al terminar, no la trates como incapaz y evita difundir o grabar el episodio sin su consentimiento.",
      },
    ],
    sources: [
      { label: "OMS — Nota descriptiva: Epilepsia", url: "https://www.who.int/es/news-room/fact-sheets/detail/epilepsy" },
      { label: "CDC — Primeros auxilios en convulsiones", url: "https://www.cdc.gov/epilepsy/first-aid-for-seizures/index.html" },
      { label: "IBE — International Bureau for Epilepsy", url: "https://www.ibe-epilepsy.org/" },
    ],
  },

  "plan-de-accion": {
    title: "Plan de acción ante convulsiones",
    tag: "Cuidadores",
    minutes: 5,
    intro:
      "Un plan de acción es un documento breve, acordado con el médico tratante, que indica a cualquier persona qué hacer cuando ocurre una crisis. Organizaciones como Epilepsy Foundation lo recomiendan para el colegio, el trabajo y el hogar.",
    sections: [
      {
        h: "Qué debe incluir",
        p: "Un buen plan cabe en una hoja y responde a lo esencial:",
        list: [
          "Datos de la persona y contactos de emergencia.",
          "Cómo son sus crisis habituales y cuánto suelen durar.",
          "Qué hacer paso a paso y qué NO hacer.",
          "Medicación diaria y, si existe, medicación de rescate con dosis e indicaciones exactas.",
          "Cuándo llamar a emergencias (por defecto, más de 5 minutos).",
          "Qué hacer después: reposo, a quién avisar, cuándo puede volver a su actividad.",
        ],
      },
      {
        h: "Registrar cada crisis",
        p: "Llevar un diario de crisis mejora las decisiones clínicas. Anota fecha y hora de inicio, duración cronometrada, qué estaba haciendo la persona, cómo empezó y terminó el episodio, y posibles desencadenantes como falta de sueño, olvido de la dosis, fiebre o estrés.",
      },
      {
        h: "Preparar el entorno",
        p: "Reduce riesgos sin restringir la vida diaria: proteger esquinas duras en la habitación, evitar bañarse con la puerta cerrada con seguro, preferir la ducha a la bañera, no nadar sin compañía y usar identificación médica visible.",
      },
      {
        h: "Después de una crisis",
        p: "Coloca a la persona de lado hasta que esté completamente alerta, no ofrezcas líquidos ni medicamentos por boca antes, permítele descansar y describe lo ocurrido con hechos observables (duración, movimientos, color, recuperación). Esa descripción vale más que cualquier suposición.",
      },
      {
        h: "Aviso importante",
        p: "Esta guía es educativa y no sustituye la valoración médica. El plan de acción y cualquier medicación de rescate deben ser definidos y firmados por el médico tratante de la persona.",
      },
    ],
    sources: [
      { label: "Epilepsy Foundation — Seizure action plans", url: "https://www.epilepsy.com/preparedness-safety/seizure-action-plans" },
      { label: "CDC — Managing epilepsy", url: "https://www.cdc.gov/epilepsy/managing-epilepsy/index.html" },
      { label: "OMS — Nota descriptiva: Epilepsia", url: "https://www.who.int/es/news-room/fact-sheets/detail/epilepsy" },
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
            { title: `${loaderData.title} — Prevent Seizures S.A.S.` },
            { name: "description", content: loaderData.intro.slice(0, 155) },
            { property: "og:title", content: loaderData.title },
            { property: "og:description", content: loaderData.intro.slice(0, 155) },
            { property: "og:type", content: "article" },
            { name: "twitter:card", content: "summary" },
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
  component: ArticleView,
});

function ArticleView() {
  const a = Route.useLoaderData();
  return (
    <div className="mx-auto min-h-screen w-full max-w-md bg-background pb-16">
      <header
        className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 text-white"
        style={{ background: "var(--gradient-brand)" }}
      >
        <Link
          to="/biblioteca"
          aria-label="Volver a la biblioteca"
          className="grid h-9 w-9 place-items-center rounded-full bg-white/15"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <p className="text-sm font-semibold">Biblioteca</p>
      </header>

      <article className="px-5 pt-6">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-ink">
            {a.tag}
          </span>
          <span className="text-[11px] text-muted-foreground">{a.minutes} min lectura</span>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold text-foreground">{a.title}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{a.intro}</p>

        <div className="mt-7 space-y-6">
          {a.sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-sm font-bold uppercase tracking-wider text-brand">{s.h}</h2>
              <p className="mt-1.5 text-[15px] leading-relaxed text-foreground/90">{s.p}</p>
              {s.list ? (
                <ul className="mt-3 space-y-2">
                  {s.list.map((li, j) => (
                    <li key={j} className="flex gap-2.5 text-[15px] leading-relaxed text-foreground/90">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <section className="mt-10">
          <h2 className="text-sm font-bold uppercase tracking-wider text-brand">Fuentes</h2>
          <ul className="mt-2 space-y-2">
            {a.sources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-1.5 text-sm text-brand underline underline-offset-2"
                >
                  <span>{s.label}</span>
                  <ExternalLink aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-8 rounded-2xl bg-secondary p-5 text-sm text-muted-foreground">
          Contenido educativo basado en fuentes oficiales (OMS, CDC, ILAE, NINDS). No sustituye el
          consejo, diagnóstico ni tratamiento de un profesional de la salud.
        </div>
      </article>
    </div>
  );
}
