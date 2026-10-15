import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const e = (e:string) => {throw new Error(e)}

module.exports = {
  env: {
    g2entry: process.env.G2_ENTRY ?? e("No entry defined for G2"),
    g3entry: process.env.G3_ENTRY ?? e("No entry defined for G3"),
    g4entry: process.env.G4_ENTRY ?? e("No entry defined for G4"),
    g5entry: process.env.G5_ENTRY ?? e("No entry defined for G5"),
  },
}

export default nextConfig;
