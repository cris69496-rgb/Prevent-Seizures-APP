import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Lock, Pencil, Plus, Trash2, User, X } from "lucide-react";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/perfiles")({
  head: () => ({
    meta: [
      { title: "Perfiles — Seres queridos" },
      {
        name: "description",
        content: "Crea planes de acción personalizados para cada ser querido.",
      },
      { property: "og:title", content: "Perfiles — Prevent Seizures S.A.S." },
      { property: "og:description", content: "Planes de acción personalizados por persona." },
    ],
  }),
  component: Perfiles,
});

type LovedOne = {
  id: string;
  name: string;
  seizure_type: string | null;
  medication: string | null;
  notes: string | null;
  emergency_contact: string | null;
};

type Draft = {
  id?: string;
  name: string;
  seizure_type: string;
  medication: string;
  notes: string;
  emergency_contact: string;
};

const emptyDraft: Draft = {
  name: "",
  seizure_type: "",
  medication: "",
  notes: "",
  emergency_contact: "",
};

function Perfiles() {
  const { isAuthed, loading, user } = useAuth();
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: perfiles = [], isLoading } = useQuery({
    queryKey: ["loved_ones", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("loved_ones")
        .select("id, name, seizure_type, medication, notes, emergency_contact")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as LovedOne[];
    },
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["loved_ones", user?.id] });

  const saveMutation = useMutation({
    mutationFn: async (d: Draft) => {
      const payload = {
        user_id: user!.id,
        name: d.name.trim().slice(0, 80),
        seizure_type: d.seizure_type.trim().slice(0, 80) || null,
        medication: d.medication.trim().slice(0, 200) || null,
        notes: d.notes.trim().slice(0, 500) || null,
        emergency_contact: d.emergency_contact.trim().slice(0, 80) || null,
      };
      const { error } = d.id
        ? await supabase.from("loved_ones").update(payload).eq("id", d.id)
        : await supabase.from("loved_ones").insert(payload);
      if (error) throw error;
    },
    onSuccess: () => {
      setDraft(null);
      void invalidate();
    },
    onError: () => setError("No pudimos guardar el perfil. Inténtalo de nuevo."),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("loved_ones").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => void invalidate(),
  });

  if (loading) {
    return (
      <MobileShell>
        <div className="min-h-[75vh] px-5 pt-10">
          <div className="h-6 w-40 animate-pulse rounded-full bg-secondary" />
          <div className="mt-4 h-24 animate-pulse rounded-2xl bg-secondary" />
        </div>
      </MobileShell>
    );
  }

  if (!isAuthed) {
    return (
      <MobileShell>
        <div className="flex min-h-[75vh] flex-col items-center justify-center px-6 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-secondary text-brand">
            <Lock className="h-7 w-7" />
          </span>
          <h1 className="mt-4 text-xl font-extrabold text-foreground">Perfiles privados</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Inicia sesión para crear planes de acción específicos para cada ser querido. Solo tú
            puedes verlos.
          </p>
          <Link
            to="/auth"
            className="mt-6 w-full max-w-xs rounded-full py-3 text-center text-sm font-semibold text-white shadow-[var(--shadow-soft)]"
            style={{ background: "var(--gradient-brand)" }}
          >
            Iniciar sesión
          </Link>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      <header className="flex items-center justify-between px-5 pb-4 pt-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">Perfiles</p>
          <h1 className="mt-1 text-2xl font-extrabold text-foreground">Seres queridos</h1>
        </div>
        <button
          aria-label="Agregar perfil"
          onClick={() => {
            setError(null);
            setDraft({ ...emptyDraft });
          }}
          className="grid h-10 w-10 place-items-center rounded-full text-white"
          style={{ background: "var(--gradient-brand)" }}
        >
          <Plus className="h-5 w-5" />
        </button>
      </header>

      {draft && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setError(null);
            if (draft.name.trim().length < 2) {
              setError("Escribe un nombre.");
              return;
            }
            saveMutation.mutate(draft);
          }}
          className="mx-5 mb-5 space-y-3 rounded-2xl border border-brand/30 bg-card p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-foreground">
              {draft.id ? "Editar perfil" : "Nuevo perfil"}
            </p>
            <button type="button" aria-label="Cerrar" onClick={() => setDraft(null)}>
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <Input
            label="Nombre"
            value={draft.name}
            maxLength={80}
            onChange={(v) => setDraft({ ...draft, name: v })}
          />
          <Input
            label="Tipo de crisis"
            placeholder="Ej. Epilepsia focal"
            value={draft.seizure_type}
            maxLength={80}
            onChange={(v) => setDraft({ ...draft, seizure_type: v })}
          />
          <Input
            label="Medicación"
            placeholder="Ej. Levetiracetam 8:00 y 20:00"
            value={draft.medication}
            maxLength={200}
            onChange={(v) => setDraft({ ...draft, medication: v })}
          />
          <Input
            label="Contacto de emergencia"
            placeholder="Ej. Ana — 300 000 0000"
            value={draft.emergency_contact}
            maxLength={80}
            onChange={(v) => setDraft({ ...draft, emergency_contact: v })}
          />
          <label className="block">
            <span className="text-xs font-semibold text-foreground">Notas</span>
            <textarea
              rows={3}
              maxLength={500}
              value={draft.notes}
              onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
              placeholder="Desencadenantes, señales previas, indicaciones del médico…"
              className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </label>

          {error && (
            <p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={saveMutation.isPending}
            className="flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white disabled:opacity-60"
            style={{ background: "var(--gradient-brand)" }}
          >
            {saveMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Guardar perfil
          </button>
        </form>
      )}

      {isLoading ? (
        <div className="space-y-3 px-5">
          <div className="h-24 animate-pulse rounded-2xl bg-secondary" />
          <div className="h-24 animate-pulse rounded-2xl bg-secondary" />
        </div>
      ) : perfiles.length === 0 && !draft ? (
        <div className="px-6 py-10 text-center">
          <p className="text-sm text-muted-foreground">
            Aún no has creado perfiles. Agrega uno para tener a mano el plan de acción de esa
            persona.
          </p>
        </div>
      ) : (
        <ul className="space-y-3 px-5">
          {perfiles.map((p) => (
            <li key={p.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-brand">
                  <User className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground">{p.name}</p>
                  {p.seizure_type && (
                    <p className="text-xs text-muted-foreground">{p.seizure_type}</p>
                  )}
                </div>
                <button
                  aria-label={`Editar ${p.name}`}
                  onClick={() =>
                    setDraft({
                      id: p.id,
                      name: p.name,
                      seizure_type: p.seizure_type ?? "",
                      medication: p.medication ?? "",
                      notes: p.notes ?? "",
                      emergency_contact: p.emergency_contact ?? "",
                    })
                  }
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  aria-label={`Eliminar ${p.name}`}
                  onClick={() => deleteMutation.mutate(p.id)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {p.medication && (
                <p className="mt-3 text-sm text-muted-foreground">Medicación: {p.medication}</p>
              )}
              {p.emergency_contact && (
                <p className="mt-1 text-sm text-muted-foreground">Contacto: {p.emergency_contact}</p>
              )}
              {p.notes && <p className="mt-2 text-sm text-muted-foreground">{p.notes}</p>}
            </li>
          ))}
        </ul>
      )}
    </MobileShell>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-foreground">{label}</span>
      <input
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
    </label>
  );
}
