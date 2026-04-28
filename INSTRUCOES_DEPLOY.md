# Mockup navegável v3, instruções de deploy

> Esta pasta é **simultaneamente** a fonte editável dos mockups **e** o repositório git que alimenta o TheBob via **Cloudflare Pages**. Trabalha-se em `main` (staging com preview por branch), aprova-se mergeando para `production` (produção em `thebob.io`).

**Última atualização:** 27 de abril de 2026.

---

## Onde está cada coisa

```
02_Mockup_Navegavel/v3_navegavel/        ← você está aqui (= repo git)
├── .git/                                ← remote: github.com/calderon-maker/thebob-mockup
├── .gitignore                           ← ignora *.bak, .DS_Store
├── INSTRUCOES_DEPLOY.md                 ← este arquivo
│
├── styles.css                           ← CSS único, todas as páginas dependem
│
├── index.html                           ← landing pública (servida na raiz de thebob.io)
├── growth.html                          ← edição genérica "Growth, Abril 2026" (template)
├── fractional.html                      ← edição real, 10 Fractional CMO BR coletados
│
├── perfil.html                          ← perfil genérico de Member (template)
├── dashboard.html                       ← dashboard genérico de Member (template)
│
├── scheila-perfil.html                  ← perfil real de Scheila F. (Legend #1)
├── scheila-dashboard.html               ← dashboard real de Scheila F.
│
├── apresentacao.html                    ← deck de apresentação do produto
│
└── *.html.bak                           ← backups locais, ignorados pelo git
```

**Repo público:** [github.com/calderon-maker/thebob-mockup](https://github.com/calderon-maker/thebob-mockup)
**Produção (branch `production`):** [thebob.io](https://thebob.io)
**Staging (branch `main`):** [main.thebob-mockup.pages.dev](https://main.thebob-mockup.pages.dev)
**Preview por branch (qualquer branch dev/feature):** `<branch-slug>.thebob-mockup.pages.dev`

---

## Como editar e publicar

O fluxo tem dois passos: **publicar em staging** (push em `main`) e depois **promover pra produção** (merge `main` → `production` e push).

### Passo 1, publicar em staging

```bash
cd "/Users/calderon/Documents/ecamp AI LABs/clientes/thebob.com.br/02_Mockup_Navegavel/v3_navegavel"

# 1. Edita o arquivo que precisa (index.html, styles.css, etc)
# 2. Confere o que mudou
git status
git diff

# 3. Commit e push em main (staging)
git checkout main
git add .
git commit -m "fix: <descrição da mudança>"
git push origin main
```

Cloudflare Pages reconstrói em ~10s. O resultado fica em `main.thebob-mockup.pages.dev`. Conferir lá antes de promover.

### Passo 2, promover pra produção

Depois de validar em staging, sobe pro `thebob.io`:

```bash
git checkout production
git merge main
git push origin production
git checkout main          # volta pra branch de trabalho
```

Cloudflare Pages publica em `thebob.io` em ~10s. Histórico de deploys e rollback ficam disponíveis no painel da Cloudflare Pages.

### Branches de feature (opcional)

Trabalho experimental pode ir em branch própria. Cada push gera preview URL automática:

```bash
git checkout -b feat/redesign-cards
# ...edita...
git push origin feat/redesign-cards   # preview em feat-redesign-cards.thebob-mockup.pages.dev
```

---

## Convenções

- **Sempre commit em português, BR**, primeira pessoa do plural ou imperativo curto. Ex: `fix(mobile): cards ganham contorno`, `feat: edição de Fractional CMO`.
- **CSS único** em `styles.css`, não criar arquivos novos. Se a regra for específica de uma página, escopa pelo seletor da página, não cria CSS separado.
- **Imagens hospedadas externamente** (LinkedIn CDN, Unsplash, placeholder) sempre com `onerror="this.src='https://placehold.co/...'"` como fallback. Os URLs do LinkedIn `media.licdn.com` têm assinatura que expira em ~6 meses, prever recoleta antes da próxima edição.
- **Nomes de arquivo** em minúsculo, hífen, sem acento. Ex: `scheila-perfil.html`, não `perfil_Scheila.html`.
- **Backups locais** em `*.bak` ficam fora do git (ignorados).

---

## Como criar uma página de pessoa nova

Quando uma nova vertical entrar (ex.: Consultor de Growth, Agência de Performance):

1. Rodar o benchmark do pipeline na vertical:
   ```bash
   cd "/Users/calderon/Documents/ecamp AI LABs/clientes/thebob.com.br/06_MVP_Tecnico/thebob"
   pnpm --filter @thebob/pipeline benchmark:pilot
   ```
   Isso atualiza `apps/pipeline/benchmarks/results-<vertical>-<data>-v2.json` com os dados reais.

2. Ajustar o builder Python correspondente (`/tmp/build-fractional-html.py`, `/tmp/build-scheila-pages.py`) para apontar para o novo JSON e gerar a nova lista, novo perfil e novo dashboard.

3. Mover os HTMLs gerados para esta pasta, commitar e pushar.

Para o Sprint 2 (que vai trazer filiação institucional + score completo), vale converter os builders num pacote `apps/pipeline/src/render/` para parar de depender de scripts em `/tmp`.

---

## Como atualizar o card de uma pessoa específica

Cada card no `index.html` ou `fractional.html` tem foto, nome, cargo curto, métricas resumidas e link. Para trocar a foto:

1. Pegar a URL real do `media.licdn.com` no JSON do benchmark, **completa** (com `?e=...&v=beta&t=...`). Cuidado, hashes inventados quebram a imagem (vide bug Paulo/Lara em 25/04).
2. Substituir o `src` do `<img>` na seção correspondente.

Para reanimar o cache local enquanto trabalha, abrir o arquivo no navegador com **Cmd+Shift+R** (force refresh).

---

## Checklist de release

Antes de promover de staging pra produção (nova vertical, nova edição):

- [ ] `git status` mostra só os arquivos esperados (sem `.bak` vazando)
- [ ] Abrir cada `.html` modificado no navegador, conferir desktop + mobile (DevTools 375px)
- [ ] Imagens carregam (sem caixa "B" de fallback) em todos os cards
- [ ] Links internos funcionam (index → fractional → perfil → dashboard)
- [ ] Links externos para LinkedIn abrem em nova aba
- [ ] Push em `main` foi feito, preview em `main.thebob-mockup.pages.dev` está OK
- [ ] Testar em celular real, iOS e Android se possível
- [ ] Só então merge `main → production` e push de `production`

---

## Hospedagem (Cloudflare Pages)

O site é servido pelo **Cloudflare Pages** (não GitHub Pages). O repo `calderon-maker/thebob-mockup` está conectado ao projeto `thebob-mockup` na Cloudflare. A cada push, a Cloudflare faz build (estático, sem build step) e publica.

### Mapeamento de branch para ambiente

| Branch | Ambiente | URL |
|---|---|---|
| `production` | Produção | [thebob.io](https://thebob.io) |
| `main` | Staging | [main.thebob-mockup.pages.dev](https://main.thebob-mockup.pages.dev) |
| `feat/*`, `fix/*`, etc. | Preview por branch | `<branch-slug>.thebob-mockup.pages.dev` |

### Configuração do projeto na Cloudflare Pages

Settings já travados (não mexer sem motivo):

- Production branch: `production`
- Build command: vazio (site estático)
- Build output directory: `/` (raiz do repo)
- Framework preset: None
- Node version: irrelevante (não há build)

### Custom domain (thebob.io)

O `thebob.io` está registrado na mesma conta Cloudflare e foi adicionado como custom domain do projeto Pages. A Cloudflare gerencia DNS, SSL e edge cache automaticamente, sem necessidade de A/AAAA records manuais.

### Verificação

```bash
# Produção respondendo?
curl -I https://thebob.io

# Staging respondendo?
curl -I https://main.thebob-mockup.pages.dev
```

Ambos devem retornar `HTTP/2 200` e header `cf-ray` (que confirma origem Cloudflare).

---

## Histórico

| Data | Mudança |
|---|---|
| 24/04/2026 | Mockup v3 criado: `home`, `index`, `perfil`, `dashboard`, `apresentacao` (genéricos) |
| 25/04/2026 | Repo `calderon-maker/thebob-mockup` publicado no GitHub Pages |
| 25/04/2026 | `fractional.html` populado com os 10 Fractional CMO BR reais (coleta 25/04) |
| 25/04/2026 | `scheila-perfil.html` e `scheila-dashboard.html` criados com dados reais da Legend #1 |
| 25/04/2026 | Refinamento mobile: hero #1 em linha inteira, leaders viram listagem horizontal, cards Legend ganham contorno e respiro |
| 25/04/2026 | Pasta `v3_navegavel/` consolidada como fonte = repo (antes vivia em `/tmp/thebob-mockup-build`) |
| 27/04/2026 | Switcher de idioma PT/EN/ES (bandeiras SVG inline) adicionado no nav de 7 páginas, sem mexer em paleta ou tipografia |
| 27/04/2026 | Domínio próprio `thebob.io` configurado: arquivo `CNAME` no repo + DNS A/AAAA records do GitHub Pages no provedor de domínio + Custom domain habilitado em Settings → Pages |
| 27/04/2026 | Renomeação para alinhar com convenção: `home.html` → `index.html` (landing servida na raiz), `index.html` (edição Growth) → `growth.html` (segue padrão das outras verticais como `fractional.html`). Todas as referências internas atualizadas via sed em 8 arquivos. |
| 27/04/2026 | "The Best of Best" → "The Best of the Best" em 13 ocorrências (titles, taglines do logo, eyebrow do hero, footer global) em 8 arquivos. |
| 27/04/2026 | **Migração de hospedagem: GitHub Pages → Cloudflare Pages.** Branch `production` criada apontando pro mesmo commit do `main`. Arquivo `CNAME` removido (Cloudflare Pages tem mecanismo próprio de custom domain). Fluxo de trabalho passa a ser staging em `main` (preview por branch grátis) + produção em `production` (mergeada quando aprovada). Domínio `thebob.io` aponta pro projeto Pages na conta Cloudflare do calderon. |
