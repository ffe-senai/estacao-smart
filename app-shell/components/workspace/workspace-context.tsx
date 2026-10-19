"use client";

import { createContext, use } from "react";
import type { SmartModule } from "@/modules/registry";
import type { LayoutPreset } from "./layouts";

export type WorkspaceActions = {
    /** Layout travado: sem arrastar, redimensionar, fechar ou destacar janelas. */
    locked: boolean;
    setLocked: (locked: boolean) => void;
    showModule: (module: SmartModule) => void;
    applyPreset: (preset: LayoutPreset) => void;
    /** Volta ao layout padrão para o tamanho da tela. */
    resetLayout: () => void;
};

export const WorkspaceContext = createContext<WorkspaceActions | null>(null);

export function useWorkspace(): WorkspaceActions {
    const workspace = use(WorkspaceContext);
    if (!workspace) throw new Error("useWorkspace precisa estar dentro de <Workspace>");
    return workspace;
}
