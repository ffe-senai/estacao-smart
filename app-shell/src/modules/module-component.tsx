"use client";
import React from "react";
import { createRemoteAppComponent } from "@module-federation/modern-js-v3/react";
import type { ModuleFederation } from "@module-federation/enhanced/runtime";
import { Loader2 } from "lucide-react";
import { WindowState } from "@/components/workspace/window-state";
import { MODULE_NAME } from "@/lib/smart-modules";
import { InLightDom, registerModule, ShadowContainer } from "./module-shadow";

/** Repassa a falha para o error boundary da janela, que mostra o erro padrão do workspace. */
const RethrowError = ({ error }: { error: unknown }): never => {
    throw error;
};

const LoadingModule = () => (
    <InLightDom>
        <WindowState
            icon={<Loader2 className="size-8 text-(--module-accent) motion-safe:animate-spin" />}
            title="Carregando módulo"
        />
    </InLightDom>
);

/**
 * Native Modern.js v3 Bridge wrapper
 */
export const Module = (mf: ModuleFederation, id: string = MODULE_NAME) => {
    const RemoteBridge = createRemoteAppComponent({
        loader: () => mf.loadRemote(id),
        fallback: RethrowError,
        loading: <LoadingModule />,
    });
    const origin = registerModule(mf);

    return (props: React.ComponentProps<typeof RemoteBridge>) => (
        <ShadowContainer origin={origin}>
            <RemoteBridge {...props} />
        </ShadowContainer>
    );
};
