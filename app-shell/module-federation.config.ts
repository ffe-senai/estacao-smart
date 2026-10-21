import { createModuleFederationConfig } from '@module-federation/modern-js-v3';
import { Remotes } from './remotes';


const getEntry = (g: 2 | 3 | 4 | 5) => {
    const name = `G${g}_ENTRY`
    return process.env[name]
}

const g2entry = getEntry(2);
const g3entry = getEntry(3);
const g4entry = getEntry(4);
const g5entry = getEntry(5);
const pocentry = process.env.POC_ENTRY;


export default createModuleFederationConfig({
    name: "smart",
    remotes: {
        ...(g2entry ? { [Remotes.IhmSiemens]: `smart@${g2entry}` } : {}),
        ...(g3entry ? { [Remotes.CobotUr]: `smart@${g3entry}` } : {}),
        ...(g4entry ? { [Remotes.RastreabilidadeQrCode]: `smart@${g4entry}` } : {}),
        ...(g5entry ? { [Remotes.Expedicao]: `smart@${g5entry}` } : {}),
        ...(pocentry ? { [Remotes.Poc]: `smart@${pocentry}` } : {}),
    },
    bridge: {
        enableBridgeRouter: false
    },
    dts: false
});

