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

## Janelas dos módulos

A tela principal é uma área de trabalho com uma janela para cada módulo da estação, feita com o [dockview](#dockview) e o tema SMART 4.0.

| Ação | Como |
|---|---|
| Reorganizar | Arraste a aba da janela até a borda de outra janela (divide a área) ou até o centro dela (vira aba) |
| Redimensionar | Arraste o espaço entre as janelas |
| Maximizar | Botão no canto direito da barra da janela |
| Destacar | Deixa a janela flutuando sobre as outras |
| Outro monitor | Abre a janela em outra janela do navegador |
| Modelos de layout | Grade, Colunas, Foco e Abas, no cabeçalho |
| Travar | Impede arrastar, redimensionar e fechar janelas sem querer (útil em telas touch) |

O layout fica salvo no navegador. Pelos botões do cabeçalho você abre uma janela fechada ou traz uma janela para frente.

### Integrando um módulo

Cada módulo é uma entrada em `modules/registry.ts`. Para integrar, informe o componente que vai dentro da janela:

```ts
{
    id: "expedicao",
    group: "G5",
    title: "Expedição",
    // ...
    component: Expedicao, // componente do módulo remoto
},
```

Sem `component`, a janela mostra o módulo como "não integrado". O carregamento é responsabilidade do componente; se ele quebrar ao renderizar, o erro fica preso na janela dele, com um botão para tentar de novo, e as outras janelas seguem funcionando.

## Especificações:
- Infraestrutura em Nuvem: [Vercel](#vercel)
- Framework Front-End: [Next.js](#nextjs)
- Estilização: [Tailwind CSS](#tailwind-css)
- Componentes de Interface: [shadcn/ui](#shadcn-ui)
- Janelas e Layout: [dockview](#dockview)
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

#### <a id="dockview" href="https://dockview.dev/">dockview - Zero dependency layout manager</a>

#### <a id="recharts" href="https://recharts.github.io/">Recharts - Re-designed charting library built with React and D3.</a>

#### <a id="lucide" href="https://lucide.dev/">Lucide</a>

#### <a id="geist" href="https://fonts.google.com/specimen/Geist">Geist - Google Fonts</a>

#### <a id="geist-mono" href="https://fonts.google.com/specimen/Geist+Mono">Geist Mono - Google Fonts</a>

#### <a id="base-ui" href="https://base-ui.com/">Unstyled UI components for accessible design systems · Base UI</a>