/*
 * _wa-track.js — hand-written enhancement (NOT part of Figma export).
 *
 * Tracks every click that leads to WhatsApp (wa.me / api.whatsapp.com / chat.whatsapp.com)
 * as a GA4 event, so WhatsApp consultations show up as conversions in Analytics.
 *
 * Why a global delegated listener: the WhatsApp CTAs (floating bubble, footer "Hubungi Kami")
 * are injected by the Figma runtime AFTER hydration, so they don't exist in the static HTML.
 * Delegation on `document` (capture phase) catches them no matter when they appear.
 *
 * Scope: fires on real WA links only. The event is sent synchronously BEFORE navigation, so it
 * is not lost when the new tab/app opens. Cannot track what happens inside WhatsApp (whether the
 * user actually sends the message) — only the click, which is the standard conversion proxy.
 *
 * GA4: after deploy, mark `whatsapp_click` as a Key Event in GA4 Admin → Events to count it as a
 * conversion (and optionally import to Google Ads).
 */
(function () {
  "use strict";

  var WA_RE = /(?:wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com)/i;
  var lastFire = 0; // de-dupe rapid double-events from the same click

  // ---- prefill pesan WA (bubble/CTA Figma aslinya tanpa ?text=, jadi chat kosong) ----
  function pageTopic() {
    var t = (document.title || "").split(/[|–-]/)[0].trim();
    return t || "layanan Venturo";
  }
  function waMessage() {
    return "Halo Venturo! 👋\n\n" +
      "Saya tertarik dengan " + pageTopic() + " dan ingin konsultasi gratis untuk kebutuhan proyek/tim IT saya.\n\n" +
      "Mohon info lebih lanjut soal layanan, estimasi biaya, dan cara kerjanya. Terima kasih!";
  }
  function hasText(href) { return /[?&]text=/.test(href); }
  function addText(href) {
    if (hasText(href)) return href;
    return href + (href.indexOf("?") > -1 ? "&" : "?") + "text=" + encodeURIComponent(waMessage());
  }

  // Banyak widget Figma buka WA lewat window.open(...) (bukan <a href>), jadi rewrite href
  // nggak kena. Patch window.open: kalau URL ke WA & belum ada ?text=, sisipkan pesan.
  var _open = window.open;
  window.open = function (url, target, features) {
    try {
      if (typeof url === "string" && WA_RE.test(url)) {
        if (!hasText(url)) url = addText(url);
        arguments[0] = url;
        if (!target || target === "_self") { arguments[1] = "_blank"; }   // paksa tab baru
        arguments.length = Math.max(arguments.length, 2);
      }
    } catch (x) {}
    return _open.apply(window, arguments);
  };
  // location assignment fallback (beberapa widget pakai location.href = ...)
  try {
    var _assign = window.location.assign.bind(window.location);
    window.location.assign = function (url) {
      if (typeof url === "string" && WA_RE.test(url) && !hasText(url)) url = addText(url);
      return _assign(url);
    };
  } catch (x) {}
  // Rewrite semua anchor WA supaya bawa pesan prefilled. Idempotent + jalan ulang saat
  // runtime Figma nyuntik elemen baru (MutationObserver).
  function rewriteWaLinks(root) {
    var as = (root || document).querySelectorAll('a[href*="wa.me"],a[href*="whatsapp.com"]');
    for (var i = 0; i < as.length; i++) {
      var h = as[i].getAttribute("href") || "";
      if (!WA_RE.test(h)) continue;
      if (!hasText(h)) as[i].setAttribute("href", addText(h));
      as[i].setAttribute("target", "_blank");          // buka tab baru, jangan tinggalin halaman
      as[i].setAttribute("rel", "noopener noreferrer");
    }
  }

  function waHrefFrom(el) {
    // climb to the nearest anchor (or element) carrying a wa link
    for (var n = el; n && n !== document; n = n.parentNode) {
      if (n.nodeType !== 1) continue;
      var href = n.getAttribute && (n.getAttribute("href") || n.getAttribute("data-href") || "");
      if (href && WA_RE.test(href)) return href;
    }
    return null;
  }

  function phoneOf(href) {
    var m = href.match(/(?:wa\.me\/|phone=)\+?(\d{6,})/i);
    return m ? m[1] : "";
  }

  function onClick(e) {
    // safety: kalau anchor WA yang diklik belum punya ?text=, isi dulu sebelum navigasi
    for (var n = e.target; n && n !== document; n = n.parentNode) {
      if (n.nodeType === 1 && n.tagName === "A") {
        var ah = n.getAttribute("href") || "";
        if (WA_RE.test(ah)) {
          if (!hasText(ah)) n.setAttribute("href", addText(ah));
          n.setAttribute("target", "_blank");
          n.setAttribute("rel", "noopener noreferrer");
        }
        break;
      }
    }
    var href = waHrefFrom(e.target);
    if (!href) return;
    var now = (window.performance && performance.now) ? performance.now() : +new Date();
    if (now - lastFire < 600) return; // same click bubbling -> fire once
    lastFire = now;
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", "whatsapp_click", {
          page_path: location.pathname,
          page_title: document.title,
          wa_number: phoneOf(href),
          link_url: href
        });
      } else if (window.dataLayer && window.dataLayer.push) {
        window.dataLayer.push({ event: "whatsapp_click", wa_number: phoneOf(href), page_path: location.pathname });
      }
    } catch (x) {}
  }

  // capture phase so we run before any handler that may stop propagation / navigate
  document.addEventListener("click", onClick, true);
  // some widgets open WA on touchend without a click on mobile
  document.addEventListener("auxclick", onClick, true);

  // Proactively prefill WA links now + tiap runtime Figma nyuntik elemen baru.
  function boot() { rewriteWaLinks(document); }
  if (document.readyState !== "loading") boot();
  else document.addEventListener("DOMContentLoaded", boot);
  try {
    var mo = new MutationObserver(function () { rewriteWaLinks(document); });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  } catch (x) {}
  setTimeout(boot, 1500);
  setTimeout(boot, 4000);
})();
