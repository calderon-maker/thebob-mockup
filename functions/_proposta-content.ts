// Auto-gerado a partir de proposta-fundadores.html
// Embutido para servir via Pages Function com auth
export const PROPOSTA_HTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
<meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
<title>Proposta de Estrutura · Edição Interna</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,400;1,9..144,500;1,9..144,600&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
  :root {
    --paper: #F5F1E8;
    --paper-soft: #ECE6D6;
    --ink: #0A0A0F;
    --ink-soft: #4A4A52;
    --ink-mute: #7A7A82;
    --gold: #B8941F;
    --gold-deep: #8C6F18;
    --rule: #D4CFC0;
    --green: #2D6A4F;
    --red: #9B2C2C;
    --display: 'Fraunces', Georgia, serif;
    --body: 'Inter', -apple-system, sans-serif;
    --mono: 'JetBrains Mono', monospace;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--body);
    background: var(--paper);
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
    line-height: 1.5;
  }

  .container {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 32px;
  }

  /* NAV */
  .nav {
    border-bottom: 1px solid var(--rule);
    padding: 24px 0;
    background: var(--paper);
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(8px);
  }
  .nav .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    text-decoration: none;
    color: var(--ink);
    line-height: 1;
  }
  .brand {
    font-family: var(--display);
    font-size: 20px;
    font-weight: 500;
    letter-spacing: -0.01em;
    display: block;
  }
  .brand strong {
    font-style: italic;
    font-weight: 600;
    color: var(--gold);
  }
  .tagline {
    display: block;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: var(--ink-mute);
    margin-top: 4px;
  }
  .nav-meta {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--ink-mute);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  /* HERO */
  .hero {
    padding: 120px 0 80px;
    border-bottom: 1px solid var(--rule);
  }
  .eyebrow {
    font-family: var(--mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: var(--gold-deep);
    margin-bottom: 32px;
    display: inline-block;
  }
  .hero-manifesto {
    font-family: var(--display);
    font-size: clamp(20px, 2.4vw, 28px);
    font-weight: 300;
    line-height: 1.5;
    color: var(--ink-soft);
    max-width: 780px;
    margin-bottom: 48px;
  }
  .hero-manifesto em {
    color: var(--ink);
    font-style: italic;
    font-weight: 500;
  }
  .hero h1 {
    font-family: var(--display);
    font-size: clamp(48px, 7vw, 96px);
    font-weight: 400;
    line-height: 0.96;
    letter-spacing: -0.025em;
    margin-bottom: 32px;
    max-width: 1000px;
  }
  .hero h1 em {
    font-style: italic;
    font-weight: 400;
    color: var(--gold);
  }
  .hero-lede {
    font-size: 18px;
    color: var(--ink-soft);
    max-width: 620px;
    line-height: 1.55;
  }
  .hero-meta {
    margin-top: 64px;
    padding-top: 32px;
    border-top: 1px solid var(--rule);
    display: flex;
    gap: 64px;
    flex-wrap: wrap;
  }
  .hero-meta-item {
    font-family: var(--mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--ink-mute);
  }
  .hero-meta-item strong {
    display: block;
    font-family: var(--display);
    font-size: 24px;
    color: var(--ink);
    margin-top: 8px;
    text-transform: none;
    letter-spacing: -0.01em;
    font-weight: 500;
  }

  /* SECTION HEADER */
  .section {
    padding: 100px 0;
    border-bottom: 1px solid var(--rule);
  }
  .section-head {
    margin-bottom: 64px;
    max-width: 880px;
  }
  .section h2 {
    font-family: var(--display);
    font-size: clamp(40px, 5.5vw, 72px);
    font-weight: 400;
    line-height: 1.02;
    letter-spacing: -0.02em;
    margin-bottom: 24px;
  }
  .section h2 em {
    font-style: italic;
    color: var(--gold);
    font-weight: 400;
  }
  .section-lede {
    font-size: 18px;
    color: var(--ink-soft);
    line-height: 1.55;
    max-width: 680px;
  }

  /* EQUITY BLOCK */
  .equity-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 40px;
  }
  .equity-card {
    background: var(--paper-soft);
    border: 1px solid var(--rule);
    padding: 56px 48px;
    position: relative;
    overflow: hidden;
  }
  .equity-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--gold);
  }
  .equity-label {
    font-family: var(--mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: var(--ink-mute);
    margin-bottom: 24px;
  }
  .equity-percent {
    font-family: var(--display);
    font-size: clamp(96px, 14vw, 180px);
    font-weight: 300;
    line-height: 0.85;
    letter-spacing: -0.04em;
    margin-bottom: 24px;
  }
  .equity-percent .pct-sym {
    font-size: 0.4em;
    color: var(--gold);
    vertical-align: top;
    margin-left: 4px;
    font-style: italic;
  }
  .equity-name {
    font-family: var(--display);
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  .equity-role {
    font-size: 14px;
    color: var(--ink-mute);
  }

  .equity-note {
    background: var(--ink);
    color: var(--paper);
    padding: 40px 48px;
    margin-top: 24px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 40px;
    align-items: center;
  }
  .equity-note-mark {
    font-family: var(--display);
    font-style: italic;
    font-size: 56px;
    color: var(--gold);
    line-height: 1;
  }
  .equity-note p {
    font-family: var(--display);
    font-size: 20px;
    font-weight: 300;
    line-height: 1.4;
    font-style: italic;
  }
  .equity-note p strong {
    font-weight: 500;
    font-style: normal;
    color: var(--gold);
  }

  /* PIZZA / BUCKETS */
  .pizza-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 16px;
    margin-bottom: 40px;
  }
  .bucket {
    border: 1px solid var(--rule);
    background: var(--paper-soft);
    padding: 40px 32px;
    position: relative;
    transition: transform 0.2s ease, border-color 0.2s ease;
  }
  .bucket:hover {
    transform: translateY(-2px);
    border-color: var(--gold);
  }
  .bucket-40 { grid-column: span 12; background: var(--ink); color: var(--paper); border-color: var(--ink); }
  .bucket-20 { grid-column: span 6; }
  .bucket-10 { grid-column: span 6; }
  .bucket-15 { grid-column: span 6; }

  .bucket-rank {
    font-family: var(--mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: var(--ink-mute);
    margin-bottom: 16px;
  }
  .bucket-40 .bucket-rank { color: rgba(245,241,232,0.5); }

  .bucket-pct {
    font-family: var(--display);
    font-size: clamp(72px, 9vw, 120px);
    font-weight: 300;
    line-height: 0.9;
    letter-spacing: -0.03em;
    margin-bottom: 16px;
    display: flex;
    align-items: baseline;
    gap: 4px;
  }
  .bucket-40 .bucket-pct { color: var(--gold); }
  .bucket-pct .pct-sym {
    font-size: 0.35em;
    color: var(--gold);
    font-style: italic;
  }
  .bucket-40 .bucket-pct .pct-sym { color: var(--gold); }

  .bucket-name {
    font-family: var(--display);
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 12px;
    letter-spacing: -0.01em;
  }
  .bucket-name em {
    font-style: italic;
    color: var(--gold);
  }
  .bucket-40 .bucket-name em { color: var(--gold); }

  .bucket-desc {
    font-size: 15px;
    line-height: 1.55;
    color: var(--ink-soft);
    max-width: 540px;
  }
  .bucket-40 .bucket-desc { color: rgba(245,241,232,0.75); }

  .bucket-rules {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid var(--rule);
    font-family: var(--mono);
    font-size: 11px;
    color: var(--ink-mute);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    line-height: 1.7;
  }
  .bucket-40 .bucket-rules {
    border-top-color: rgba(245,241,232,0.15);
    color: rgba(245,241,232,0.5);
  }

  .pizza-formula {
    font-family: var(--mono);
    font-size: 13px;
    color: var(--ink-mute);
    text-align: center;
    padding: 24px;
    background: var(--paper-soft);
    border: 1px dashed var(--rule);
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }
  .pizza-formula span { color: var(--gold-deep); font-weight: 600; }

  /* ARGUMENTS */
  .args-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: var(--rule);
    border: 1px solid var(--rule);
  }
  .arg-card {
    background: var(--paper);
    padding: 48px 40px;
  }
  .arg-num {
    font-family: var(--display);
    font-style: italic;
    font-size: 36px;
    color: var(--gold);
    line-height: 1;
    margin-bottom: 24px;
    font-weight: 400;
  }
  .arg-title {
    font-family: var(--display);
    font-size: 28px;
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
    margin-bottom: 16px;
  }
  .arg-title em {
    font-style: italic;
    color: var(--gold);
  }
  .arg-text {
    font-size: 15px;
    line-height: 1.6;
    color: var(--ink-soft);
  }

  /* COMPARISON TABLE */
  .compare {
    background: var(--paper-soft);
    border: 1px solid var(--rule);
    padding: 48px;
    margin-top: 48px;
  }
  .compare-title {
    font-family: var(--display);
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 32px;
    font-style: italic;
  }
  .compare-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    padding: 16px 0;
    border-bottom: 1px solid var(--rule);
    align-items: center;
  }
  .compare-row:last-child { border-bottom: none; }
  .compare-row.head {
    font-family: var(--mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--ink-mute);
    padding-bottom: 16px;
  }
  .compare-row.total {
    border-top: 2px solid var(--ink);
    border-bottom: none;
    margin-top: 8px;
    padding-top: 24px;
    font-weight: 600;
  }
  .compare-label { font-size: 15px; }
  .compare-old {
    font-family: var(--mono);
    color: var(--ink-mute);
    font-size: 14px;
  }
  .compare-new {
    font-family: var(--mono);
    color: var(--ink);
    font-size: 14px;
    font-weight: 600;
  }
  .compare-row.total .compare-new { color: var(--gold-deep); font-size: 16px; }

  /* FOUNDER LOAN */
  .loan-section {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 64px;
    align-items: start;
  }
  .loan-visual {
    background: var(--ink);
    color: var(--paper);
    padding: 56px 48px;
    position: relative;
  }
  .loan-visual::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--gold);
  }
  .loan-mark {
    font-family: var(--display);
    font-style: italic;
    font-size: 14px;
    color: var(--gold);
    text-transform: uppercase;
    letter-spacing: 0.18em;
    margin-bottom: 32px;
  }
  .loan-headline {
    font-family: var(--display);
    font-size: 32px;
    font-weight: 300;
    line-height: 1.2;
    margin-bottom: 32px;
  }
  .loan-headline em {
    font-style: italic;
    color: var(--gold);
    font-weight: 400;
  }
  .loan-flow {
    list-style: none;
    counter-reset: flow;
  }
  .loan-flow li {
    counter-increment: flow;
    padding: 16px 0 16px 56px;
    position: relative;
    border-bottom: 1px solid rgba(245,241,232,0.15);
    font-family: var(--mono);
    font-size: 13px;
    color: rgba(245,241,232,0.85);
    line-height: 1.5;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .loan-flow li::before {
    content: counter(flow, decimal-leading-zero);
    position: absolute;
    left: 0;
    top: 16px;
    font-family: var(--display);
    font-style: italic;
    font-size: 24px;
    color: var(--gold);
    font-weight: 400;
  }
  .loan-flow li:last-child { border-bottom: none; }

  .loan-text h3 {
    font-family: var(--display);
    font-size: 36px;
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: -0.015em;
    margin-bottom: 24px;
  }
  .loan-text h3 em {
    font-style: italic;
    color: var(--gold);
  }
  .loan-text p {
    font-size: 16px;
    line-height: 1.65;
    color: var(--ink-soft);
    margin-bottom: 20px;
  }
  .loan-text p strong {
    color: var(--ink);
    font-weight: 600;
  }

  /* PROTECTIONS */
  .protect-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .protect-card {
    background: var(--paper-soft);
    border: 1px solid var(--rule);
    padding: 36px 32px;
    transition: border-color 0.2s ease;
  }
  .protect-card:hover { border-color: var(--gold); }
  .protect-num {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--gold-deep);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  .protect-title {
    font-family: var(--display);
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 12px;
    letter-spacing: -0.01em;
  }
  .protect-title em { font-style: italic; color: var(--gold); }
  .protect-text {
    font-size: 14px;
    line-height: 1.6;
    color: var(--ink-soft);
  }

  /* CLOSING */
  .closing {
    padding: 140px 0 100px;
    text-align: center;
    border-top: 1px solid var(--rule);
  }
  .closing-mark {
    font-family: var(--display);
    font-style: italic;
    font-size: 64px;
    color: var(--gold);
    line-height: 1;
    margin-bottom: 32px;
  }
  .closing h2 {
    font-family: var(--display);
    font-size: clamp(40px, 6vw, 80px);
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -0.02em;
    margin-bottom: 32px;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }
  .closing h2 em {
    font-style: italic;
    color: var(--gold);
  }
  .closing-lede {
    font-size: 18px;
    color: var(--ink-soft);
    max-width: 600px;
    margin: 0 auto 48px;
    line-height: 1.55;
  }
  .closing-sig {
    margin-top: 80px;
    padding-top: 40px;
    border-top: 1px solid var(--rule);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    font-family: var(--mono);
    font-size: 11px;
    color: var(--ink-mute);
    text-transform: uppercase;
    letter-spacing: 0.18em;
  }

  /* GLOBAL FOOTER */
  .global-footer {
    padding: 32px 0;
    background: var(--ink);
    color: rgba(245,241,232,0.6);
  }
  .global-footer .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .hero { padding: 80px 0 60px; }
    .section { padding: 64px 0; }
    .equity-row { grid-template-columns: 1fr; }
    .equity-note { grid-template-columns: 1fr; gap: 24px; padding: 32px; }
    .bucket-20, .bucket-10, .bucket-15 { grid-column: span 12; }
    .args-grid { grid-template-columns: 1fr; }
    .loan-section { grid-template-columns: 1fr; gap: 40px; }
    .protect-grid { grid-template-columns: 1fr; }
    .compare { padding: 32px 24px; }
    .compare-row { grid-template-columns: 1.5fr 1fr 1fr; gap: 8px; }
    .hero-meta { gap: 32px; }
  }
</style>
</head>
<body>

<header class="nav">
  <div class="container">
    <a href="#" class="logo">
      <span class="brand">The <strong>BoB</strong></span>
      <span class="tagline">The Best of the Best</span>
    </a>
    <span class="nav-meta">Proposta dos fundadores · v1.0 · Maio 2026</span>
  </div>
</header>

<main>
  <div class="container">

    <!-- HERO -->
    <section class="hero">
      <span class="eyebrow">★ Proposta dos fundadores · Baseada em benchmarks de startups early-stage</span>
      <p class="hero-manifesto">
        A estratégia é operar como <em>empresa fora do Brasil</em>,
        usando o <em>Stripe</em> como forma de pagamento e <em>split</em> da receita.
        Estrutura financeira do projeto com percentuais alinhados às
        <em>médias de mercado para startups em estágio inicial</em>:
        <em>50/50 no equity</em>, <em>capital protegido</em> fora do Brasil,
        <em>crescimento financiado</em> antes de qualquer distribuição.
      </p>
      <div class="hero-meta">
        <div class="hero-meta-item">
          Equity
          <strong>50 / 50</strong>
        </div>
        <div class="hero-meta-item">
          Buckets operacionais
          <strong>5 partes</strong>
        </div>
        <div class="hero-meta-item">
          Jurisdição
          <strong>Wyoming, EUA</strong>
        </div>
        <div class="hero-meta-item">
          Horizonte
          <strong>4 anos · vesting</strong>
        </div>
      </div>
    </section>

    <!-- CAPÍTULO 01 — A PIZZA -->
    <section class="section">
      <div class="section-head">
        <span class="eyebrow">Capítulo 01 · Receita do dia a dia</span>
        <h2>Após Stripe e impostos, a <em>pizza líquida</em> se divide em cinco partes.</h2>
      </div>

      <div class="pizza-formula">
        Receita Bruta <span>−</span> Stripe (~3,7%) <span>−</span> Reserva Tributária <span>=</span> Pizza Líquida 100%
      </div>

      <br/>

      <div class="pizza-grid">
        <!-- 40% MÍDIA -->
        <div class="bucket bucket-40">
          <div class="bucket-rank">Bucket 01 · Crescimento</div>
          <div class="bucket-pct">40<span class="pct-sym">%</span></div>
          <div class="bucket-name">Mídia, ads & <em>vendas</em></div>
          <div class="bucket-desc">
            O motor da empresa. Google Ads, Meta, LinkedIn, agências, ferramentas de growth, eventos,
            conteúdo. <strong style="color: var(--gold);">Decisão conjunta entre os dois fundadores</strong> em canais,
            budgets mensais e contratos. Sobra acumula para o mês seguinte.
          </div>
          <div class="bucket-rules">
            Acumula até 3 meses de gasto médio · Excedente vira distribuição extra 50/50
          </div>
        </div>

        <!-- 20% OPERAÇÃO -->
        <div class="bucket bucket-20">
          <div class="bucket-rank">Bucket 02 · Execução</div>
          <div class="bucket-pct">20<span class="pct-sym">%</span></div>
          <div class="bucket-name">Operação <em>técnica</em></div>
          <div class="bucket-desc">
            Servidor, hosting, ferramentas, SaaS de produto e o pagamento pelo trabalho técnico
            executado no mês. <strong style="color: var(--gold-deep);">Responsabilidade integral da BCX.</strong>
            O founder loan perpétuo dentro deste bucket protege o <em>código-fonte</em> e o investimento técnico contínuo.
          </div>
          <div class="bucket-rules">
            BCX executa · Founder loan perpétuo · Protege o código-fonte
          </div>
        </div>

        <!-- 10% RESERVA -->
        <div class="bucket bucket-10">
          <div class="bucket-rank">Bucket 03 · Proteção</div>
          <div class="bucket-pct">10<span class="pct-sym">%</span></div>
          <div class="bucket-name">Reserva da <em>empresa</em></div>
          <div class="bucket-desc">
            Caixa estratégico da LLC. Cobre mês ruim, financia oportunidades, segura contratação
            relevante. Acumula até 3 meses de custo fixo total.
          </div>
          <div class="bucket-rules">
            Após o teto, excedente vira distribuição extra 50/50
          </div>
        </div>

        <!-- 15% SÓCIO A -->
        <div class="bucket bucket-15">
          <div class="bucket-rank">Bucket 04 · Distribuição</div>
          <div class="bucket-pct">15<span class="pct-sym">%</span></div>
          <div class="bucket-name">Fundador <em>A</em></div>
          <div class="bucket-desc">
            Distribuição mensal direta. Cada um decide o destino: deixa na LLC como reserva pessoal,
            transfere pra conta no exterior, investe em ativos US.
          </div>
          <div class="bucket-rules">
            Capital fica fora · Risco-país neutralizado · Decisão individual
          </div>
        </div>

        <!-- 15% SÓCIO B -->
        <div class="bucket bucket-15">
          <div class="bucket-rank">Bucket 05 · Distribuição</div>
          <div class="bucket-pct">15<span class="pct-sym">%</span></div>
          <div class="bucket-name">Fundador <em>B</em></div>
          <div class="bucket-desc">
            Mesma estrutura, mesma autonomia. Distribuição mensal direta, sem amarras de uso. Cada
            fundador é dono do que é seu, dentro da estrutura US.
          </div>
          <div class="bucket-rules">
            Capital fica fora · Risco-país neutralizado · Decisão individual
          </div>
        </div>
      </div>
    </section>

    <!-- CAPÍTULO 03 — POR QUE -->
    <section class="section">
      <div class="section-head">
        <span class="eyebrow">Capítulo 02 · Por que essa estrutura</span>
        <h2>A lógica de <em>startup</em> early-stage.</h2>
        <p class="section-lede">
          Distribuir mais cedo é tentador, mas mata o crescimento. Esses quatro princípios explicam
          por que reservamos 70% da pizza para a empresa, antes de pensar em nós.
        </p>
      </div>

      <div class="args-grid">
        <div class="arg-card">
          <div class="arg-num">i.</div>
          <div class="arg-title">Crescimento <em>antes</em> de distribuição.</div>
          <div class="arg-text">
            Startup em fase de aquisição precisa colocar mais capital descobrindo clientes do que
            remunerando fundadores. 40% em mídia é o que VC esperaria ver. Pagamento de fundador é
            consequência do crescimento, não prioridade. Distribuir mais agora significa crescer menos
            no ano.
          </div>
        </div>        <div class="arg-card">
          <div class="arg-num">ii.</div>
          <div class="arg-title">Desenvolvimento <em>contínuo</em>, equity preservado.</div>
          <div class="arg-text">
            O bucket de execução financia o desenvolvimento contínuo da plataforma —
            <strong>20% da pizza dedicados perpetuamente a este fim</strong>, sem qualquer
            impacto no 50/50 do equity.
          </div>
        </div>

        <div class="arg-card">
          <div class="arg-num">iii.</div>
          <div class="arg-title">Caixa estratégico <em>protege</em> ambos.</div>
          <div class="arg-text">
            10% acumulando vira 3 meses de colchão em pouco tempo. Mês ruim não quebra a estrutura,
            contratação relevante não depende de aporte novo, oportunidade não passa por falta de
            caixa. A reserva é da empresa, beneficia os dois proporcionalmente.
          </div>
        </div>

        <div class="arg-card">
          <div class="arg-num">iv.</div>
          <div class="arg-title">Empresa mais <em>valiosa</em> no longo prazo.</div>
          <div class="arg-text">
            Distribuir mais agora significa menos pizza para escalar. Com o desenho proposto, a
            empresa cresce 2x-3x mais rápido. O equity de 50% que cada um detém vale muito mais em 2-3
            anos. Distribuição alta hoje é troca ruim contra valuation futuro.
          </div>
        </div>
      </div>
    </section>

    <!-- CAPÍTULO 03 — PROTEÇÕES -->
    <section class="section">
      <div class="section-head">
        <span class="eyebrow">Capítulo 03 · Salvaguardas</span>
        <h2>O que <em>protege</em> nós dois.</h2>
        <p class="section-lede">
          Cláusulas padrão de qualquer startup séria. São bilaterais e simétricas — não favorecem
          ninguém, protegem os dois contra cenários ruins.
        </p>
      </div>

      <div class="protect-grid">
        <div class="protect-card">
          <div class="protect-num">01</div>
          <div class="protect-title"><em>Vesting</em> de 4 anos · Cliff de 1 ano</div>
          <div class="protect-text">
            Equity vai sendo "ganha" ao longo de 4 anos de trabalho conjunto. Quem sair antes do
            primeiro ano, perde 100%. Quem sair no meio do caminho, leva o que vestou. Padrão de
            mercado. Protege ambos contra abandono precoce.
          </div>
        </div>

        <div class="protect-card">
          <div class="protect-num">02</div>
          <div class="protect-title"><em>Drag-along</em> & Tag-along</div>
          <div class="protect-text">
            Se um fundador receber oferta de compra, o outro pode acompanhar (tag) ou ser obrigado a
            vender junto (drag) nas mesmas condições. Garante que nenhum dos dois fica preso quando
            o outro quer sair, e que ninguém vende em condição pior.
          </div>
        </div>

        <div class="protect-card">
          <div class="protect-num">03</div>
          <div class="protect-title">Direito de <em>preferência</em></div>
          <div class="protect-text">
            Se um quiser vender sua participação, oferece primeiro ao outro nas mesmas condições.
            Evita que terceiro estranho entre na sociedade contra a vontade do remanescente.
          </div>
        </div>

        <div class="protect-card">
          <div class="protect-num">04</div>
          <div class="protect-title"><em>Bad leaver</em> vs. Good leaver</div>
          <div class="protect-text">
            Quem sai por motivo justo (saúde, mudança de vida, comum acordo) mantém o que vestou.
            Quem sai por má conduta ou descumprimento sério perde participação. Define
            consequências antes da emoção tomar conta da decisão.
          </div>
        </div>
      </div>
    </section>

  </div>
</main>

<footer class="global-footer">
  <div class="container">
    <span>Proposta interna · Apenas entre fundadores</span>
    <span>Maio 2026 · v1.0</span>
  </div>
</footer>

</body>
</html>`;
