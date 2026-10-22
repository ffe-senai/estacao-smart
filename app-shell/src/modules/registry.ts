import type { ComponentType } from "react";
import { Bot, MonitorCog, ScanQrCode, Truck, type LucideIcon } from "lucide-react";
import POC from "@/modules/poc";
import { IhmSiemens } from "@/modules/ihm-siemens";
import { CobotUr } from "@/modules/cobot-ur";
import { RastreabilidadeQrCode } from "@/modules/rastreabilidade-qrcode";
import { Expedicao } from "@/modules/expedicao";

export type SmartModule = {
    /** Id da janela no layout salvo. Mesmo nome da pasta do módulo no CI. */
    id: string;
    /** Grupo responsável pelo módulo (o G1 é o App Shell). */
    group: string;
    title: string;
    description: string;
    icon: LucideIcon;
    /** Cor de destaque da janela: use uma variável do tema (--smart-*). */
    accent: string;
    /**
     * Conteúdo da janela, como o componente do módulo remoto. Sem ele, a
     * janela mostra o módulo como "não integrado".
     */
    component?: ComponentType;
};

/** Os quatro módulos da estação. Cada um abre na sua própria janela. */
export const SMART_MODULES: readonly SmartModule[] = [
    {
        id: "poc",
        group: "POC",
        title: "Prova de Conceito",
        description: "POC (Proof of Concept)",
        icon: ScanQrCode,
        accent: "var(--smart-text-digital)",
        component: POC,
    },
    {
        id: "ihm-siemens",
        group: "G2",
        title: "IHM Siemens",
        description: "Interface homem-máquina do CLP Siemens",
        icon: MonitorCog,
        accent: "var(--smart-accent-primary)",
        component: IhmSiemens
    },
    {
        id: "cobot-ur",
        group: "G3",
        title: "Cobot UR",
        description: "Robô colaborativo Universal Robots",
        icon: Bot,
        accent: "var(--smart-accent-cobot)",
        component: CobotUr
    },
    {
        id: "rastreabilidade",
        group: "G4",
        title: "Rastreabilidade",
        description: "Rastreio das peças por QR Code",
        icon: ScanQrCode,
        accent: "var(--smart-text-digital)",
        component: RastreabilidadeQrCode,
    },
    {
        id: "expedicao",
        group: "G5",
        title: "Expedição",
        description: "Saída dos produtos da estação",
        icon: Truck,
        accent: "var(--smart-accent-expedicao)",
        component: Expedicao
    }
];

export function getModule(id: string): SmartModule | undefined {
    return SMART_MODULES.find((module) => module.id === id);
}
