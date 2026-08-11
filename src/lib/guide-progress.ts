import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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

async function currentUserId(): Promise<string | null> {
  try {
    const { data } = await supabase.auth.getSession();
    return data.session?.user.id ?? null;
  } catch {
    return null;
  }
}

/** Sube un marcador a la nube (silencioso si no hay sesión o no hay red). */
async function pushRemote(slug: string, p: GuideProgress) {
  const userId = await currentUserId();
  if (!userId) return;
  try {
    await supabase.from("guide_progress").upsert(
      {
        user_id: userId,
        slug,
        step: p.step,
        total: p.total,
        completed: p.completed,
        updated_at: new Date(p.updatedAt).toISOString(),
      },
      { onConflict: "user_id,slug" },
    );
  } catch {
    /* sin conexión: el progreso local se conserva */
  }
}

/** Descarga el progreso de la nube y lo fusiona con el local (gana el más reciente). */
async function pullRemote() {
  const userId = await currentUserId();
  if (!userId) return;
  try {
    const { data } = await supabase
      .from("guide_progress")
      .select("slug, step, total, completed, updated_at")
      .eq("user_id", userId);
    if (!data) return;

    const local = read();
    let changed = false;
    const toPush: [string, GuideProgress][] = [];

    for (const row of data) {
      const remote: GuideProgress = {
        step: row.step,
        total: row.total,
        completed: row.completed,
        updatedAt: new Date(row.updated_at).getTime(),
      };
      const mine = local[row.slug];
      if (!mine || mine.updatedAt < remote.updatedAt) {
        local[row.slug] = remote;
        changed = true;
      }
    }

    // Marcadores locales que aún no existen en la nube.
    const remoteSlugs = new Set(data.map((r) => r.slug));
    for (const [slug, p] of Object.entries(local)) {
      if (!remoteSlugs.has(slug)) toPush.push([slug, p]);
    }

    if (changed) write(local);
    for (const [slug, p] of toPush) await pushRemote(slug, p);
  } catch {
    /* sin conexión */
  }
}

/** Lee todo el progreso guardado y se mantiene sincronizado entre pestañas, vistas y la nube. */
export function useAllGuideProgress() {
  const [map, setMap] = useState<ProgressMap>({});

  useEffect(() => {
    const sync = () => setMap(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);

    void pullRemote();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "INITIAL_SESSION") void pullRemote();
    });

    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
      sub.subscription.unsubscribe();
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
      const entry: GuideProgress = { step, total, completed, updatedAt: Date.now() };
      next[slug] = entry;
      write(next);
      void pushRemote(slug, entry);
    },
    [slug, total],
  );

  const reset = useCallback(() => {
    const next = read();
    delete next[slug];
    write(next);
    void (async () => {
      const userId = await currentUserId();
      if (!userId) return;
      try {
        await supabase.from("guide_progress").delete().eq("user_id", userId).eq("slug", slug);
      } catch {
        /* sin conexión */
      }
    })();
  }, [slug]);

  return { progress, save, reset, hydrated };
}

export function progressPercent(p?: GuideProgress) {
  if (!p || !p.total) return 0;
  if (p.completed) return 100;
  return Math.round((p.step / p.total) * 100);
}
