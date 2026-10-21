// "use client";

// import * as mf from "@module-federation/enhanced/runtime";

// export const MODULE_NAME = "smart";

// export const createInstance = (name: string, entry: string) =>
//     mf.createInstance({
//         name: name,

//         remotes: [
//             {
//                 type: "module",
//                 name: MODULE_NAME,
//                 alias: name,
//                 entry: entry,
//             },
//         ],
//     });

// // Uses globalThis.env set up in src/config/env.ts
// const ihmSiemens = createInstance("ihm-siemens", g2entry);
// const cobotUr = createInstance("cobot-ur", g3entry);
// const rastreabilidade = createInstance("rastreabilidade", g4entry);
// const expedicao = createInstance("expedicao", g5entry);
// const poc = createInstance("poc", pocentry)
// export { ihmSiemens, cobotUr, rastreabilidade, expedicao, poc };