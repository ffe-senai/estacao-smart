"use client";

import type { CSSProperties } from "react";
import { Lock, LockOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SMART_MODULES, type SmartModule } from "@/modules/registry";
import { LAYOUT_PRESETS } from "./layouts";
import { STATUS_LABEL, StatusLight, useModuleStatus } from "./module-status";
import { useWorkspace } from "./workspace-context";

/** Um botão por módulo: abre a janela ou traz ela para frente. */
export function ModuleLaunchers({ openIds, activeId }: { openIds: ReadonlySet<string>; activeId?: string }) {
    return (
        <nav aria-label="Janelas dos módulos" className="flex min-w-0 items-center gap-1.5 overflow-x-auto">
            {SMART_MODULES.map((module) => (
                <ModuleLauncher
                    key={module.id}
                    module={module}
                    open={openIds.has(module.id)}
                    active={activeId === module.id}
                />
            ))}
        </nav>
    );
}

function ModuleLauncher({ module, open, active }: { module: SmartModule; open: boolean; active: boolean }) {
    const { showModule } = useWorkspace();
    const status = useModuleStatus(module);
    const Icon = module.icon;
    // Em telas pequenas o texto do botão some; o nome acessível não.
    const state = !open ? "janela fechada" : status !== "ready" ? STATUS_LABEL[status].toLowerCase() : null;

    return (
        <Tooltip>
            <TooltipTrigger
                render={
                    <button
                        type="button"
                        aria-label={`${module.title} (${module.group})${state ? `: ${state}` : ""}`}
                        aria-current={active || undefined}
                        style={{ "--module-accent": module.accent } as CSSProperties}
                        className={cn(
                            "inline-flex h-9 shrink-0 items-center gap-2 rounded-(--smart-radius-sm) border border-smart-border-color bg-smart-bg-input px-2.5 text-xs font-semibold tracking-[0.05em] text-smart-text-muted uppercase transition-colors",
                            "hover:border-(--module-accent)/60 hover:text-smart-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-smart-border-focus",
                            open && "text-smart-text-secondary",
                            active && "border-(--module-accent) bg-(--module-accent)/10 text-smart-text-primary",
                        )}
                        onClick={() => showModule(module)}
                    />
                }
            >
                <Icon aria-hidden className={cn("size-4 text-(--module-accent)", !open && "opacity-50")} />
                <span className="hidden font-mono text-[10px] text-smart-text-muted sm:inline">{module.group}</span>
                <span className="hidden 2xl:inline">{module.title}</span>
                {open ? (
                    <StatusLight status={status} />
                ) : (
                    <span
                        role="img"
                        aria-label="Janela fechada"
                        className="size-2 shrink-0 rounded-full border border-smart-text-muted"
                    />
                )}
            </TooltipTrigger>
            <TooltipContent>
                {module.title}: {open ? "mostrar janela" : "abrir janela"}
            </TooltipContent>
        </Tooltip>
    );
}

/** Modelos de layout e a trava. */
export function LayoutControls() {
    const { applyPreset, locked, setLocked } = useWorkspace();

    return (
        <div role="toolbar" aria-label="Layout das janelas" className="flex shrink-0 items-center gap-1">
            {/* Em telas pequenas o layout padrão já é em abas. */}
            <div className="hidden items-center gap-1 md:flex">
                {LAYOUT_PRESETS.map((preset) => {
                    const Icon = preset.icon;
                    return (
                        <Tooltip key={preset.id}>
                            <TooltipTrigger
                                render={
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        aria-label={`Layout ${preset.label}`}
                                        onClick={() => applyPreset(preset.id)}
                                    />
                                }
                            >
                                <Icon />
                            </TooltipTrigger>
                            <TooltipContent>
                                {preset.label}: {preset.description}
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
                <Separator orientation="vertical" className="mx-1 h-6 self-center" />
            </div>
            <Tooltip>
                <TooltipTrigger
                    render={
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label="Travar layout"
                            aria-pressed={locked}
                            className={cn(locked && "text-smart-status-warning hover:text-smart-status-warning")}
                            onClick={() => setLocked(!locked)}
                        />
                    }
                >
                    {locked ? <Lock /> : <LockOpen />}
                </TooltipTrigger>
                <TooltipContent>
                    {locked
                        ? "Layout travado: clique para destravar"
                        : "Travar layout: impede arrastar, redimensionar e fechar janelas sem querer"}
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
