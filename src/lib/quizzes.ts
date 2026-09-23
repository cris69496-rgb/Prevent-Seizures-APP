import { useEffect, useState } from "react";

export type QuizQuestion = { q: string; options: string[]; answer: number; explain: string };

export const quizzes: Record<string, { title: string; questions: QuizQuestion[] }> = {
  "que-es": {
    title: "¿Qué es una convulsión?",
    questions: [
      { q: "¿Qué causa una convulsión?", options: ["Falta de sueño únicamente", "Descargas eléctricas excesivas en neuronas", "Un problema del corazón"], answer: 1, explain: "Es el resultado de descargas eléctricas excesivas y sincronizadas en el cerebro." },
      { q: "Según los CDC, ¿cuántas personas tendrán una crisis en su vida?", options: ["1 de cada 10", "1 de cada 100", "1 de cada 1.000"], answer: 0, explain: "Aproximadamente 1 de cada 10 personas." },
      { q: "¿Cuántas personas viven con epilepsia en el mundo (OMS)?", options: ["5 millones", "50 millones", "500 millones"], answer: 1, explain: "Alrededor de 50 millones de personas." },
    ],
  },
  "tonico-clonica": {
    title: "Crisis tónico-clónica",
    questions: [
      { q: "¿Qué NO debes hacer durante la crisis?", options: ["Proteger la cabeza", "Poner algo en la boca", "Cronometrar"], answer: 1, explain: "Nunca pongas objetos en la boca: puede causar lesiones." },
      { q: "¿Cuándo llamar a emergencias?", options: ["Si dura más de 5 minutos", "Siempre a los 30 segundos", "Nunca"], answer: 0, explain: "Una crisis de más de 5 minutos es una emergencia." },
      { q: "Al terminar la crisis, ¿cómo colocar a la persona?", options: ["Boca arriba", "De lado (posición de recuperación)", "Sentada"], answer: 1, explain: "De lado para mantener la vía aérea libre." },
    ],
  },
  ausencia: {
    title: "Crisis de ausencia",
    questions: [
      { q: "¿Cuánto suele durar una ausencia?", options: ["Unos segundos", "10 minutos", "Una hora"], answer: 0, explain: "Normalmente duran pocos segundos." },
      { q: "¿En quién son más comunes?", options: ["Adultos mayores", "Niños", "Bebés recién nacidos"], answer: 1, explain: "Son más frecuentes en la infancia." },
      { q: "¿Cómo se ve una ausencia?", options: ["Mirada fija y desconexión breve", "Caída con sacudidas", "Gritos"], answer: 0, explain: "La persona parece 'desconectada' por un momento." },
    ],
  },
  focal: {
    title: "Crisis focales",
    questions: [
      { q: "¿Dónde se originan las crisis focales?", options: ["En ambos hemisferios", "En una zona del cerebro", "En la médula"], answer: 1, explain: "Comienzan en un área concreta del cerebro." },
      { q: "¿La persona siempre pierde la conciencia?", options: ["Sí, siempre", "No, puede estar consciente", "Solo de noche"], answer: 1, explain: "Pueden ser con o sin alteración de la conciencia." },
      { q: "¿Qué hacer si deambula confundida?", options: ["Sujetarla con fuerza", "Guiarla con calma lejos de peligros", "Dejarla sola"], answer: 1, explain: "Acompaña y aleja de peligros sin forzar." },
    ],
  },
  "no-epilepticas": {
    title: "Crisis no epilépticas",
    questions: [
      { q: "¿Las crisis no epilépticas son fingidas?", options: ["Sí", "No, son reales e involuntarias", "Solo a veces"], answer: 1, explain: "Son experiencias reales e involuntarias." },
      { q: "¿Qué prueba ayuda al diagnóstico?", options: ["Video-EEG", "Radiografía de tórax", "Análisis de orina"], answer: 0, explain: "El video-EEG es la prueba de referencia." },
      { q: "¿Cómo actuar durante el episodio?", options: ["Con los mismos primeros auxilios y calma", "Ignorar a la persona", "Echar agua"], answer: 0, explain: "Protege y acompaña igual que en cualquier crisis." },
    ],
  },
  febriles: {
    title: "Convulsiones febriles",
    questions: [
      { q: "¿A qué edades suelen ocurrir?", options: ["6 meses a 5 años", "10 a 15 años", "Adultos"], answer: 0, explain: "Típicamente entre los 6 meses y 5 años." },
      { q: "¿Una convulsión febril simple significa epilepsia?", options: ["Sí, siempre", "No, en la mayoría de casos no", "Solo en niñas"], answer: 1, explain: "La mayoría no desarrollan epilepsia." },
      { q: "¿Qué no hacer para bajar la fiebre?", options: ["Baños con alcohol o agua fría", "Consultar al médico", "Ropa ligera"], answer: 0, explain: "Evita alcohol o agua helada; consulta al médico." },
    ],
  },
  "vivir-con-epilepsia": {
    title: "Vivir con epilepsia",
    questions: [
      { q: "¿Qué ayuda a controlar las crisis?", options: ["Tomar la medicación a diario", "Saltarse dosis", "Dormir poco"], answer: 0, explain: "La adherencia al tratamiento es clave." },
      { q: "¿Qué proporción puede vivir sin crisis con tratamiento (OMS)?", options: ["Hasta 70%", "10%", "0%"], answer: 0, explain: "Hasta un 70% con el tratamiento adecuado." },
      { q: "Un desencadenante común es…", options: ["La falta de sueño", "Beber agua", "Caminar"], answer: 0, explain: "Dormir poco es un desencadenante frecuente." },
    ],
  },
  "plan-de-accion": {
    title: "Plan de acción",
    questions: [
      { q: "¿Qué incluye un plan de acción?", options: ["Qué hacer y a quién llamar", "Solo el nombre", "Nada importante"], answer: 0, explain: "Pasos, medicación de rescate y contactos." },
      { q: "¿Con quién compartirlo?", options: ["Familia, escuela y trabajo", "Con nadie", "Solo en redes sociales"], answer: 0, explain: "Con quienes pueden ayudar en una crisis." },
      { q: "¿Cada cuánto revisarlo?", options: ["Al menos una vez al año", "Nunca", "Cada 10 años"], answer: 0, explain: "Revísalo con el médico al menos cada año." },
    ],
  },
};

export type QuizResult = { score: number; total: number; date: string };
const KEY = "ps-quiz-results";
const EVT = "ps-quiz-updated";

function read(): Record<string, QuizResult> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveQuizResult(slug: string, score: number, total: number) {
  const all = read();
  const prev = all[slug];
  if (!prev || score >= prev.score) all[slug] = { score, total, date: new Date().toISOString() };
  localStorage.setItem(KEY, JSON.stringify(all));
  window.dispatchEvent(new Event(EVT));
}

export function useQuizResults() {
  const [results, setResults] = useState<Record<string, QuizResult>>({});
  useEffect(() => {
    const sync = () => setResults(read());
    sync();
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return results;
}
