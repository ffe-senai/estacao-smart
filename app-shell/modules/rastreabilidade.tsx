import mf from "./module-federation"

const Rastreabilidade = mf("rastreabilidade", process.env.g4entry!);

export default Rastreabilidade;
export { Rastreabilidade };