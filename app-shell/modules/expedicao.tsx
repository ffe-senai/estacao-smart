import mf from "./module-federation"

const Expedicao = mf("expedicao", process.env.g5entry!);

export default Expedicao;
export { Expedicao };