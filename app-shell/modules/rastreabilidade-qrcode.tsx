"use client"
import dynamic from 'next/dynamic';
import mf from "@/lib/smart-modules";

const RastreabilidadeQrCode = dynamic(
  () => mf.loadRemote('smart40_g4/Traceability').then((module: any) => {
      console.log("Remote Module Exports:", module);

      return module.default;
  }).catch((error: any) => {
        console.error("Error loading remote module:", error);
        return () => <div>Error loading remote module</div>;
  }),
  {
    ssr: false,
    loading: () => <div>Loading remote module...</div>,
  }
);

export default RastreabilidadeQrCode;