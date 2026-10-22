import type { ReactNode } from "react";

/** Estado centralizado de uma janela (carregando, erro, não integrado...). */
export function WindowState({ icon, title, children }: { icon?: ReactNode; title: string; children?: ReactNode }) {
    return (
        <div className="flex min-h-full flex-col items-center justify-center gap-3 p-6 text-center">
            {icon}
            <p className="text-sm font-semibold tracking-[0.05em] uppercase">{title}</p>
            {children}
        </div>
    );
}
