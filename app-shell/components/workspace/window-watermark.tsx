"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SMART_MODULES } from "@/modules/registry";
import { useWorkspace } from "./workspace-context";

/** Mostrado quando todas as janelas estão fechadas. */
export function WindowWatermark() {
    const { showModule, resetLayout } = useWorkspace();

    return (
        <div className="flex h-full flex-col items-center justify-center gap-5 p-6 text-center text-smart-text-primary">
            <Image src="/logos/smart_cube.png" alt="" width={72} height={72} className="opacity-30 grayscale" />
            <div className="space-y-1">
                <p className="text-sm font-semibold tracking-[0.05em] uppercase">Nenhuma janela aberta</p>
                <p className="text-sm text-smart-text-secondary">Abra um módulo ou restaure o layout padrão.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
                {SMART_MODULES.map((module) => {
                    const Icon = module.icon;
                    return (
                        <Button
                            key={module.id}
                            variant="outline"
                            size="sm"
                            style={{ "--module-accent": module.accent } as CSSProperties}
                            onClick={() => showModule(module)}
                        >
                            <Icon className="text-(--module-accent)" />
                            {module.title}
                        </Button>
                    );
                })}
            </div>
            <Button onClick={resetLayout}>
                <RotateCcw />
                Restaurar layout padrão
            </Button>
        </div>
    );
}
