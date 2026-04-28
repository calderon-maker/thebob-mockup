/**
 * The BoB, motor de tradução on-the-fly
 *
 * Usa o endpoint público do Google Translate (sem chave de API). Itera os text
 * nodes do <body>, traduz em batches paralelos, troca o DOM, cacheia em
 * sessionStorage. Clicar PT restaura os originais salvos em memória.
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
    var url =
      'https://translate.googleapis.com/translate_a/single?client=gtx' +
      '&sl=' + encodeURIComponent(SOURCE_LANG) +
      '&tl=' + encodeURIComponent(targetLang) +
      '&dt=t&q=' + encodeURIComponent(text);

    return fetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (!data || !Array.isArray(data[0])) return text;
        return data[0]
          .map(function (seg) { return Array.isArray(seg) ? seg[0] : ''; })
          .join('');
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
