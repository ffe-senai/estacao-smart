"use client";

import type { CSSProperties } from "react";
import type { DockviewPanelApi, IDockviewPanelHeaderProps } from "dockview-react";
import { X } from "lucide-react";
import { getModule, type SmartModule } from "@/modules/registry";
import { StatusLight, useModuleStatus } from "./module-status";
import { useWorkspace } from "./workspace-context";

/** Aba (barra de título) da janela de um módulo. */
export function WindowTab({ api }: IDockviewPanelHeaderProps) {
    const smartModule = getModule(api.id);
    if (!smartModule) return <span className="px-3">{api.title}</span>;
    return <ModuleTab module={smartModule} api={api} />;
}

function ModuleTab({ module, api }: { module: SmartModule; api: DockviewPanelApi }) {
    const { locked } = useWorkspace();
    const status = useModuleStatus(module);
    const Icon = module.icon;

    return (
        <div
            className="smart-window-tab flex h-full min-w-0 items-center gap-2 ps-2.5 pe-1.5"
            style={{ "--module-accent": module.accent } as CSSProperties}
        >
            <Icon aria-hidden className="size-4 shrink-0 text-(--module-accent)" />
            <span className="font-mono text-[10px] font-bold text-smart-text-muted">{module.group}</span>
            <span className="truncate font-semibold tracking-[0.05em] uppercase">{module.title}</span>
            <StatusLight status={status} />
            {!locked && (
                <button
                    type="button"
                    aria-label={`Fechar ${module.title}`}
                    title="Fechar janela"
                    className="grid size-5 shrink-0 place-items-center rounded-(--smart-radius-sm) text-smart-text-muted transition-colors hover:bg-smart-bg-surface-hover hover:text-smart-text-primary focus-visible:outline-2 focus-visible:outline-smart-border-focus"
                    // Não inicia o arraste da aba nem rouba o foco.
                    onPointerDown={(event) => event.preventDefault()}
                    onClick={() => api.close()}
                >
                    <X className="size-3.5" />
                </button>
            )}
        </div>
    );
}
