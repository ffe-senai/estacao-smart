"use client";

import * as mf from "@module-federation/enhanced/runtime";

export const MODULE_NAME = "smart40";

export const createInstance = (name: string, entry: string) =>
    mf.createInstance({
        name: name,

        remotes: [
            {
                type: "module",
                name: MODULE_NAME,
                alias: name,
                entry,
            },
        ],
    });

// Uses globalThis.env set up in src/config/env.ts
const ihmSiemens = createInstance(ModuleRemotes.IhmSiemens, g2entry);
const cobotUr = createInstance(ModuleRemotes.CobotUr, g3entry);
const rastreabilidade = createInstance(ModuleRemotes.RastreabilidadeQrCode, g4entry);
const expedicao = createInstance(ModuleRemotes.Expedicao, g5entry);
const poc = createInstance(ModuleRemotes.Poc, pocentry)
export { ihmSiemens, cobotUr, rastreabilidade, expedicao, poc };