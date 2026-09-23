import { useState } from "react";
import { CheckCircle2, RotateCcw, Trophy, XCircle } from "lucide-react";
import { quizzes, saveQuizResult } from "@/lib/quizzes";

export function Quiz({ slug }: { slug: string }) {
  const quiz = quizzes[slug];
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  if (!quiz) return null;
  const q = quiz.questions[i];
  const total = quiz.questions.length;

  const choose = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (i + 1 >= total) {
      saveQuizResult(slug, score, total);
      setDone(true);
    } else {
      setI(i + 1);
      setPicked(null);
    }
  };
  const restart = () => {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  return (
    <section className="mt-10 rounded-2xl border border-border bg-card p-5 shadow-sm" aria-live="polite">
      <p className="text-xs font-bold uppercase tracking-wider text-brand">Trivia</p>
      {done ? (
        <div className="mt-3 text-center">
          <Trophy className="mx-auto h-10 w-10 text-brand" />
          <p className="mt-2 text-xl font-extrabold text-foreground">
            {score}/{total} correctas
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {score === total ? "¡Excelente! Dominas este tema." : "Buen intento. Repasa y vuelve a intentarlo."}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Guardado en tu Progreso.</p>
          <button onClick={restart} className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-brand">
            <RotateCcw className="h-4 w-4" /> Repetir
          </button>
        </div>
      ) : (
        <>
          <p className="mt-1 text-xs text-muted-foreground">Pregunta {i + 1} de {total}</p>
          <p className="mt-2 text-base font-semibold text-foreground">{q.q}</p>
          <div className="mt-3 space-y-2">
            {q.options.map((o, idx) => {
              const state = picked === null ? "" : idx === q.answer ? "border-brand bg-secondary" : idx === picked ? "border-destructive bg-destructive/10" : "opacity-60";
              return (
                <button key={idx} onClick={() => choose(idx)} disabled={picked !== null} className={`flex w-full items-center justify-between gap-2 rounded-xl border border-border px-4 py-3 text-left text-sm text-foreground transition ${state}`}>
                  <span>{o}</span>
                  {picked !== null && idx === q.answer && <CheckCircle2 className="h-4 w-4 shrink-0 text-brand" />}
                  {picked === idx && idx !== q.answer && <XCircle className="h-4 w-4 shrink-0 text-destructive" />}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <>
              <p className="mt-3 text-sm text-muted-foreground">{q.explain}</p>
              <button onClick={next} className="mt-4 w-full rounded-full py-3 text-sm font-semibold text-primary-foreground" style={{ background: "var(--gradient-brand)" }}>
                {i + 1 >= total ? "Ver resultado" : "Siguiente"}
              </button>
            </>
          )}
        </>
      )}
    </section>
  );
}
