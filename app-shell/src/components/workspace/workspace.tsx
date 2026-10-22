"use client";

import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    useSyncExternalStore,
    type ReactNode,
} from "react";
import { DockviewReact, type DockviewApi, type DockviewReadyEvent } from "dockview-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
    WINDOW_COMPONENT,
    applyLayoutPreset,
    defaultPreset,
    getLocked,
    loadSavedLayout,
    restoreLayout,
    saveLayout,
    setLocked,
    showModule,
    subscribeLocked,
} from "./layouts";
import { ModuleStatusProvider } from "./module-status";
import { smartMessages, smartTheme } from "./theme";
import { WindowActions } from "./window-actions";
import { WindowContent } from "./window-content";
import { WindowTab } from "./window-tab";
import { WindowWatermark } from "./window-watermark";
import { WorkspaceContext, type WorkspaceActions } from "./workspace-context";
import { LayoutControls, ModuleLaunchers } from "./workspace-toolbar";

const components = { [WINDOW_COMPONENT]: WindowContent };
const tabComponents = { [WINDOW_COMPONENT]: WindowTab };

/**
 * Área de trabalho da estação: uma janela por módulo, que o operador pode
 * arrastar, redimensionar, empilhar em abas, destacar ou levar para outro
 * monitor. O layout fica salvo no navegador.
 */
export function Workspace({ brand, actions }: { brand?: ReactNode; actions?: ReactNode }) {
    const [api, setApi] = useState<DockviewApi | null>(null);
    const locked = useSyncExternalStore(subscribeLocked, getLocked, () => false);
    const { openIds, activeId } = usePanels(api);

    const onReady = useCallback(({ api }: DockviewReadyEvent) => {
        const saved = loadSavedLayout();
        // Sem layout salvo, começa sem janelas abertas.
        if (saved && !restoreLayout(api, saved)) {
            toast.warning("O layout salvo não pôde ser restaurado.");
        }
        setApi(api);
    }, []);

    useEffect(() => {
        if (!api) return;

        // Espera o fim do arraste/redimensionamento para gravar.
        let timer: ReturnType<typeof setTimeout> | undefined;
        const save = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                timer = undefined;
                saveLayout(api);
            }, 300);
        };
        const flush = () => {
            if (timer === undefined) return;
            clearTimeout(timer);
            timer = undefined;
            saveLayout(api);
        };

        const listeners = [
            api.onDidLayoutChange(save),
            api.onDidOpenPopoutWindowFail(({ reason }) => {
                if (reason === "closed") return;
                toast.error(
                    reason === "blocked"
                        ? "O navegador bloqueou a nova janela. Permita pop-ups para este endereço e tente de novo."
                        : "Não foi possível abrir a janela em outra janela do navegador.",
                );
            }),
        ];
        window.addEventListener("pagehide", flush);

        return () => {
            clearTimeout(timer);
            listeners.forEach((listener) => listener.dispose());
            window.removeEventListener("pagehide", flush);
        };
    }, [api]);

    const workspace = useMemo<WorkspaceActions>(
        () => ({
            locked,
            setLocked,
            showModule: (module) => {
                if (api) showModule(api, module);
            },
            applyPreset: (preset) => {
                if (api) applyLayoutPreset(api, preset);
            },
            resetLayout: () => {
                if (api) applyLayoutPreset(api, defaultPreset(api.width));
            },
        }),
        [api, locked],
    );

    return (
        <WorkspaceContext value={workspace}>
            <ModuleStatusProvider>
                <TooltipProvider delay={400}>
                    <div className="flex h-dvh flex-col overflow-hidden bg-smart-bg-app">
                        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-smart-border-color bg-smart-bg-surface px-3">
                            {brand}
                            <Separator orientation="vertical" className="hidden h-8 self-center sm:block" />
                            <ModuleLaunchers openIds={openIds} activeId={activeId} />
                            <div className="ms-auto flex shrink-0 items-center gap-2">
                                <LayoutControls />
                                {actions}
                            </div>
                        </header>
                        <main className="relative min-h-0 flex-1">
                            <DockviewReact
                                theme={smartTheme}
                                messages={smartMessages}
                                components={components}
                                tabComponents={tabComponents}
                                rightHeaderActionsComponent={WindowActions}
                                watermarkComponent={WindowWatermark}
                                onReady={onReady}
                                // Mantém o DOM das abas ocultas: o módulo não perde estado nem recarrega iframes.
                                defaultRenderer="always"
                                popoutUrl="/popout.html"
                                floatingGroupBounds="boundedWithinViewport"
                                locked={locked}
                                disableDnd={locked}
                            />
                        </main>
                    </div>
                </TooltipProvider>
            </ModuleStatusProvider>
        </WorkspaceContext>
    );
}

/** Janelas abertas e a ativa, para os botões do cabeçalho. */
function usePanels(api: DockviewApi | null) {
    const subscribe = useCallback(
        (onChange: () => void) => {
            if (!api) return () => {};
            const listeners = [
                api.onDidAddPanel(onChange),
                api.onDidRemovePanel(onChange),
                api.onDidActivePanelChange(onChange),
                api.onDidLayoutFromJSON(onChange),
            ];
            return () => listeners.forEach((listener) => listener.dispose());
        },
        [api],
    );

    // Snapshot em texto ("ids abertos|id ativo") para o React comparar por valor.
    const snapshot = useSyncExternalStore(
        subscribe,
        () => (api ? `${api.panels.map((panel) => panel.id).join(",")}|${api.activePanel?.id ?? ""}` : "|"),
        () => "|",
    );

    return useMemo(() => {
        const [ids, active] = snapshot.split("|");
        return { openIds: new Set(ids ? ids.split(",") : []), activeId: active || undefined };
    }, [snapshot]);
}
