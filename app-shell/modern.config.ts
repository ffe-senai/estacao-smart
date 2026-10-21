import { appTools, defineConfig } from '@modern-js/app-tools';
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss';
import { moduleFederationPlugin } from '@module-federation/modern-js-v3';
import { logger } from '@modern-js/utils';
import { Remotes } from './remotes';

const e = (name: string) => {
  logger.error(`[Config Error] Missing environment variable "${name}"`)
  throw new Error(`[Config Error] Missing environment variable "${name}"`);
};

const i = (name: string) => {
  logger.warn(`[Config Warn] Empty environment variable "${name}"`)
  return process.env[name] ?? e(name)
};

const getEntry = (g: 2 | 3 | 4 | 5) => {
  const name = `G${g}_ENTRY`
  const e = process.env[name]
  return e || i(name)
}

const g2entry = getEntry(2);
const g3entry = getEntry(3);
const g4entry = getEntry(4);
const g5entry = getEntry(5);
const pocentry = process.env.POC_ENTRY;

export default defineConfig({
  source: {
    globalVars: {
      g2entry,
      g3entry,
      g4entry,
      g5entry,
      pocentry,
      ModuleRemotes: Remotes
    }
  },
  server: {
    port: 80
  },
  plugins: [
    appTools(),
    moduleFederationPlugin()
  ],
  builderPlugins: [pluginTailwindcss()],
});
