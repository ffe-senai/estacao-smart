"use client"
import dynamic from 'next/dynamic';
import mf from "@/lib/smart-modules";

const RastreabilidadeQrCode = dynamic(
  () => mf.loadRemote<{default: React.ComponentType}>('smart40_g4/Traceability').then((module) => {
      console.log("Remote Module Exports:", module);

      return module!.default;
  }).catch((error: Error) => {
        console.error("Error loading remote module:", error);
        // eslint-disable-next-line react/display-name
        return () => <div>Error loading remote module</div>;
  }),
  {
    ssr: false,
    loading: () => <div>Loading remote module...</div>,
  }
);

export default RastreabilidadeQrCode;