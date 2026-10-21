"use client";

import { Component, Suspense, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import type { IDockviewPanelProps } from "dockview-react";
import { Loader2, OctagonX, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getModule, type SmartModule } from "@/modules/registry";
import { useModuleStatusStore } from "./module-status";

/** Conteúdo de uma janela. O id do painel é o id do módulo. */
export function WindowContent({ api }: IDockviewPanelProps) {
    const smartModule = getModule(api.id);
    if (!smartModule) {
        return <WindowState title="Módulo desconhecido">{api.id}</WindowState>;
    }
    return <ModuleWindow module={smartModule} />;
}

function ModuleWindow({ module }: { module: SmartModule }) {
    const store = useModuleStatusStore();
    const [attempt, setAttempt] = useState(0);
    const Content = module.component;

    // Janela fechada: a falha registrada deixa de valer.
    useEffect(() => () => store.clear(module.id), [store, module.id]);

    const retry = () => {
        store.clear(module.id);
        setAttempt((n) => n + 1);
    };

    return (
        <div
            className="h-full w-full overflow-auto text-smart-text-primary"
            style={{ "--module-accent": module.accent } as CSSProperties}
        >
            {Content ? (
                // Uma falha no módulo fica presa na janela dele, sem derrubar as outras.
                <WindowErrorBoundary
                    key={attempt}
                    onError={() => store.set(module.id, "error")}
                    fallback={(error) => <ModuleError module={module} error={error} onRetry={retry} />}
                >
                    <Suspense fallback={<ModuleLoading module={module} />}>
                        <Content />
                    </Suspense>
                </WindowErrorBoundary>
            ) : (
                <ModulePending module={module} />
            )}
        </div>
    );
}

type BoundaryProps = {
    children: ReactNode;
    onError: (error: Error) => void;
    fallback: (error: Error) => ReactNode;
};

class WindowErrorBoundary extends Component<BoundaryProps, { error: Error | null }> {
    state = { error: null as Error | null };

    static getDerivedStateFromError(error: unknown) {
        return { error: error instanceof Error ? error : new Error(String(error)) };
    }

    componentDidCatch(error: unknown) {
        this.props.onError(error instanceof Error ? error : new Error(String(error)));
    }

    render() {
        return this.state.error ? this.props.fallback(this.state.error) : this.props.children;
    }
}

/* --------------------------------------------------------------------------
   Estados da janela
   -------------------------------------------------------------------------- */

function WindowState({ icon, title, children }: { icon?: ReactNode; title: string; children?: ReactNode }) {
    return (
        <div className="flex min-h-full flex-col items-center justify-center gap-3 p-6 text-center">
            {icon}
            <p className="text-sm font-semibold tracking-[0.05em] uppercase">{title}</p>
            {children}
        </div>
    );
}

function ModuleIconTile({ module }: { module: SmartModule }) {
    const Icon = module.icon;
    return (
        <div className="grid size-14 place-items-center rounded-(--smart-radius-md) border border-(--module-accent)/40 bg-(--module-accent)/10">
            <Icon className="size-7 text-(--module-accent)" />
        </div>
    );
}

function ModulePending({ module }: { module: SmartModule }) {
    return (
        <WindowState icon={<ModuleIconTile module={module} />} title={`${module.group} · ${module.title}`}>
            <p className="max-w-xs text-sm text-smart-text-secondary">{module.description}</p>
            <Badge variant="off">Não integrado</Badge>
            <p className="max-w-xs text-xs text-smart-text-muted">
                Para integrar, registre o componente do módulo em{" "}
                <code className="font-mono text-smart-text-digital">modules/registry.ts</code>.
            </p>
        </WindowState>
    );
}

function ModuleLoading({ module }: { module: SmartModule }) {
    return (
        <WindowState
            icon={<Loader2 className="size-8 text-(--module-accent) motion-safe:animate-spin" />}
            title="Carregando módulo"
        >
            <p className="font-mono text-xs text-smart-text-secondary">
                {module.group} · {module.title}
            </p>
        </WindowState>
    );
}

function ModuleError({ module, error, onRetry }: { module: SmartModule; error: Error; onRetry: () => void }) {
    return (
        <WindowState
            icon={<OctagonX className="size-9 text-smart-status-danger drop-shadow-[0_0_8px_var(--smart-status-danger-glow)]" />}
            title="Falha no módulo"
        >
            <p className="max-w-sm text-sm text-smart-text-secondary">A janela {module.title} parou com um erro.</p>
            <code
                title={error.message}
                className="max-w-sm rounded-(--smart-radius-sm) border border-smart-border-color bg-smart-bg-input px-3 py-2 font-mono text-xs break-all text-smart-status-danger"
            >
                <span className="line-clamp-3">{error.message}</span>
            </code>
            <Button variant="outline" size="sm" onClick={onRetry}>
                <RefreshCw />
                Tentar novamente
            </Button>
        </WindowState>
    );
}
