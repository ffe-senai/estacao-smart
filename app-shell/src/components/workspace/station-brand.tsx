
export function StationBrand() {
    return (
        <div className="flex shrink-0 items-center gap-2.5">
            <img src="/logos/smart_cube.png" alt="" width={34} height={34} fetchPriority="high" />
            <div className="sr-only leading-tight lg:not-sr-only">
                <p className="text-sm font-semibold tracking-wider text-smart-text-primary uppercase">
                    Estação SMART 4.0
                </p>
                <p className="text-[11px] tracking-[0.08em] text-smart-text-secondary uppercase">Painel de controle</p>
            </div>
        </div>
    );
}

export function SenaiMark() {
    return (
        <img
            src="/logos/SENAI_logo.png"
            alt="SENAI"
            width={4096}
            height={1050}
            className="hidden h-7 w-auto shrink-0 lg:block"
        />
    );
}
