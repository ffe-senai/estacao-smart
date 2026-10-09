"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import GithubButton from "./github-button";
import ReadmeBanner from "./readme-banner";

export default function GithubDialog() {

    function abrirRepositorio() {
        window.open(REPO_URL, "_blank", "noopener,noreferrer");
    }

    return (
        <Dialog>
            <DialogTrigger
                aria-label="GitHub"
                render={<GithubButton />}
            ></DialogTrigger>
            <DialogContent className={"w-226 max-w-[calc(100vw-4rem)]!"}>
                <DialogHeader>
                    <ReadmeBanner white />
                    <DialogTitle className={"text-[32px]"}>
                        Estação SMART 4.0 - Framework Front-End
                        <br />
                        <small className="flex justify-between items-center">
                            ADS • SENAI | Turma B 2º Sem.
                            <a
                                className="text-primary underline underline-offset-4 hover:text-primary/80 text-[1rem]"
                                href="https://github.com/ffe-senai/estacao-smart"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                               github.com/ffe-senai/estacao-smart
                            </a>
                        </small>
                    </DialogTitle>
                </DialogHeader>
                <GitHubDialogBody />
            </DialogContent>
        </Dialog>
    );
}

const REPO_URL = "https://github.com/ffe-senai/estacao-smart";

const AMBIENTES = [
    { nome: "Produção", url: "https://ffe-senai.com.br", host: "ffe-senai.com.br" },
    { nome: "Desenvolvimento", url: "https://dev.ffe-senai.com.br", host: "dev.ffe-senai.com.br" },
];

const ESPECIFICACOES = [
    { area: "Infraestrutura em Nuvem", itens: [{ nome: "Vercel", url: "https://vercel.com/" }] },
    { area: "Framework Front-End", itens: [{ nome: "Next.js", url: "https://nextjs.org/" }] },
    { area: "Estilização", itens: [{ nome: "Tailwind CSS", url: "https://tailwindcss.com/" }] },
    { area: "Componentes de Interface", itens: [{ nome: "shadcn/ui", url: "https://ui.shadcn.com/" }] },
    { area: "Gráficos", itens: [{ nome: "Recharts", url: "https://recharts.github.io/" }] },
    { area: "Ícones", itens: [{ nome: "Lucide", url: "https://lucide.dev/" }] },
    {
        area: "Tipografia",
        itens: [
            { nome: "Geist", url: "https://fonts.google.com/specimen/Geist" },
            { nome: "Geist Mono", url: "https://fonts.google.com/specimen/Geist+Mono" },
        ],
    },
    { area: "Base de Componentes (shadcn/ui)", itens: [{ nome: "Base UI", url: "https://base-ui.com/" }] },
];



const linkClass = "text-foreground underline-offset-4 hover:underline";

function GitHubDialogBody() {
    function abrirRepositorio() {
        window.open(REPO_URL, "_blank", "noopener,noreferrer");
    }

    return (
        <>
            <DialogDescription className="space-y-6 text-sm pb-2" render={<div />} >
                <section className="space-y-3">
                    <h2 className="font-semibold text-foreground">Ambientes Disponíveis</h2>
                    <ul className="space-y-2">
                        {AMBIENTES.map((amb) => (
                            <li key={amb.nome}>
                                <p className="font-medium text-foreground">{amb.nome}</p>
                                <a href={amb.url} target="_blank" rel="noopener noreferrer" className={`text-xs ${linkClass}`}>
                                    {amb.host}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="font-semibold text-foreground">Especificações</h2>
                    <ul className="space-y-1.5">
                        {ESPECIFICACOES.map((spec) => (
                            <li key={spec.area}>
                                {spec.area}:{" "}
                                {spec.itens.map((item, i) => (
                                    <span key={item.nome}>
                                        {i > 0 && " e "}
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                                            {item.nome}
                                        </a>
                                    </span>
                                ))}
                            </li>
                        ))}
                    </ul>
                </section>
            </DialogDescription>

            <DialogFooter>
                <GithubButton onClick={abrirRepositorio} />
            </DialogFooter>
        </>
    );
}  