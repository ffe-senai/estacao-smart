<h1>
  app-shell
  <br>
<sup>
  Aplicação Next.js da Estação SMART 4.0 - Framework Front-End
</sup>
</h1>

## Primeiros Passos

<p>
  Requisitos:<br>
  • <a href="https://git-scm.com/downloads">Git</a><br>
  • <a href="https://nodejs.org/en/download">Node.js</a>
</p>

```bash
# Instale as dependências do projeto definidas no package-lock.json
npm ci

# Inicie o projeto no localhost:3000
npm run dev
```
  Teste em:<br>
  http://localhost:3000

## Validando seu código

Rode antes de enviar. São as mesmas verificações que o GitHub faz no PR:

| Script | Uso |
|---|---|
| `npm run lint` | ESLint |
| `npm run typecheck` | Tipagem TypeScript (`next typegen` + `tsc`) |
| `npm run build` | Build de produção |

## Especificações:
- Infraestrutura em Nuvem: [Vercel](#vercel)
- Framework Front-End: [Next.js](#nextjs)
- Estilização: [Tailwind CSS](#tailwind-css)
- Componentes de Interface: [shadcn/ui](#shadcn-ui)
- Gráficos: [Recharts](#recharts)
- Ícones: [Lucide](#lucide)
- Tipografia: [Geist](#geist) e [Geist Mono](#geist-mono)
- Base de Componentes (shadcn/ui): [Base UI](#base-ui)

## Contribuindo

Para criar sua branch, enviar seu código e abrir o Pull Request, siga o [Fluxo de Trabalho](../README.md#fluxo-de-trabalho) na raiz do repositório.

## Referências:
#### <a id="vercel" href="https://vercel.com/">Vercel: Agentic Infrastructure</a>

#### <a id="nextjs" href="https://nextjs.org/">Next.js by Vercel - The React Framework</a>

#### <a id="tailwind-css" href="https://tailwindcss.com/">Tailwind CSS - Rapidly build modern websites without ever leaving your HTML</a>

#### <a id="shadcn-ui" href="https://ui.shadcn.com/">shadcn/ui - The Foundation for your Design System</a>

#### <a id="recharts" href="https://recharts.github.io/">Recharts - Re-designed charting library built with React and D3.</a>

#### <a id="lucide" href="https://lucide.dev/">Lucide</a>

#### <a id="geist" href="https://fonts.google.com/specimen/Geist">Geist - Google Fonts</a>

#### <a id="geist-mono" href="https://fonts.google.com/specimen/Geist+Mono">Geist Mono - Google Fonts</a>

#### <a id="base-ui" href="https://base-ui.com/">Unstyled UI components for accessible design systems · Base UI</a>