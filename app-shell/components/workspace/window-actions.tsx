"use client";

import { useCallback, useSyncExternalStore, type ReactNode } from "react";
import type { DockviewApi, IDockviewHeaderActionsProps } from "dockview-react";
import { Maximize2, Minimize2, PanelsTopLeft, PictureInPicture2, SquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "./workspace-context";

/** Botões à direita das abas de cada janela (grupo). */
export function WindowActions({ api, containerApi, group }: IDockviewHeaderActionsProps) {
    const { locked } = useWorkspace();

    const location = useSyncExternalStore(
        useCallback(
            (onChange: () => void) => {
                const listener = api.onDidLocationChange(onChange);
                return () => listener.dispose();
            },
            [api],
        ),
        () => api.location.type,
        () => "grid",
    );

    const maximized = useSyncExternalStore(
        useCallback(
            (onChange: () => void) => {
                const listener = containerApi.onDidMaximizedGroupChange(onChange);
                return () => listener.dispose();
            },
            [containerApi],
        ),
        () => api.isMaximized(),
        () => false,
    );

    return (
        <div className="flex h-full items-center gap-0.5 pe-1.5">
            {location === "grid" && (
                <ActionButton
                    label={maximized ? "Restaurar tamanho" : "Maximizar"}
                    onClick={() => (maximized ? api.exitMaximized() : api.maximize())}
                >
                    {maximized ? <Minimize2 /> : <Maximize2 />}
                </ActionButton>
            )}
            {!locked && location === "grid" && !maximized && (
                <ActionButton
                    label="Destacar janela"
                    onClick={() => containerApi.addFloatingGroup(group, floatingBox(containerApi))}
                >
                    <PictureInPicture2 />
                </ActionButton>
            )}
            {!locked && location !== "popout" && !maximized && (
                <ActionButton
                    label="Abrir em outra janela do navegador"
                    onClick={() => containerApi.addPopoutGroup(group)}
                >
                    <SquareArrowOutUpRight />
                </ActionButton>
            )}
            {!locked && location !== "grid" && (
                <ActionButton label="Encaixar no painel" onClick={() => group.api.moveTo({ position: "right" })}>
                    <PanelsTopLeft />
                </ActionButton>
            )}
        </div>
    );
}

/*
 * title nativo em vez do Tooltip do tema: numa janela aberta em outra janela
 * do navegador, o portal do Tooltip apareceria na janela principal.
 */
function ActionButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
    return (
        <Button variant="ghost" size="icon-xs" aria-label={label} title={label} onClick={onClick}>
            {children}
        </Button>
    );
}

/** Tamanho inicial da janela destacada: centralizada, em cascata com as outras. */
function floatingBox(api: DockviewApi) {
    const width = Math.round(Math.min(720, api.width * 0.6));
    const height = Math.round(Math.min(480, api.height * 0.6));
    const cascade = 24 * api.groups.filter((group) => group.api.location.type === "floating").length;
    return {
        width,
        height,
        x: Math.round((api.width - width) / 2) + cascade,
        y: Math.round((api.height - height) / 2) + cascade,
    };
}
