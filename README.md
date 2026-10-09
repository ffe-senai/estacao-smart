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

## Primeiros Passos

<p>
  Requisitos:<br>
  • <a href="https://git-scm.com/downloads">Git</a><br>
  • <a href="https://nodejs.org/en/download">Node.js</a>
</p>

```bash
  # Clone o repositório
git clone https://github.com/ffe-senai/estacao-smart.git   

 # Entre no diretório do app-shell
cd estacao-smart/app-shell  

  # Instale as dependências do projeto definidas no package-lock.json
npm ci                    

  # Inicie o projeto no localhost:3000
npm run dev          
```
  Teste em:<br>
  http://localhost:3000

## Especificações:
- Infraestrutura em Nuvem: [Vercel](#vercel)
- Framework Fron-End: [Next.js](#nextjs)
- Estilização: [Tailwind CSS](#tailwind-css)
- Componentes de Interface: [shadcn/ui](#shadcn-ui)
- Gráficos: [Recharts](#recharts)
- Ícones: [Lucide](#lucide)
- Tipografia: [Geist](#geist) e [Geist Mono](#geist-mono)
- Base de Componentes (shadcn/ui): [Base UI](#base-ui)

## Próximos Passos

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

> [!IMPORTANT]
> Atenção!

**Nunca** trabalhe direto na **`dev`**. Crie uma branch para cada tarefa:

```bash
  # Vá para a branch dev
git checkout dev

  # Baixe as últimas alterações
git pull

  # Crie sua própria branch
git checkout -b feat/grafico-velocidade
```

O nome segue padrão comumente adotado pelo mercado `tipo/descricao`, em minúsculas e com hífens. Nomes fora desse formato são bloqueados.

| Tipo | Quando usar |
|---|---|
| `feat` | Algo novo |
| `fix` | Correção de erro |
| `docs` | Documentação |
| `style` | Visual ou formatação |
| `refactor` | Reorganizar código sem mudar o resultado |
| `chore` | Configuração e dependências |

</details>

<details>
<summary><b>3. Validando seu código</b></summary>

Rode antes de enviar. São as mesmas verificações que o GitHub faz no PR:

| Script | Uso |
|---|---|
| `npm run lint` | ESLint |
| `npm run typecheck` | Tipagem (`next typegen` + `tsc`) `# Typescript` |
| `npm run build` | Build de produção |

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

 # Subindo para um branch existente:
git push
```

</details>

<details>
<summary><b>5. Abra o Pull Request</b></summary>

1. No [repositório](https://github.com/ffe-senai/estacao-smart), clique em **Compare & pull request**.
2. Confira: **base:** `dev` ← **compare:** `feat/sua-branch`.
3. Preencha um título e uma descrição das alterações.
4. Clique em **Create pull request**.

</details>

<details>
<summary><b>6. Acompanhe as verificações e o preview</b></summary>

Em alguns minutos aparece um comentário no PR:

- ✅ **Tudo certo:** traz o link da prévia para teste: `grafico-velocidade.ffe-senai.com.br`.
- ❌ **Algo falhou:** clique em **Ver execução** para ver o erro.

Para corrigir, altere o código na sua branch, faça um novo commit e `git push`. O PR é verificado de novo sozinho.

</details>

<details>
<summary><b>7. Faça o merge</b></summary>

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
<summary><b>8. Subindo para ambientes de Desenvolvimento e Produção</b></summary>

### Desenvolvimento:

> [!IMPORTANT]
> Para subir em Desenvolvimento marcar `pre-release`; **não** funcionará caso o contrário, ou seja, não deixe marcado `release`.

**1. Publique uma pré-release na `dev`**

Em **Releases → Draft a new release**:

1. **Choose a tag:** crie a próxima versão com `-beta.N`, por exemplo `0.2.0-beta.1`.
2. **Target:** `dev`.
3. Clique em **Generate release notes** para listar o que mudou.
4. Marque **Set as a pre-release** e clique em **Publish release**.

Aguardar *pipelines* `.github/workflows/ci.yaml` e `.github/workflows/deploy.yaml` finalizarem em **Actions**.

Após completados o `deploy` estará disponível em [dev.ffe-senai.com.br](https://dev.ffe-senai.com.br).

> [!TIP]
> Você pode acompanhar o procedimento do `CI/CD` em **Actions**.

### Produção:

> [!IMPORTANT]
> Para subir em Produção deixar marcado `release`.
> 
> Será necessário haver uma `pre-release` em Desenvolvimento antecessora ao `PR`.


**2. Abra o PR da `dev` para a `prod`**

1. **base:** `prod` ← **compare:** `dev`.
2. **Create pull request** e aguardar aprovações **CI/CD DevOps**.
3. O PR só pode ser mergeado se vier da `dev` e o último commit for uma pré-release.
4. **Merge pull request** → **Create a merge commit** (não apague a `dev`).

**3. Publique a release na `prod`**

Em **Releases → Draft a new release**:

1. **Choose a tag:** a mesma versão, sem o `-beta`: `0.2.0`.
2. **Target:** `prod`.
3. **Generate release notes** e **Publish release** (sem marcar pré-release).

**4. Implantação DevOps CI/CD**

 Aguardar *pipelines* `.github/workflows/ci.yaml` e `.github/workflows/deploy.yaml` finalizarem em **Actions**.

 Por fim o sistema estará disponível a todos em [ffe-senai.com.br](https://ffe-senai.com.br).

| Versão | Quando |
|---|---|
| `0.2.0` → `0.2.1` | Correções |
| `0.2.1` → `0.3.0` | Funcionalidades novas |
| `0.x.x` → `1.0.0` | Primeira versão estável |

</details>




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