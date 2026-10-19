import type { AddPanelPositionOptions, DockviewApi, SerializedDockview } from "dockview-react";
import { Columns4, LayoutGrid, LayoutPanelLeft, SquareStack, type LucideIcon } from "lucide-react";
import { SMART_MODULES, getModule, type SmartModule } from "@/modules/registry";

/** Nome do componente das janelas no dockview (conteúdo e aba). */
export const WINDOW_COMPONENT = "module";

export type LayoutPreset = "grade" | "colunas" | "foco" | "abas";

export const LAYOUT_PRESETS: readonly {
    id: LayoutPreset;
    label: string;
    description: string;
    icon: LucideIcon;
}[] = [
        { id: "grade", label: "Grade", description: "As quatro janelas em grade 2 × 2", icon: LayoutGrid },
        { id: "colunas", label: "Colunas", description: "Uma coluna por módulo, para telas largas", icon: Columns4 },
        { id: "foco", label: "Foco", description: "Janela ativa em destaque e as demais ao lado", icon: LayoutPanelLeft },
        { id: "abas", label: "Abas", description: "Todas as janelas em abas, para telas pequenas", icon: SquareStack },
    ];

/** Em telas estreitas as janelas lado a lado ficam pequenas demais. */
export function defaultPreset(width: number): LayoutPreset {
    return width < 900 ? "abas" : "grade";
}

function addWindow(api: DockviewApi, module: SmartModule, position?: AddPanelPositionOptions) {
    return api.addPanel({
        id: module.id,
        component: WINDOW_COMPONENT,
        tabComponent: WINDOW_COMPONENT,
        title: module.title,
        position,
    });
}

/** Troca o layout inteiro por um dos modelos, reabrindo as quatro janelas. */
export function applyLayoutPreset(api: DockviewApi, preset: LayoutPreset) {
    const focused = getModule(api.activePanel?.id ?? "");
    api.clear();

    const [a, b, c, d] = SMART_MODULES.filter(m => m.id != "poc");
    switch (preset) {
        case "grade":
            addWindow(api, a);
            addWindow(api, b, { referencePanel: a.id, direction: "right" });
            addWindow(api, c, { referencePanel: a.id, direction: "below" });
            addWindow(api, d, { referencePanel: b.id, direction: "below" });
            break;
        case "colunas":
            SMART_MODULES.forEach((module, i) =>
                addWindow(api, module, i ? { referencePanel: SMART_MODULES[i - 1].id, direction: "right" } : undefined),
            );
            equalizeColumns(api);
            break;
        case "foco": {
            const main = focused ?? a;
            const side = SMART_MODULES.filter((module) => module !== main);
            addWindow(api, main);
            side.forEach((module, i) =>
                addWindow(api, module, i
                    ? { referencePanel: side[i - 1].id, direction: "below" }
                    : { referencePanel: main.id, direction: "right" }),
            );
            sizeFocusLayout(api, main, side);
            break;
        }
        case "abas":
            addWindow(api, a);
            [b, c, d].forEach((module) => addWindow(api, module, { referencePanel: a.id, direction: "within" }));
            break;
    }

    // A janela que estava em foco continua ativa (e não a última adicionada).
    api.getPanel((focused ?? a).id)?.api.setActive();
}

/** Cada nova coluna divide a anterior ao meio; aqui elas ficam com a mesma largura. */
function equalizeColumns(api: DockviewApi) {
    const width = api.width / SMART_MODULES.length;
    SMART_MODULES.forEach((module) => api.getPanel(module.id)?.group.api.setSize({ width }));
}

function sizeFocusLayout(api: DockviewApi, main: SmartModule, side: SmartModule[]) {
    api.getPanel(main.id)?.group.api.setSize({ width: api.width * 0.64 });
    const height = api.height / side.length;
    side.forEach((module) => api.getPanel(module.id)?.group.api.setSize({ height }));
}

/** Mostra a janela do módulo, abrindo-a se estiver fechada. */
export function showModule(api: DockviewApi, module: SmartModule) {
    const panel = api.getPanel(module.id);

    if (api.hasMaximizedGroup() && !panel?.api.isMaximized()) {
        api.exitMaximizedGroup();
    }

    if (panel) {
        panel.api.setActive();
        if (panel.api.location.type === "popout") panel.api.getWindow().focus();
        return;
    }

    // Abre ao lado da janela ativa, se ela estiver no painel principal.
    const reference = api.activeGroup?.api.location.type === "grid" ? api.activeGroup : undefined;
    addWindow(api, module, reference ? { referenceGroup: reference, direction: "right" } : undefined);
}

/* --------------------------------------------------------------------------
   Persistência do layout (por navegador, em localStorage)
   -------------------------------------------------------------------------- */

const LAYOUT_KEY = "smart40:workspace:layout:v1";
const LOCK_KEY = "smart40:workspace:locked";

export function loadSavedLayout(): SerializedDockview | null {
    try {
        const raw = localStorage.getItem(LAYOUT_KEY);
        return raw ? (JSON.parse(raw) as SerializedDockview) : null;
    } catch {
        return null;
    }
}

export function saveLayout(api: DockviewApi) {
    try {
        localStorage.setItem(LAYOUT_KEY, JSON.stringify(api.toJSON()));
    } catch {
        // Sem localStorage (modo privado, cota cheia): o layout só não é lembrado.
    }
}

/**
 * Aplica o layout salvo. Falha (e devolve false) se ele estiver corrompido ou
 * citar um módulo que saiu do registro.
 */
export function restoreLayout(api: DockviewApi, layout: SerializedDockview): boolean {
    const ids = Object.keys(layout.panels ?? {});
    if (ids.length === 0 || !ids.every((id) => getModule(id))) return false;

    try {
        api.fromJSON(layout);
        return api.panels.length > 0;
    } catch (error) {
        console.warn("Layout salvo inválido, usando o padrão:", error);
        api.clear();
        return false;
    }
}

/* Trava do layout: um store externo, lido com useSyncExternalStore. */

let lockedInMemory = false;
const lockListeners = new Set<() => void>();

export function getLocked(): boolean {
    try {
        const stored = localStorage.getItem(LOCK_KEY);
        return stored === null ? lockedInMemory : stored === "1";
    } catch {
        return lockedInMemory;
    }
}

export function setLocked(locked: boolean) {
    lockedInMemory = locked;
    try {
        localStorage.setItem(LOCK_KEY, locked ? "1" : "0");
    } catch {
        // Ver saveLayout: a trava vale só nesta aba.
    }
    lockListeners.forEach((listener) => listener());
}

export function subscribeLocked(listener: () => void) {
    lockListeners.add(listener);
    window.addEventListener("storage", listener); // mesma estação aberta em outra aba
    return () => {
        lockListeners.delete(listener);
        window.removeEventListener("storage", listener);
    };
}
