/**
 * Pages Function: /proposta-fundadores
 *
 * Protege a proposta com tela de senha bonita (em vez do prompt nativo
 * do navegador) + cookie HMAC-signed válido por 7 dias.
 *
 * Fluxo:
 *   GET sem cookie válido        → mostra tela "Acesso Restrito" (form)
 *   POST com senha correta       → seta cookie, redireciona pra GET
 *   POST com senha errada        → mostra tela com erro inline
 *   GET com cookie HMAC válido   → serve a proposta
 *
 * Senha: env var PROPOSTA_PASSWORD configurada no Cloudflare Pages.
 */

import { PROPOSTA_HTML } from './_proposta-content';
import { renderPasswordForm } from './_password-form';

interface Env {
  PROPOSTA_PASSWORD: string;
}

const COOKIE_NAME = 'thebob_proposta_auth';
const MAX_AGE_DAYS = 7;
const MAX_AGE_SECONDS = 60 * 60 * 24 * MAX_AGE_DAYS;

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const password = env.PROPOSTA_PASSWORD;

  if (!password) {
    return new Response(
      'Configuração pendente: variável PROPOSTA_PASSWORD não definida no Cloudflare Pages.',
      { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
    );
  }

  // 1. Já está autenticado pelo cookie?
  const cookieValue = readCookie(request.headers.get('Cookie') ?? '', COOKIE_NAME);
  if (cookieValue && (await verifyCookie(cookieValue, password))) {
    return servePropostaHtml();
  }

  // 2. Submissão de senha?
  if (request.method === 'POST') {
    const form = await request.formData();
    const submitted = String(form.get('password') ?? '');
    if (submitted && timingSafeEqual(submitted, password)) {
      const cookie = await issueCookie(password);
      return new Response(null, {
        status: 303,
        headers: {
          Location: new URL(request.url).pathname,
          'Set-Cookie': `${COOKIE_NAME}=${cookie}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${MAX_AGE_SECONDS}`,
          'Cache-Control': 'no-store',
        },
      });
    }
    return servePasswordForm({ error: true });
  }

  // 3. GET inicial sem cookie, mostra tela de senha
  return servePasswordForm();
};

/* ------------------------- helpers de resposta ---------------------------- */

function commonSecurityHeaders(): Record<string, string> {
  return {
    'Cache-Control': 'private, no-store, max-age=0',
    'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
  };
}

function servePropostaHtml(): Response {
  return new Response(PROPOSTA_HTML, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      ...commonSecurityHeaders(),
    },
  });
}

function servePasswordForm({ error = false }: { error?: boolean } = {}): Response {
  const html = renderPasswordForm({ error });
  return new Response(html, {
    status: error ? 401 : 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      ...commonSecurityHeaders(),
    },
  });
}

/* ------------------------- cookie HMAC ------------------------------------ */

async function issueCookie(secret: string): Promise<string> {
  const ts = Date.now().toString();
  const sig = await hmac(ts, secret);
  return `${ts}.${sig}`;
}

async function verifyCookie(value: string, secret: string): Promise<boolean> {
  const dot = value.indexOf('.');
  if (dot === -1) return false;
  const ts = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  if (!/^\d+$/.test(ts) || !sig) return false;

  const expected = await hmac(ts, secret);
  if (!timingSafeEqual(sig, expected)) return false;

  const age = Date.now() - parseInt(ts, 10);
  return age >= 0 && age < MAX_AGE_SECONDS * 1000;
}

async function hmac(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sigBuf = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(value)
  );
  return bufferToHex(sigBuf);
}

function bufferToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/* ------------------------- utilidades ------------------------------------- */

function readCookie(header: string, name: string): string | null {
  if (!header) return null;
  const parts = header.split(';');
  for (const part of parts) {
    const [k, ...rest] = part.trim().split('=');
    if (k === name) return decodeURIComponent(rest.join('='));
  }
  return null;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
