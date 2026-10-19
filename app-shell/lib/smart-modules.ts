"use client"

import * as mf from "@module-federation/enhanced/runtime";

export const MODULE_NAME = "smart";

export const createInstance = (name: string, entry: string) => mf.createInstance({
    name: name,
    remotes: [
        {
            type: 'module',
            name: MODULE_NAME,
            alias: name,
            entry: entry,
        }
    ]
});

const ihmSiemens = createInstance("ihm-siemens", process.env.g2entry!);
const cobotUr = createInstance("cobot-ur", process.env.g3entry!);
const rastreabilidade = createInstance("rastreabilidade", process.env.g4entry!);
const expedicao = createInstance("expedicao", process.env.g5entry!);

export { ihmSiemens, cobotUr, rastreabilidade, expedicao };