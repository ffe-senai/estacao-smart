<div align="center">
  <img alt="Estação SMART 4.0" src="https://github.com/user-attachments/assets/3ccb5fcb-7fc2-41db-bab9-8bc63f92e2bc" width="25.4%"  />
  <img width="3%"/>
  <img alt="SENAI" src="https://github.com/user-attachments/assets/3a062a0d-017b-4a22-a682-a9c4e34ba191" width="70%"  />
</div>
<h1>
  Estação SMART 4.0 - Framework Front-End
  <br>
<sup>
  ADS • SENAI | Turma B 2º Sem.
</sup>
</h1>

## Ambientes Disponíveis:
### Produção:<br><sup>[ffe-senai.com.br](https://ffe-senai.com.br)</sup><br>Desenvolvimento:<br><sup>[dev.ffe-senai.com.br](https://dev.ffe-senai.com.br)</sup>

## Estrutura do Repositório

| Pasta / arquivo | O que é | Quem altera |
|---|---|---|
| `app-shell/` | Aplicação Shell ([Modern.js](#modernjs)) & orquestrador de módulos | G1 |
| `poc/` | Submódulo Git do módulo [POC (Prova de Conceito)](https://github.com/ffe-senai/poc) | Time DevOps |
| `ihm-siemens/` | Submódulo Git do módulo IHM Siemens ([integração](#próximos-passos---integrar-módulo)) | G2 |
| `cobot-ur/` | Submódulo Git do módulo Cobot UR ([integração](#próximos-passos---integrar-módulo)) | G3 |
| `rastreabilidade/` | Submódulo Git do módulo Rastreabilidade ([integração](#próximos-passos---integrar-módulo)) | G4 |
| `expedicao/` | Submódulo Git do módulo Expedição ([integração](#próximos-passos---integrar-módulo)) | G5 |
| `.github/` | Workflows de CI/CD e regras do repositório | Time DevOps |

Suba apenas código e arquivos do projeto. Arquivos como `node_modules/`, `dist/` e `.env*` já são ignorados pelo `.gitignore` e **nunca** devem ser enviados.

## Primeiros Passos

<p>
  Requisitos:<br>
  • <a href="https://git-scm.com/downloads">Git</a><br>
  • <a href="https://nodejs.org/en/download">Node.js</a>
</p>

```bash

# Clone o repositório junto com os submódulos
git clone --recurse-submodules https://github.com/ffe-senai/estacao-smart.git

```
Para instalar o app-shel e rodar a aplicação, siga o [README do app-shell](app-shell/README.md).

> ⚠️ **Atenção!**<br>
> **Nunca** trabalhe direto na **`dev`**. Crie uma branch para cada tarefa:

| Tipo | Quando usar |
|---|---|
| `feat/*` | Algo novo |
| `fix/*` | Correção de erro |
| `docs/*` | Documentação |
| `style/*` | Visual ou formatação |
| `refactor/*` | Reorganizar código sem mudar o resultado |
| `chore/*` | Configuração e dependências |
| `perf/*` | Melhorar o desempenho |
| `test/*` | Adicionar ou ajustar testes |
| `build/*` | Alterações no processo de compilação |
| `ci/*` | Configuração da integração contínua |
| `revert/*` | Desfazer alterações anteriores |

## Próximos Passos - Integrar Módulo

Cada grupo publica seu módulo como um *remote* de [Module Federation](https://module-federation.io). O App Shell carrega o `remoteEntry.js` do grupo e renderiza o módulo na janela dele, com o CSS isolado.

| Grupo | Pasta (submódulo) | Variável | Produção |
|---|---|---|---|
| G2 | `ihm-siemens` | [`G2_ENTRY`](https://github.com/ffe-senai/estacao-smart/settings/variables/actions/G2_ENTRY) | `g2.ffe-senai.com.br` |
| G3 | `cobot-ur` | [`G3_ENTRY`](https://github.com/ffe-senai/estacao-smart/settings/variables/actions/G3_ENTRY) | `g3.ffe-senai.com.br` |
| G4 | `rastreabilidade` | [`G4_ENTRY`](https://github.com/ffe-senai/estacao-smart/settings/variables/actions/G4_ENTRY) | `g4.ffe-senai.com.br` |
| G5 | `expedicao` | [`G5_ENTRY`](https://github.com/ffe-senai/estacao-smart/settings/variables/actions/G5_ENTRY) | `g5.ffe-senai.com.br` |

**1. Adicione o repositório do módulo como submódulo**, na raiz, com a pasta do grupo:

```bash
git submodule add https://github.com/ffe-senai/<repositorio-do-grupo>.git <pasta>
```

**2. Configure o Module Federation no módulo** (exemplo com Vite):

```bash
npm i @module-federation/bridge-react
npm i -D @module-federation/vite
```

```ts
// vite.config.ts
import { federation } from "@module-federation/vite";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    federation({
      name: "smart",
      filename: "remoteEntry.js",
      exposes: { ".": "./src/ModuleBridge.tsx" },
      dts: false,
    }),
  ],
});
```

```tsx
// src/ModuleBridge.tsx
import App from "./App";
import { createBridgeComponent } from "@module-federation/bridge-react/v19";

export default createBridgeComponent({ rootComponent: App });
```

| Regra | Por quê |
|---|---|
| `name: "smart"` | Nome que o App Shell procura em todos os módulos |
| `exposes` com `"."` | O App Shell carrega o expose padrão do remote |
| `bridge-react/v19` | O App Shell usa React 19 |
| Sem `shared` | Cada módulo roda com o próprio React, isolado pelo bridge |
| `base: "./"` | Imagens e assets carregam do domínio do módulo |

**3. Atenda ao contrato do CI**, verificado a cada PR:

- `package.json` e o lockfile (`package-lock.json` ou `pnpm-lock.yaml`) na raiz do módulo.
- Scripts `check` (lint e tipagem) e `build`.
- O `build` gera `dist/remoteEntry.js`.

**4. Aponte a variável do grupo** para a URL completa do `remoteEntry.js`:

- **Local:** em `app-shell/.env`, por exemplo `G2_ENTRY="http://localhost:5001/remoteEntry.js"`.
- **Teste e Desenvolvimento:** em [**Settings → Secrets and variables → Actions → Variables**](https://github.com/ffe-senai/estacao-smart/settings/variables/actions), crie a variável do grupo (os links estão na tabela acima).
- **Produção:** automático, a partir do subdomínio do grupo (`https://g2.ffe-senai.com.br/remoteEntry.js`).

> ⚠️ **Somente para Desenvolvimento**<br>
> Se o grupo publicar o próprio deploy de dev (ex.: [Vercel](#vercel)), o `remoteEntry.js` precisa liberar CORS. Crie um `vercel.json` na raiz do módulo:
>
> ```json
> {
>   "headers": [
>     { "source": "/(.*)", "headers": [{ "key": "Access-Control-Allow-Origin", "value": "*" }] },
>     { "source": "/remoteEntry.js", "headers": [{ "key": "Cache-Control", "value": "no-cache" }] }
>   ]
> }
> ```
>
> Em Produção, o CI gera esse arquivo sozinho e substitui qualquer `vercel.json` do módulo.

> 💡 **Dica**<br>
> O [POC (Proof of Concept)](https://github.com/ffe-senai/poc) é um exemplo de módulo integrado ao App Shell.

## Fluxo de Trabalho

A seguir, um guia passo a passo sobre o **Fluxo de Trabalho das Operações de Desenvolvimento**.

<details>
<summary><b>1. Configure o Git</b></summary>

Só na primeira vez. Use o mesmo e-mail da sua conta do GitHub:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

No primeiro `git push`, o navegador abre para você entrar no GitHub.

</details>

<details>
<summary><b>2. Crie sua branch</b></summary>

> ⚠️ **Atenção!**<br>
> **Nunca** trabalhe direto na **`dev`**. Crie uma branch para cada tarefa:

```bash
# Vá para a branch dev
git checkout dev

# Baixe as últimas alterações
git pull

# Crie sua própria branch
git checkout -b feat/grafico-velocidade
```

O nome segue o padrão comumente adotado pelo mercado, `tipo/descricao`, em minúsculas e com hífens. Nomes fora desse formato são bloqueados.

| Tipo | Quando usar |
|---|---|
| `feat/*` | Algo novo |
| `fix/*` | Correção de erro |
| `docs/*` | Documentação |
| `style/*` | Visual ou formatação |
| `refactor/*` | Reorganizar código sem mudar o resultado |
| `chore/*` | Configuração e dependências |
| `perf/*` | Melhorar o desempenho |
| `test/*` | Adicionar ou ajustar testes |
| `build/*` | Alterações no processo de compilação |
| `ci/*` | Configuração da integração contínua |
| `revert/*` | Desfazer alterações anteriores |

</details>

<details>
<summary><b>3. Validando seu código</b></summary>

Rode antes de enviar, dentro da pasta `app-shell`. São as mesmas verificações que o GitHub faz no PR:

| Script | Uso |
|---|---|
| `pnpm run lint` | ESLint |
| `pnpm run typecheck` | Tipagem TypeScript (`tsc`) |
| `pnpm run build` | Build de produção |

</details>

<details>
<summary><b>4. Salve e envie (commit e push)</b></summary>

```bash
# Veja o que você alterou
git status

# Inclua os arquivos para subir
git add .

# Commite as mudanças com uma mensagem
git commit -m "feat: adiciona gráfico de velocidade"

# Envie para o GitHub com o comando push

# Primeira vez subindo uma branch nova:
git push -u origin feat/grafico-velocidade

# Subindo para uma branch existente:
git push
```

</details>

<details>
<summary><b>5. Gerenciando submódulos</b></summary>

**Adicionando um submódulo:**

```bash
git submodule add <repo-url> <path>
git add .gitmodules <path>
git commit -m "chore: adiciona submódulo"
git push
```

**Atualizando os submódulos existentes:**

```bash
git submodule update --init --recursive
```

**Enviando alterações feitas dentro de um submódulo:**

```bash
cd <path>
git add .
git commit -m "feat: atualiza submódulo"
git push
cd ..
git add <path>
git commit -m "chore: atualiza referência do submódulo"
git push
```

</details>

<details>
<summary><b>6. Abra o Pull Request</b></summary>

1. No [repositório](https://github.com/ffe-senai/estacao-smart), clique em **Compare & pull request**.
2. Confira: **base:** `dev` ← **compare:** `feat/sua-branch`.
3. Preencha um título e uma descrição das alterações.
4. Clique em **Create pull request**.

</details>

<details>
<summary><b>7. Acompanhe as verificações e o preview</b></summary>

Em alguns minutos aparece um comentário no PR:

- ✅ **Tudo certo:** traz o link da prévia para teste: `grafico-velocidade.ffe-senai.com.br`.
- ❌ **Algo falhou:** clique em **Ver execução** para ver o erro.

Para corrigir, altere o código na sua branch, faça um novo commit e `git push`. O PR é verificado de novo sozinho.

</details>

<details>
<summary><b>8. Faça o merge</b></summary>

Com tudo verde e o PR aprovado:

1. **Merge pull request** → **Create a merge commit**.
2. **Delete branch**.
3. Volte para a `dev` atualizada:

```bash
git checkout dev
git pull
```

</details>

<details>
<summary><b>9. Subindo para ambientes de Desenvolvimento e Produção</b></summary>

### Desenvolvimento:

> ⚠️ **Importante**<br>
> Para subir em Desenvolvimento, marque `pre-release`; caso contrário, **não** funcionará. Ou seja, não deixe marcado `release`.

**1. Publique uma pré-release na `dev`**

Em **Releases → Draft a new release**:

1. **Choose a tag:** crie a próxima versão com `-beta.N`, por exemplo `0.2.0-beta.1`.
2. **Target:** `dev`.
3. Clique em **Generate release notes** para listar o que mudou.
4. Marque **Set as a pre-release** e clique em **Publish release**.

Aguarde o *pipeline* `.github/workflows/deploy.yaml` finalizar em **Actions**.

Após concluído, o `deploy` estará disponível em [dev.ffe-senai.com.br](https://dev.ffe-senai.com.br).

> 💡 **Dica**<br>
> Você pode acompanhar o procedimento do `CI/CD` em **Actions**.

### Produção:

> ⚠️ **Importante**<br>
> Para subir em Produção, deixe marcado `release`.<br>
> Será necessário haver uma `pre-release` em Desenvolvimento anterior ao `PR`.

**2. Abra o PR da `dev` para a `prod`**

1. **base:** `prod` ← **compare:** `dev`.
2. **Create pull request** e aguarde as aprovações **CI/CD DevOps**.
3. O PR só pode ser mergeado se vier da `dev` e o último commit tiver uma pré-release.
4. **Merge pull request** → **Create a merge commit** (não apague a `dev`).

**3. Publique a release na `prod`**

Em **Releases → Draft a new release**:

1. **Choose a tag:** a mesma versão, sem o `-beta`: `0.2.0`.
2. **Target:** `prod`.
3. **Generate release notes** e **Publish release** (sem marcar pré-release).

**4. Implantação DevOps CI/CD**

Aguarde o *pipeline* `.github/workflows/deploy.yaml` finalizar em **Actions**.

Por fim, o sistema estará disponível a todos em [ffe-senai.com.br](https://ffe-senai.com.br).

| Versão | Quando |
|---|---|
| `0.2.0` → `0.2.1` | Correções |
| `0.2.1` → `0.3.0` | Funcionalidades novas |
| `0.x.x` → `1.0.0` | Primeira versão estável |

</details>

## Referências:
#### <a id="vercel" href="https://vercel.com/">Vercel: Agentic Infrastructure</a>

#### <a id="modernjs" href="https://modernjs.dev/">Modern.js - A Progressive React Framework</a>

#### <a id="module-federation" href="https://module-federation.io/">Module Federation - Micro-frontend architectural pattern</a>
