import type { DockviewMessages, DockviewTheme } from "dockview-react";

/** Tema das janelas. As cores ficam em workspace.css (.dockview-theme-smart). */
export const smartTheme: DockviewTheme = {
    name: "smart",
    className: "dockview-theme-smart",
    colorScheme: "dark",
    gap: 8,
    dndOverlayMounting: "absolute",
    dndPanelOverlay: "group",
    dndTabIndicator: "line",
    dndOverlayBorder: "2px solid var(--smart-border-focus)",
};

/** Avisos lidos pelo leitor de tela quando o layout muda. */
export const smartMessages: Partial<DockviewMessages> = {
    panelOpened: (title) => `Janela ${title} aberta`,
    panelClosed: (title) => `Janela ${title} fechada`,
    groupMaximized: (title) => `Janela ${title} maximizada`,
    groupRestored: (title) => `Janela ${title} restaurada`,
    groupFloated: (title) => `Janela ${title} destacada`,
    groupDocked: (title) => `Janela ${title} encaixada no painel`,
    groupPoppedOut: (title) => `Janela ${title} aberta em outra janela do navegador`,
    closeTab: (title) => `Fechar ${title}`,
    closeTabPlain: () => "Fechar",
};
