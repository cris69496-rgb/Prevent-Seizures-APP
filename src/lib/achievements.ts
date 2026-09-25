import { useEffect, useState } from "react";

const KEY = "ps-achievements";
const EVENT = "ps-achievements-change";

export type AchievementState = { firstOpen?: string; sosViewed?: string; articles: string[] };

function read(): AchievementState {
  if (typeof window === "undefined") return { articles: [] };
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || "{}");
    return { articles: [], ...s };
  } catch {
    return { articles: [] };
  }
}

function update(fn: (s: AchievementState) => AchievementState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(fn(read())));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* sin almacenamiento */
  }
}

export const markFirstOpen = () =>
  update((s) => (s.firstOpen ? s : { ...s, firstOpen: new Date().toISOString() }));
export const markSosViewed = () =>
  update((s) => (s.sosViewed ? s : { ...s, sosViewed: new Date().toISOString() }));
export const markArticleRead = (slug: string) =>
  update((s) => (s.articles.includes(slug) ? s : { ...s, articles: [...s.articles, slug] }));

export function useAchievementState() {
  const [state, setState] = useState<AchievementState>({ articles: [] });
  useEffect(() => {
    const sync = () => setState(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return state;
}
