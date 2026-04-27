# Mockup navegável v3, instruções de deploy

> Esta pasta é **simultaneamente** a fonte editável dos mockups **e** o repositório git que alimenta a página pública do TheBob via GitHub Pages. Editar aqui e dar push é tudo que precisa.

**Última atualização:** 25 de abril de 2026.

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
├── home.html                            ← landing pública (link, preview top 5)
├── index.html                           ← edição genérica "Growth, Abril 2026" (template)
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
**URL pública (custom domain):** [thebob.io](https://thebob.io)
**Fallback (GitHub Pages padrão):** [calderon-maker.github.io/thebob-mockup/](https://calderon-maker.github.io/thebob-mockup/)

---

## Como editar e publicar

```bash
cd "/Users/calderon/Documents/ecamp AI LABs/clientes/thebob.com.br/02_Mockup_Navegavel/v3_navegavel"

# 1. Edita o arquivo que precisa (home.html, styles.css, etc)
# 2. Confere o que mudou
git status
git diff

# 3. Commit e push
git add .
git commit -m "fix: <descrição da mudança>"
git push origin main
```

GitHub Pages reconstrói em ~30-60 s. Para conferir antes do push, abrir o arquivo `.html` direto no Finder (basta duplo-clique).

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

Cada card no `home.html` ou `fractional.html` tem foto, nome, cargo curto, métricas resumidas e link. Para trocar a foto:

1. Pegar a URL real do `media.licdn.com` no JSON do benchmark, **completa** (com `?e=...&v=beta&t=...`). Cuidado, hashes inventados quebram a imagem (vide bug Paulo/Lara em 25/04).
2. Substituir o `src` do `<img>` na seção correspondente.

Para reanimar o cache local enquanto trabalha, abrir o arquivo no navegador com **Cmd+Shift+R** (force refresh).

---

## Checklist de release

Antes de pushar mudança grande (nova vertical, nova edição):

- [ ] `git status` mostra só os arquivos esperados (sem `.bak` vazando)
- [ ] Abrir cada `.html` modificado no navegador, conferir desktop + mobile (DevTools 375px)
- [ ] Imagens carregam (sem caixa "B" de fallback) em todos os cards
- [ ] Links internos funcionam (home → fractional → perfil → dashboard)
- [ ] Links externos para LinkedIn abrem em nova aba
- [ ] Esperar 60s após o push, abrir o GitHub Pages e force-refresh
- [ ] Testar em celular real, iOS e Android se possível

---

## Domínio próprio (thebob.io)

A pasta tem um arquivo `CNAME` (sem extensão) com o conteúdo `thebob.io`. Esse arquivo é lido pelo GitHub Pages e diz "este é o domínio canônico desse repo". Não editar à mão (o Settings → Pages do GitHub também regrava esse arquivo quando você muda o Custom domain pela UI).

### DNS no provedor do domínio

No painel onde o `thebob.io` foi registrado (Cloudflare, Namecheap, Registro.br, etc.), adicionar os seguintes registros no apex (`thebob.io`, geralmente representado como `@`):

```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
AAAA  @     2606:50c0:8000::153
AAAA  @     2606:50c0:8001::153
AAAA  @     2606:50c0:8002::153
AAAA  @     2606:50c0:8003::153
CNAME www   calderon-maker.github.io.
```

Os 4 IPs (e os 4 IPv6) são fixos do GitHub Pages e raramente mudam. O CNAME `www` é opcional, serve só pra `www.thebob.io` redirecionar pro apex.

Na Cloudflare especificamente, deixar o "Proxy status" desligado (nuvem cinza, não laranja) durante a configuração inicial. Depois que o GitHub emitir o cert HTTPS, pode ligar o proxy se quiser camadas extras de cache/CDN.

### GitHub Pages (Settings → Pages do repo)

1. `Custom domain` → digitar `thebob.io` → Save
2. Aguardar 5 a 60 minutos pelo "DNS check successful" (o GitHub valida os A records antes de prosseguir)
3. Marcar `Enforce HTTPS` (só fica habilitável depois do cert Let's Encrypt ser emitido, demora mais alguns minutos)

### Verificação

```bash
# DNS resolveu para os IPs do GitHub?
dig +short thebob.io

# Página responde com HTTPS?
curl -I https://thebob.io
```

A primeira deve retornar os 4 IPs do bloco 185.199.108-111.153. A segunda deve retornar `HTTP/2 200`.

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
