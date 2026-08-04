import { useCallback, useEffect, useState } from "react";

export type GuideProgress = {
  step: number;
  total: number;
  completed: boolean;
  updatedAt: number;
};

export type ProgressMap = Record<string, GuideProgress>;

const STORAGE_KEY = "ps-guide-progress";
const EVENT = "ps-guide-progress-change";

function read(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

function write(map: ProgressMap) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* almacenamiento no disponible */
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Lee todo el progreso guardado y se mantiene sincronizado entre pestañas y vistas. */
export function useAllGuideProgress() {
  const [map, setMap] = useState<ProgressMap>({});

  useEffect(() => {
    const sync = () => setMap(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return map;
}

/** Progreso de una guía concreta, con acciones para guardar o reiniciar. */
export function useGuideProgress(slug: string, total: number) {
  const all = useAllGuideProgress();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const progress = all[slug];

  const save = useCallback(
    (step: number, completed: boolean) => {
      const next = read();
      next[slug] = { step, total, completed, updatedAt: Date.now() };
      write(next);
    },
    [slug, total],
  );

  const reset = useCallback(() => {
    const next = read();
    delete next[slug];
    write(next);
  }, [slug]);

  return { progress, save, reset, hydrated };
}

export function progressPercent(p?: GuideProgress) {
  if (!p || !p.total) return 0;
  if (p.completed) return 100;
  return Math.round((p.step / p.total) * 100);
}
