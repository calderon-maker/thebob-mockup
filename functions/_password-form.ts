/**
 * Tela de "Acesso Restrito" da Pages Function.
 *
 * Padrão visual canônico do thebob.io:
 *   - Fundo branco editorial (#FFFFFF)
 *   - Tipografia: Fraunces (display) + Inter (body) + JetBrains Mono (eyebrow)
 *   - Ouro #B8941F como acento pontual (eyebrow + border-left do manifesto)
 *   - Logo "The BoB" + tagline "The Best of the Best" no nav
 *   - Botão primário ink/paper invertido (mesmo do .btn.primary)
 */

interface FormOptions {
  /** Texto do título principal, default editorial */
  title?: string;
  /** Manifesto curto sob o título */
  manifesto?: string;
  /** Se true, mostra mensagem de erro */
  error?: boolean;
  /** URL pra onde o form faz POST. Default: a própria página. */
  action?: string;
  /** Eyebrow no topo */
  eyebrow?: string;
}

export function renderPasswordForm(opts: FormOptions = {}): string {
  const eyebrow = opts.eyebrow ?? '★ Acesso Restrito · Edição Interna';
  const title =
    opts.title ??
    'Insira a senha para acessar a <em>proposta</em>.';
  const manifesto =
    opts.manifesto ??
    'Documento interno endereçado pessoalmente. O acesso é por senha de uso único e o conteúdo não fica indexado nem em cache.';
  const action = opts.action ?? '';
  const errorBlock = opts.error
    ? `<p class="auth-error" role="alert">Senha incorreta. Confira o convite e tenta de novo.</p>`
    : '';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
<meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
<title>Acesso Restrito · The BoB</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
  :root {
    --ink: #0B0B0B;
    --ink-2: #1F1F1F;
    --sub: #4C4C4C;
    --mute: #8A8A8A;
    --line: #E4E4E4;
    --line-strong: #BABABA;
    --soft: #F4F4F4;
    --softer: #FAFAFA;
    --paper: #FFFFFF;
    --gold: #B8941F;
    --gold-soft: #F4EBD0;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { height: 100%; }
  body {
    background: var(--paper);
    color: var(--ink);
    font-family: 'Inter', -apple-system, system-ui, sans-serif;
    font-size: 15px;
    line-height: 1.55;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  ::selection { background: var(--ink); color: var(--paper); }

  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 40px;
    width: 100%;
  }

  /* NAV (mesmo padrão do site) */
  .nav {
    border-bottom: 1px solid var(--ink);
    padding: 18px 0;
    background: var(--paper);
  }
  .nav .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
  }
  .logo {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    line-height: 1;
    gap: 4px;
  }
  .logo .brand {
    font-family: 'Fraunces', serif;
    font-weight: 400;
    font-size: 30px;
    letter-spacing: -0.02em;
    color: var(--ink);
  }
  .logo .brand strong { font-weight: 700; color: var(--ink); }
  .logo .tagline {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8.5px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--mute);
    font-weight: 500;
  }
  .nav-mark {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--mute);
    font-weight: 500;
  }

  /* MAIN */
  main {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 80px 0;
  }
  .auth-shell {
    max-width: 640px;
    margin: 0 auto;
  }
  .eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 700;
    margin-bottom: 28px;
    display: inline-block;
    padding: 6px 12px;
    border: 1px solid var(--gold);
  }
  h1 {
    font-family: 'Fraunces', serif;
    font-weight: 400;
    font-size: clamp(40px, 5.6vw, 68px);
    line-height: 1.02;
    letter-spacing: -0.02em;
    margin-bottom: 28px;
    max-width: 18ch;
  }
  h1 em { font-style: italic; color: var(--ink-2); font-weight: 300; }
  h1 strong { font-weight: 700; }
  .manifesto {
    font-family: 'Fraunces', serif;
    font-style: italic;
    font-weight: 300;
    font-size: clamp(16px, 1.5vw, 19px);
    line-height: 1.55;
    color: var(--ink-2);
    max-width: 56ch;
    padding-left: 14px;
    border-left: 2px solid var(--gold);
    margin-bottom: 48px;
  }

  /* FORM */
  form { display: flex; flex-direction: column; gap: 14px; max-width: 460px; }
  .field {
    border-bottom: 1.5px solid var(--ink);
    padding: 6px 0;
  }
  .field-label {
    display: block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--mute);
    font-weight: 500;
    margin-bottom: 4px;
  }
  input[type="password"] {
    width: 100%;
    border: none;
    background: transparent;
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 400;
    color: var(--ink);
    padding: 8px 0;
    outline: none;
    letter-spacing: 0.04em;
  }
  input[type="password"]::placeholder {
    color: var(--mute);
    font-weight: 300;
    letter-spacing: 0.02em;
  }
  input[type="password"]:focus {
    outline: none;
  }
  .field:focus-within {
    border-bottom-color: var(--gold);
  }

  .btn {
    border: 1px solid var(--ink);
    padding: 13px 22px;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink);
    text-decoration: none;
    font-weight: 500;
    background: var(--paper);
    cursor: pointer;
    display: inline-block;
    align-self: flex-start;
    margin-top: 8px;
    transition: background 0.15s ease, color 0.15s ease;
    font-family: 'Inter', sans-serif;
  }
  .btn.primary { background: var(--ink); color: var(--paper); }
  .btn.primary:hover { background: var(--paper); color: var(--ink); }

  .auth-error {
    margin-top: 4px;
    padding: 10px 14px;
    border-left: 2px solid #9B2C2C;
    background: var(--softer);
    color: #6B1F1F;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.5;
    max-width: 460px;
  }

  /* FOOTER */
  .auth-footer {
    border-top: 1px solid var(--line);
    padding: 24px 0;
    background: var(--paper);
  }
  .auth-footer .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  .footer-mark {
    font-family: 'Fraunces', serif;
    font-size: 14px;
    color: var(--sub);
  }
  .footer-mark strong { color: var(--ink); font-weight: 700; }
  .footer-meta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9.5px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--mute);
    font-weight: 500;
  }

  @media (max-width: 600px) {
    .container { padding: 0 24px; }
    main { padding: 56px 0; }
    h1 { font-size: clamp(34px, 9vw, 48px); }
  }
</style>
</head>
<body>

<header class="nav">
  <div class="container">
    <a href="https://thebob.io/" class="logo" data-no-translate>
      <span class="brand">The <strong>BoB</strong></span>
      <span class="tagline">The Best of the Best</span>
    </a>
    <span class="nav-mark">Confidencial</span>
  </div>
</header>

<main>
  <div class="container">
    <div class="auth-shell">
      <span class="eyebrow">${escapeHtml(eyebrow)}</span>
      <h1>${title}</h1>
      <p class="manifesto">${escapeHtml(manifesto)}</p>

      <form method="POST" action="${escapeAttr(action)}" autocomplete="off">
        <div class="field">
          <label class="field-label" for="password">Senha de acesso</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="••••••••••"
            required
            autofocus
            autocomplete="current-password"
            spellcheck="false"
            minlength="1"
            maxlength="200"
          />
        </div>
        ${errorBlock}
        <button type="submit" class="btn primary">Desbloquear →</button>
      </form>
    </div>
  </div>
</main>

<footer class="auth-footer">
  <div class="container">
    <span class="footer-mark">The <strong>BoB</strong> · BCX Capital</span>
    <span class="footer-meta">Não indexado · Acesso por convite</span>
  </div>
</footer>

</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(s: string): string {
  return s.replace(/"/g, '&quot;').replace(/&/g, '&amp;');
}
