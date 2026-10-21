import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Spinner } from "@/components/ui/spinner";
import { Helmet } from "@modern-js/runtime/head";
import { Outlet } from '@modern-js/runtime/router';


export const HydrateFallback = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-smart-bg-app">
      <Spinner className="size-8" />
    </div>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Helmet>
        {/* Helmet safely injects these attributes into the document's real HTML/Body tags */}
        <html lang="pt-BR" className="dark h-full antialiased" />
        <body className="bg-smart-bg-app text-smart-text-primary" />

        <title>Estação SMART 4.0 — App Shell</title>
        <meta
          name="description"
          content="Painel de Controle e Micro-Frontends da Estação SMART 4.0"
        />
      </Helmet>

      {/* Replaces the old <body> wrapper in your React tree */}
      <div className="min-h-full flex flex-col">
        <Outlet/>
        <Toaster theme="dark" position="bottom-right" />
      </div>
    </>
  );
}