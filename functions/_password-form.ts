/**
 * Tela de "Acesso Restrito" para a Pages Function que protege
 * documentos privados (proposta de fundadores, etc).
 *
 * Padrão visual canônico do TheBob: paleta Gold Editorial,
 * tipografia Fraunces + Inter, vibe revista premium.
 *
 * Uso:
 *   renderPasswordForm({ title, subtitle, error, action })
 */

interface FormOptions {
  /** Texto do título principal, default "Acesso Restrito" */
  title?: string;
  /** Texto sob o título, default genérico */
  subtitle?: string;
  /** Se true, mostra mensagem de erro */
  error?: boolean;
  /** URL pra onde o form faz POST. Default: a própria página. */
  action?: string;
  /** Tag pequena que aparece sobre o título, default "PROPOSTA · INTERNA" */
  tag?: string;
}

export function renderPasswordForm(opts: FormOptions = {}): string {
  const title = opts.title ?? 'Acesso Restrito';
  const subtitle =
    opts.subtitle ??
    'Insira a senha de acesso para visualizar a proposta de estrutura.';
  const action = opts.action ?? '';
  const tag = opts.tag ?? 'PROPOSTA · INTERNA';
  const errorBlock = opts.error
    ? `<p class="error">Senha incorreta. Confira o convite e tenta de novo.</p>`
    : '';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
<meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
<title>${escapeHtml(title)} · The BoB</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
<style>
  :root {
    --onix: #0A0A0F;
    --onix-soft: #14141C;
    --ink: #0A0A0F;
    --ink-soft: #4A4A52;
    --ink-mute: #7A7A82;
    --gold: #B8941F;
    --gold-deep: #8C6F18;
    --gold-light: #F4EBD0;
    --paper: #F5F2E8;
    --paper-soft: #ECE6D6;
    --rule: rgba(244, 235, 208, 0.16);
    --display: 'Fraunces', Georgia, serif;
    --body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { height: 100%; }
  body {
    font-family: var(--body);
    background:
      radial-gradient(ellipse at top, rgba(184, 148, 31, 0.12) 0%, transparent 55%),
      radial-gradient(ellipse at bottom right, rgba(184, 148, 31, 0.05) 0%, transparent 60%),
      var(--onix);
    color: var(--paper);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    line-height: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 20px;
    overflow: hidden;
    position: relative;
  }
  body::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(244, 235, 208, 0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(244, 235, 208, 0.025) 1px, transparent 1px);
    background-size: 80px 80px;
    pointer-events: none;
    z-index: 0;
  }
  .card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 420px;
    background: rgba(20, 20, 28, 0.85);
    border: 1px solid var(--rule);
    border-radius: 18px;
    padding: 44px 36px 36px;
    backdrop-filter: blur(24px) saturate(140%);
    -webkit-backdrop-filter: blur(24px) saturate(140%);
    box-shadow:
      0 30px 60px -20px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(244, 235, 208, 0.06);
  }
  .brand {
    text-align: center;
    margin-bottom: 28px;
  }
  .brand-mark {
    font-family: var(--display);
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--paper);
    line-height: 1;
  }
  .brand-mark em {
    font-style: italic;
    color: var(--gold);
    font-weight: 600;
  }
  .tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
    padding: 6px 14px;
    border-radius: 999px;
    background: rgba(184, 148, 31, 0.08);
    border: 1px solid rgba(184, 148, 31, 0.25);
    color: var(--gold-light);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-weight: 500;
  }
  .tag::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--gold);
    box-shadow: 0 0 8px rgba(184, 148, 31, 0.6);
  }
  h1 {
    font-family: var(--display);
    font-size: 32px;
    line-height: 1.1;
    font-weight: 600;
    letter-spacing: -0.015em;
    text-align: center;
    margin-bottom: 12px;
  }
  h1 em {
    font-style: italic;
    color: var(--gold);
    font-weight: 600;
  }
  .subtitle {
    text-align: center;
    color: var(--ink-mute);
    font-size: 14px;
    line-height: 1.55;
    margin-bottom: 32px;
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .field {
    position: relative;
  }
  input[type="password"] {
    width: 100%;
    padding: 16px 18px;
    background: var(--paper);
    border: 1px solid transparent;
    border-radius: 12px;
    font-family: var(--body);
    font-size: 15px;
    font-weight: 400;
    color: var(--ink);
    letter-spacing: 0.04em;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.05s ease;
    outline: none;
  }
  input[type="password"]:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 4px rgba(184, 148, 31, 0.15);
  }
  input[type="password"]::placeholder {
    color: var(--ink-mute);
    letter-spacing: 0.04em;
  }
  button[type="submit"] {
    background: var(--gold);
    color: var(--onix);
    border: none;
    border-radius: 12px;
    padding: 16px 24px;
    font-family: var(--body);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.05s ease, box-shadow 0.2s ease;
  }
  button[type="submit"]:hover {
    background: var(--gold-light);
    box-shadow: 0 8px 24px -8px rgba(184, 148, 31, 0.5);
  }
  button[type="submit"]:active {
    transform: translateY(1px);
  }
  .error {
    margin-top: -2px;
    padding: 10px 14px;
    background: rgba(155, 44, 44, 0.12);
    border: 1px solid rgba(155, 44, 44, 0.35);
    border-radius: 10px;
    color: #ECB7B7;
    font-size: 13px;
    line-height: 1.5;
  }
  .footer {
    margin-top: 32px;
    padding-top: 20px;
    border-top: 1px solid var(--rule);
    text-align: center;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--ink-mute);
    font-weight: 500;
  }
  .footer strong {
    color: var(--gold-light);
    font-weight: 500;
  }
  @media (max-width: 480px) {
    .card { padding: 36px 24px 28px; border-radius: 14px; }
    h1 { font-size: 26px; }
    .brand-mark { font-size: 24px; }
  }
</style>
</head>
<body>
  <main class="card">
    <div class="brand">
      <div class="brand-mark">The <em>BoB</em></div>
      <div class="tag">${escapeHtml(tag)}</div>
    </div>
    <h1>${escapeHtml(title)}</h1>
    <p class="subtitle">${escapeHtml(subtitle)}</p>
    ${errorBlock}
    <form method="POST" action="${escapeAttr(action)}" autocomplete="off">
      <div class="field">
        <input
          type="password"
          name="password"
          placeholder="Senha de acesso"
          required
          autofocus
          autocomplete="current-password"
          spellcheck="false"
          minlength="1"
          maxlength="200"
        />
      </div>
      <button type="submit">Desbloquear</button>
    </form>
    <div class="footer">
      The <strong>BoB</strong> &middot; BCX Capital
    </div>
  </main>
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
