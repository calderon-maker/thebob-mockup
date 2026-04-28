/**
 * The BoB, motor de tradução on-the-fly
 *
 * Usa o endpoint público do Google Translate (sem chave de API). Itera os text
 * nodes do <body>, traduz em batches paralelos, troca o DOM, cacheia em
 * sessionStorage. Clicar PT restaura os originais salvos em memória.
 *
 * Termos da marca (The BoB, The Best of the Best, BoBs, entidades parceiras
 * etc.) são protegidos via placeholders antes da chamada ao Google e
 * restaurados depois, garantindo que nunca sejam traduzidos.
 *
 * Para produção real, trocar `translateText` por chamada a um serviço com SLA
 * (DeepL, Google Cloud Translation, Cloudflare Workers AI) e/ou substituir por
 * JSON estático de strings curado por revisão humana.
 */
(function () {
  'use strict';

  var BATCH_SIZE = 8;
  var SOURCE_LANG = 'pt-BR';
  var STORAGE_PREFIX = 'bob_translate_';

  // Termos que NUNCA devem ser traduzidos. Ordem importa, mais longos primeiro
  // para evitar match parcial (ex.: "The Best of the Best" antes de "The BoB",
  // "The BoB of" antes de "The BoB").
  var BRAND_TERMS = [
    'The Best of the Best',
    'TheBestOf',
    'The BoB of',
    'the BoB of',
    'The BoB',
    'the BoB',
    'TheBoB',
    'BoBs',
    'BoB',
    'thebob.io',
    'thebob',
    'BCX',
    'ecommerceCAMP',
    // Entidades parceiras (siglas, devem permanecer literais)
    'ABRADI', 'IAB', 'WIM', 'ABA', 'Abramark', 'ABO', 'AMPRO', 'ABEMD',
    'ABEP', 'ABMI', 'IBRAMERC', 'ABRAREC', 'IDV', 'ABComm', 'Aberje',
    'AKATU', 'Conarec', 'ASPMAG', 'ABMN',
    // Verticais (mantém em inglês mesmo no PT)
    'Fractional CMO', 'Growth', 'Performance', 'Brand', 'SEO',
    // Tiers
    'Hall of Fame', 'Legends', 'Leaders', 'Rising', 'Watching',
    // Tech
    'LinkedIn', 'Instagram', 'TikTok', 'YouTube', 'Apify', 'Firecrawl',
    'Cloudflare', 'Cloudflare Pages'
  ];

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Substitui termos da marca por placeholders Unicode raros antes da
  // tradução. Os caracteres ❯ e ❮ (U+276F e U+276E) são incomuns o
  // suficiente para o Google Translate deixá-los intactos.
  function protectBrandTerms(text) {
    var map = {};
    var counter = 0;
    var out = text;
    for (var i = 0; i < BRAND_TERMS.length; i++) {
      var term = BRAND_TERMS[i];
      var rx = new RegExp(escapeRegex(term), 'g');
      out = out.replace(rx, function (match) {
        var ph = '❯' + 'BRAND' + counter + '❮';
        map[ph] = match;
        counter++;
        return ph;
      });
    }
    return { text: out, map: map };
  }

  function restoreBrandTerms(text, map) {
    var out = text;
    Object.keys(map).forEach(function (ph) {
      out = out.split(ph).join(map[ph]);
    });
    return out;
  }

  // Limpa artigos órfãos que sobram quando "o The BoB" (PT) é traduzido como
  // "the The BoB" (EN) ou "el The BoB" (ES). Aplicado depois da restauração.
  function cleanOrphanArticles(text) {
    var brandStart = '(The BoB(?:s| of)?|The Best of the Best|TheBestOf|TheBoB)';
    return text
      // Inglês: the The BoB → The BoB
      .replace(new RegExp('\\bthe\\s+' + brandStart, 'gi'), '$1')
      // Espanhol: el|la|los|las The BoB → The BoB
      .replace(new RegExp('\\b(?:el|la|los|las)\\s+' + brandStart, 'gi'), '$1');
  }

  var originalSnapshot = null; // [{ node, value }]
  var isTranslating = false;

  function isTranslatable(node) {
    var parent = node.parentElement;
    if (!parent) return false;
    var tag = parent.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return false;
    if (parent.closest('[data-no-translate]')) return false;
    if (!node.nodeValue.trim()) return false;
    return true;
  }

  function collectTextNodes() {
    var nodes = [];
    var walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (n) {
          return isTranslatable(n)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        }
      }
    );
    var n;
    while ((n = walker.nextNode())) nodes.push(n);
    return nodes;
  }

  function snapshot() {
    if (originalSnapshot) return originalSnapshot;
    var nodes = collectTextNodes();
    originalSnapshot = nodes.map(function (n) {
      return { node: n, value: n.nodeValue };
    });
    return originalSnapshot;
  }

  function preserveSpacing(originalValue, translated) {
    var lead = (originalValue.match(/^\s*/) || [''])[0];
    var trail = (originalValue.match(/\s*$/) || [''])[0];
    return lead + translated + trail;
  }

  function translateText(text, targetLang) {
    // Protege termos da marca antes de mandar pra API
    var protectedPayload = protectBrandTerms(text);
    var url =
      'https://translate.googleapis.com/translate_a/single?client=gtx' +
      '&sl=' + encodeURIComponent(SOURCE_LANG) +
      '&tl=' + encodeURIComponent(targetLang) +
      '&dt=t&q=' + encodeURIComponent(protectedPayload.text);

    return fetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data || !Array.isArray(data[0])) return text;
        var translated = data[0]
          .map(function (seg) { return Array.isArray(seg) ? seg[0] : ''; })
          .join('');
        // Restaura termos da marca e limpa artigos órfãos
        var restored = restoreBrandTerms(translated, protectedPayload.map);
        return cleanOrphanArticles(restored);
      })
      .catch(function () { return text; });
  }

  function translateBatch(texts, targetLang) {
    var results = new Array(texts.length);
    var i = 0;

    function next() {
      if (i >= texts.length) return Promise.resolve();
      var batchStart = i;
      var batchEnd = Math.min(i + BATCH_SIZE, texts.length);
      i = batchEnd;
      var promises = [];
      for (var j = batchStart; j < batchEnd; j++) {
        (function (idx) {
          promises.push(
            translateText(texts[idx].trim(), targetLang).then(function (out) {
              results[idx] = out;
            })
          );
        })(j);
      }
      return Promise.all(promises).then(next);
    }

    return next().then(function () { return results; });
  }

  function setActiveFlag(lang) {
    var flags = document.querySelectorAll('.lang-switcher a');
    for (var i = 0; i < flags.length; i++) {
      var href = flags[i].getAttribute('href') || '';
      flags[i].classList.toggle('active', href === '?lang=' + lang);
    }
  }

  function showLoading(state) {
    var sw = document.querySelector('.lang-switcher');
    if (!sw) return;
    sw.style.opacity = state ? '0.5' : '';
    sw.style.pointerEvents = state ? 'none' : '';
  }

  function applyTranslations(snap, translated) {
    snap.forEach(function (entry, i) {
      if (translated[i]) {
        entry.node.nodeValue = preserveSpacing(entry.value, translated[i]);
      }
    });
  }

  function restoreOriginals() {
    if (!originalSnapshot) return;
    originalSnapshot.forEach(function (entry) {
      entry.node.nodeValue = entry.value;
    });
  }

  function readCache(lang, expectedLength) {
    try {
      var raw = sessionStorage.getItem(STORAGE_PREFIX + lang);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      return parsed.length === expectedLength ? parsed : null;
    } catch (e) {
      return null;
    }
  }

  function writeCache(lang, translated) {
    try {
      sessionStorage.setItem(STORAGE_PREFIX + lang, JSON.stringify(translated));
    } catch (e) { /* quota exceeded, ok */ }
  }

  function setLanguage(lang) {
    if (isTranslating) return;

    var snap = snapshot();

    if (lang === 'pt') {
      restoreOriginals();
      setActiveFlag('pt');
      try { sessionStorage.setItem('bob_lang', 'pt'); } catch (e) {}
      return;
    }

    var cached = readCache(lang, snap.length);
    if (cached) {
      applyTranslations(snap, cached);
      setActiveFlag(lang);
      try { sessionStorage.setItem('bob_lang', lang); } catch (e) {}
      return;
    }

    isTranslating = true;
    showLoading(true);
    var texts = snap.map(function (e) { return e.value; });

    translateBatch(texts, lang)
      .then(function (translated) {
        writeCache(lang, translated);
        applyTranslations(snap, translated);
        setActiveFlag(lang);
        try { sessionStorage.setItem('bob_lang', lang); } catch (e) {}
      })
      .catch(function (err) {
        console.warn('[translate] erro:', err);
      })
      .then(function () {
        isTranslating = false;
        showLoading(false);
      });
  }

  function init() {
    var flags = document.querySelectorAll('.lang-switcher a');
    for (var i = 0; i < flags.length; i++) {
      flags[i].addEventListener('click', function (e) {
        e.preventDefault();
        var href = this.getAttribute('href') || '';
        var match = href.match(/lang=(\w+)/);
        if (match) setLanguage(match[1]);
      });
    }

    // Restaura idioma escolhido na sessão atual
    try {
      var saved = sessionStorage.getItem('bob_lang');
      if (saved && saved !== 'pt') {
        setTimeout(function () { setLanguage(saved); }, 100);
      }
    } catch (e) { /* sessionStorage indisponível */ }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
