"use client";

import { createContext, use, useState, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { SmartModule } from "@/modules/registry";

/**
 * Estado da janela, nas cores de sinalização do tema (IEC 60073). O carregamento
 * é responsabilidade do módulo; a janela só sabe se ele existe e se quebrou.
 */
export type ModuleStatus = "pending" | "ready" | "error";

export const STATUS_LABEL: Record<ModuleStatus, string> = {
    pending: "Não integrado",
    ready: "Integrado",
    error: "Falha",
};

type StatusStore = {
    get(id: string): ModuleStatus | undefined;
    set(id: string, status: ModuleStatus): void;
    clear(id: string): void;
    subscribe(listener: () => void): () => void;
};

function createStatusStore(): StatusStore {
    const statuses = new Map<string, ModuleStatus>();
    const listeners = new Set<() => void>();
    const notify = () => listeners.forEach((listener) => listener());

    return {
        get: (id) => statuses.get(id),
        set(id, status) {
            if (statuses.get(id) === status) return;
            statuses.set(id, status);
            notify();
        },
        clear(id) {
            if (statuses.delete(id)) notify();
        },
        subscribe(listener) {
            listeners.add(listener);
            return () => {
                listeners.delete(listener);
            };
        },
    };
}

const StatusContext = createContext<StatusStore | null>(null);

export function ModuleStatusProvider({ children }: { children: ReactNode }) {
    const [store] = useState(createStatusStore);
    return <StatusContext value={store}>{children}</StatusContext>;
}

export function useModuleStatusStore(): StatusStore {
    const store = use(StatusContext);
    if (!store) throw new Error("useModuleStatusStore precisa de um <ModuleStatusProvider>");
    return store;
}

export function useModuleStatus(module: SmartModule): ModuleStatus {
    const store = useModuleStatusStore();
    const fallback: ModuleStatus = module.component ? "ready" : "pending";
    return useSyncExternalStore(
        store.subscribe,
        () => store.get(module.id) ?? fallback,
        () => fallback,
    );
}

const LIGHT_CLASS: Record<Exclude<ModuleStatus, "ready">, string> = {
    pending: "bg-smart-status-off",
    error: "bg-smart-status-danger shadow-[0_0_8px_var(--smart-status-danger-glow)]",
};

/** Sinaleiro (LED) da janela: aceso só quando há algo a avisar. */
export function StatusLight({ status, className }: { status: ModuleStatus; className?: string }) {
    if (status === "ready") return null;
    return (
        <span
            role="img"
            aria-label={STATUS_LABEL[status]}
            title={STATUS_LABEL[status]}
            className={cn("inline-block size-2 shrink-0 rounded-full", LIGHT_CLASS[status], className)}
        />
    );
}
