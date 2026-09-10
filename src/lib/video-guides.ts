export type SceneVariant =
  | "clock"
  | "cushion"
  | "clear"
  | "side"
  | "no-restrain"
  | "no-mouth"
  | "call"
  | "street"
  | "fever"
  | "recovery"
  | "notes";

export type GuideStep = {
  title: string;
  detail: string;
  scene: SceneVariant;
  seconds: number;
};

export type GuideVideo = {
  youtubeId: string;
  title: string;
  channel: string;
};

export type VideoGuide = {
  slug: string;
  title: string;
  tag: string;
  duration: string;
  summary: string;
  video: GuideVideo;
  steps: GuideStep[];
  sources: { label: string; url: string }[];
};

export const videoGuides: VideoGuide[] = [
  {
    slug: "posicion-de-seguridad",
    title: "Posición de seguridad paso a paso",
    tag: "Técnica",
    duration: "2:14",
    summary:
      "La secuencia completa para colocar a la persona de lado una vez que los movimientos ceden.",
    video: {
      youtubeId: "cLA-g8mWal4",
      title: "Primeros Auxilios: Posición Lateral de Seguridad",
      channel: "Cruz Roja",
    },
    steps: [
      {
        title: "Cronometra desde el primer segundo",
        detail:
          "Mira el reloj en cuanto empiece la crisis. Si supera los 5 minutos, es una emergencia médica.",
        scene: "clock",
        seconds: 8,
      },
      {
        title: "Despeja el área",
        detail:
          "Retira muebles, objetos duros y gafas. Pide espacio a las personas alrededor.",
        scene: "clear",
        seconds: 8,
      },
      {
        title: "Protege la cabeza",
        detail:
          "Coloca algo blando y plano debajo de la cabeza: una chaqueta doblada o un cojín.",
        scene: "cushion",
        seconds: 8,
      },
      {
        title: "Gírala de lado",
        detail:
          "Cuando los movimientos cedan, colócala sobre un costado con la cabeza ligeramente inclinada hacia abajo para que la saliva drene.",
        scene: "side",
        seconds: 10,
      },
      {
        title: "Acompaña hasta que se recupere",
        detail:
          "Quédate a su lado, habla con calma y no la dejes sola hasta que esté totalmente orientada.",
        scene: "recovery",
        seconds: 8,
      },
    ],
    sources: [
      { label: "CDC — Seizure First Aid", url: "https://www.cdc.gov/epilepsy/about/first-aid.html" },
    ],
  },
  {
    slug: "en-la-calle",
    title: "Qué hacer si ocurre en la calle",
    tag: "Escenario",
    duration: "3:02",
    summary: "Cómo asegurar el entorno y pedir ayuda cuando la crisis ocurre en un espacio público.",
    video: {
      youtubeId: "7MPJauo4DdY",
      title: "How to help someone who is having a seizure",
      channel: "British Red Cross",
    },
    steps: [
      {
        title: "Asegura el entorno primero",
        detail:
          "Aleja el tráfico, las escaleras o el agua. Si es posible, pide a alguien que señalice la zona.",
        scene: "street",
        seconds: 9,
      },
      {
        title: "Cronometra y observa",
        detail:
          "Anota la hora de inicio y qué partes del cuerpo se mueven; es información clave para el personal médico.",
        scene: "clock",
        seconds: 8,
      },
      {
        title: "Protege la cabeza en el suelo",
        detail: "Usa una mochila o prenda doblada. No intentes levantar ni trasladar a la persona.",
        scene: "cushion",
        seconds: 8,
      },
      {
        title: "Llama al 123 si hace falta",
        detail:
          "Llama si dura más de 5 minutos, si hay una segunda crisis seguida, si no recupera la conciencia, si hay lesión o si es la primera vez.",
        scene: "call",
        seconds: 10,
      },
      {
        title: "Posición lateral y compañía",
        detail:
          "Al cesar los movimientos, colócala de lado y quédate hasta que llegue la ayuda o esté orientada.",
        scene: "side",
        seconds: 9,
      },
    ],
    sources: [
      { label: "Epilepsy Foundation — First Aid", url: "https://www.epilepsy.com/recognition/seizure-first-aid" },
    ],
  },
  {
    slug: "convulsion-febril",
    title: "Convulsión febril en niños",
    tag: "Pediátrica",
    duration: "2:45",
    summary:
      "Afecta al 2–5 % de los niños entre 6 meses y 5 años. La mayoría son benignas y ceden solas.",
    video: {
      youtubeId: "K8qVm9Qe6e8",
      title: "Convulsiones febriles, ¿cómo actuar si tu peque las sufre?",
      channel: "Pediatría",
    },
    steps: [
      {
        title: "Mantén la calma y cronometra",
        detail:
          "Una convulsión febril simple dura menos de 15 minutos y no se repite en 24 horas.",
        scene: "clock",
        seconds: 8,
      },
      {
        title: "Acuéstalo en una superficie segura",
        detail: "En el suelo, lejos de bordes y objetos duros. Afloja la ropa del cuello.",
        scene: "clear",
        seconds: 8,
      },
      {
        title: "Colócalo de lado",
        detail: "De costado para mantener la vía aérea libre. Nunca metas nada en su boca.",
        scene: "side",
        seconds: 9,
      },
      {
        title: "No lo sumerjas en agua fría",
        detail:
          "No uses baños de agua fría ni alcohol. Baja la fiebre después, siguiendo indicación médica.",
        scene: "fever",
        seconds: 9,
      },
      {
        title: "Consulta siempre después",
        detail:
          "Llama a emergencias si dura más de 5 minutos, si el niño tiene menos de 6 meses o si no despierta con normalidad.",
        scene: "call",
        seconds: 9,
      },
    ],
    sources: [
      { label: "NINDS — Febrile Seizures", url: "https://www.ninds.nih.gov/health-information/disorders/febrile-seizures" },
    ],
  },
  {
    slug: "despues-del-episodio",
    title: "Después del episodio: cómo acompañar",
    tag: "Cuidado",
    duration: "1:58",
    summary: "La fase postictal puede durar de minutos a horas. Así se acompaña sin agobiar.",
    video: {
      youtubeId: "z4aeCWYx4r0",
      title: "Una crisis en el cole",
      channel: "Divulgación sobre epilepsia",
    },
    steps: [
      {
        title: "Habla con frases cortas y calmadas",
        detail: "Preséntate, di dónde está y qué pasó. Repite si hace falta, sin prisa.",
        scene: "recovery",
        seconds: 8,
      },
      {
        title: "Mantén la posición lateral",
        detail: "Hasta que respire con normalidad y recupere la conciencia por completo.",
        scene: "side",
        seconds: 8,
      },
      {
        title: "Ofrece intimidad y comodidad",
        detail:
          "Aparta a los curiosos, limpia la saliva y ayúdale a recolocar la ropa. Puede sentir vergüenza o confusión.",
        scene: "clear",
        seconds: 8,
      },
      {
        title: "Nada de comida ni bebida aún",
        detail: "Espera a que esté completamente despierta antes de ofrecer agua o medicación oral.",
        scene: "no-mouth",
        seconds: 8,
      },
      {
        title: "Registra lo ocurrido",
        detail:
          "Duración, tipo de movimientos, lesiones y tiempo de recuperación. Sirve para el control médico.",
        scene: "notes",
        seconds: 8,
      },
    ],
    sources: [
      { label: "CDC — Seizure First Aid", url: "https://www.cdc.gov/epilepsy/about/first-aid.html" },
    ],
  },
  {
    slug: "errores-comunes",
    title: "Errores comunes que debes evitar",
    tag: "Mitos",
    duration: "2:30",
    summary: "Cuatro acciones frecuentes que hacen daño y qué hacer en su lugar.",
    video: {
      youtubeId: "KA-Iubhnzr0",
      title: "Conocer la epilepsia nos hace iguales",
      channel: "Vídeo educativo",
    },
    steps: [
      {
        title: "No sujetes los movimientos",
        detail:
          "Inmovilizar puede causar luxaciones y fracturas, y no detiene la crisis. Solo protege el entorno.",
        scene: "no-restrain",
        seconds: 9,
      },
      {
        title: "No metas nada en la boca",
        detail:
          "Es imposible tragarse la lengua. Un objeto en la boca puede romper dientes u obstruir la vía aérea.",
        scene: "no-mouth",
        seconds: 9,
      },
      {
        title: "No intentes reanimación si respira",
        detail:
          "La respiración puede verse irregular durante la crisis. Solo inicia RCP si no respira al terminar.",
        scene: "recovery",
        seconds: 8,
      },
      {
        title: "No la dejes sola ni te vayas",
        detail: "Quédate hasta que esté orientada; la confusión postictal puede llevar a accidentes.",
        scene: "clear",
        seconds: 8,
      },
    ],
    sources: [
      { label: "OMS — Epilepsia", url: "https://www.who.int/es/news-room/fact-sheets/detail/epilepsy" },
    ],
  },
  {
    slug: "cronometrar-y-documentar",
    title: "Cómo cronometrar y documentar la crisis",
    tag: "Registro",
    duration: "1:40",
    summary: "Un buen registro cambia el tratamiento. Esto es lo mínimo que debes anotar.",
    video: {
      youtubeId: "0xtz3wgYSIQ",
      title: "Estado epiléptico: abordaje y manejo inicial",
      channel: "TecSalud",
    },
    steps: [
      {
        title: "Hora de inicio y de fin",
        detail: "Usa el reloj del teléfono. Los 5 minutos marcan el umbral de emergencia.",
        scene: "clock",
        seconds: 8,
      },
      {
        title: "Describe qué viste",
        detail:
          "Qué parte del cuerpo empezó, si hubo pérdida de conciencia, desviación de la mirada o rigidez.",
        scene: "notes",
        seconds: 9,
      },
      {
        title: "Anota el contexto",
        detail:
          "Sueño, fiebre, olvido de medicación, estrés o luces intermitentes son desencadenantes frecuentes.",
        scene: "fever",
        seconds: 8,
      },
      {
        title: "Registra la recuperación",
        detail: "Cuánto tardó en responder, si hubo lesiones y si necesitó dormir después.",
        scene: "recovery",
        seconds: 8,
      },
    ],
    sources: [
      { label: "Epilepsy Foundation — Seizure Diary", url: "https://www.epilepsy.com/manage/tracking-seizures" },
    ],
  },
];

export function getGuide(slug: string) {
  return videoGuides.find((g) => g.slug === slug);
}
