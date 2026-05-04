/**
 * Pages Function: /proposta-fundadores
 *
 * Protege a proposta de fundadores com HTTP Basic Auth.
 * Senha vem da variável de ambiente PROPOSTA_PASSWORD configurada
 * no painel do Cloudflare Pages.
 *
 * Username aceito: "fundador" (fixo)
 * Password: o que estiver em PROPOSTA_PASSWORD
 *
 * Acesso: thebob.io/proposta-fundadores
 */

import { PROPOSTA_HTML } from './_proposta-content';

interface Env {
  PROPOSTA_PASSWORD: string;
}

const USERNAME = 'fundador';
const REALM = 'The BoB, proposta interna';

export const onRequest: PagesFunction<Env> = async (context) => {
  const expected = context.env.PROPOSTA_PASSWORD;

  if (!expected) {
    return new Response(
      'Configuração pendente: variável PROPOSTA_PASSWORD não definida no Cloudflare Pages.',
      { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    );
  }

  const auth = context.request.headers.get('Authorization') ?? '';

  if (!auth.startsWith('Basic ')) {
    return unauthorized();
  }

  let user: string;
  let pass: string;
  try {
    const decoded = atob(auth.slice('Basic '.length));
    const idx = decoded.indexOf(':');
    user = decoded.slice(0, idx);
    pass = decoded.slice(idx + 1);
  } catch {
    return unauthorized();
  }

  if (user !== USERNAME || !timingSafeEqual(pass, expected)) {
    return unauthorized();
  }

  return new Response(PROPOSTA_HTML, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'private, no-store, max-age=0',
      'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'no-referrer',
    },
  });
};

function unauthorized(): Response {
  return new Response('Acesso restrito.', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

/**
 * Comparação em tempo constante para evitar timing attacks na senha.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
