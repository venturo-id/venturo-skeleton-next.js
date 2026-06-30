/*
 * _ads.js — marketing tag layer (hand-written, NOT part of the Figma export).
 *
 * One config block. Each integration stays INERT (no-op) until its ID is filled,
 * so this file is safe to deploy even before you have all IDs.
 *
 * Loaded `defer` after _wa-track.js / _leadgen.js. The two existing GA4 conversion
 * events are reused — NOT re-implemented:
 *     whatsapp_click  (from _wa-track.js)
 *     generate_lead   (from _leadgen.js)
 * This file wraps window.gtag once and fans those two events out to:
 *   - Google Ads conversions (send_to label)
 *   - Meta Pixel  (fbq 'Lead')
 *   - GTM dataLayer (as {event:'whatsapp_click'} / {event:'generate_lead'} for GTM triggers)
 *
 * The head already sets Consent Mode v2 default = denied. The cookie banner here
 * calls gtag('consent','update',...) on accept and persists the choice, and gates
 * Meta Pixel init behind consent.
 *
 * gtag in the page is a global function declaration, so wrapping window.gtag is also
 * seen by _leadgen.js's bare `gtag(...)` call (same global binding).
 */
(function () {
  "use strict";

  // ============================ ISI ID DI SINI ============================
  var CFG = {
    GTM_ID:         "",   // "GTM-XXXXXXX"      kosong = GTM tidak dipasang
    ADS_ID:         "",   // "AW-XXXXXXXXX"     kosong = Google Ads tidak dipasang
    ADS_LABEL_WA:   "",   // "AW-XXXXXXXXX/AbCdEfGhIj"  conversion label klik WhatsApp
    ADS_LABEL_LEAD: "",   // "AW-XXXXXXXXX/KlMnOpQrSt"  conversion label submit form
    META_PIXEL_ID:  "",   // "1234567890123456" (15-16 digit)
    CONSENT_BANNER: true  // tampilkan cookie banner + Consent Mode v2 update
  };
  // =======================================================================

  var W = window, D = document;
  W.dataLayer = W.dataLayer || [];
  if (typeof W.gtag !== "function") { W.gtag = function () { W.dataLayer.push(arguments); }; }

  var CONSENT_KEY = "vg_consent_v1";
  function storedConsent() { try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; } }
  function consentGranted() { return storedConsent() === "granted"; }

  // ---------------------------- Google Tag Manager ----------------------------
  if (/^GTM-[A-Z0-9]+$/.test(CFG.GTM_ID)) {
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": +new Date(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0], j = d.createElement(s),
          dl = l !== "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(W, D, "script", "dataLayer", CFG.GTM_ID);
  }

  // ---------------------------- Google Ads config ----------------------------
  // The existing gtag.js loader (G-EWGMG89CHE) also serves the AW- account.
  if (/^AW-[0-9]+$/.test(CFG.ADS_ID)) {
    W.gtag("config", CFG.ADS_ID);
  }

  // ---------------------------- Meta Pixel (consent-gated) -------------------
  var pixelOn = /^\d{15,16}$/.test(CFG.META_PIXEL_ID);
  function loadMetaBase() {
    if (W.fbq) return;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(W, D, "script", "https://connect.facebook.net/en_US/fbevents.js");
  }
  function initMeta() {
    if (!pixelOn || W.__vgFbReady) return;
    loadMetaBase();
    W.fbq("init", CFG.META_PIXEL_ID);
    W.fbq("track", "PageView");
    W.__vgFbReady = true;
  }
  if (pixelOn && (!CFG.CONSENT_BANNER || consentGranted())) { initMeta(); }

  // ---------------------------- Bridge: GA4 events -> Ads + Meta + GTM --------
  var _gtag = W.gtag, lastBridge = 0;
  W.gtag = function () {
    try {
      if (arguments[0] === "event") {
        var name = arguments[1], p = arguments[2] || {};
        var now = (W.performance && performance.now) ? performance.now() : +new Date();
        if ((name === "whatsapp_click" || name === "generate_lead") && now - lastBridge > 300) {
          lastBridge = now;
          // GTM-format mirror for users building triggers in the GTM UI
          W.dataLayer.push({ event: name, page_path: p.page_path || p.page || location.pathname });
          if (name === "whatsapp_click") {
            if (CFG.ADS_LABEL_WA) _gtag("event", "conversion", { send_to: CFG.ADS_LABEL_WA });
            if (W.__vgFbReady) W.fbq("track", "Lead", { content_name: p.page_title || "WhatsApp" });
          } else {
            if (CFG.ADS_LABEL_LEAD) _gtag("event", "conversion", { send_to: CFG.ADS_LABEL_LEAD });
            if (W.__vgFbReady) W.fbq("track", "Lead", { content_name: p.page || "form" });
          }
        }
      }
    } catch (x) {}
    return _gtag.apply(W, arguments);
  };

  // ---------------------------- Cookie banner + Consent Mode v2 update -------
  if (CFG.CONSENT_BANNER && !storedConsent()) {
    var grant = function (yes) {
      try { localStorage.setItem(CONSENT_KEY, yes ? "granted" : "denied"); } catch (e) {}
      var v = yes ? "granted" : "denied";
      W.gtag("consent", "update", {
        ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v
      });
      if (yes) initMeta();
      var b = D.getElementById("vg-consent"); if (b) b.parentNode.removeChild(b);
    };

    var build = function () {
      if (D.getElementById("vg-consent")) return;
      var css = D.createElement("style");
      css.textContent =
        "#vg-consent{position:fixed;left:12px;right:12px;bottom:12px;z-index:100000;max-width:560px;margin:0 auto;" +
        "background:#0e3a3a;color:#fff;border-radius:14px;padding:16px 18px;box-shadow:0 10px 30px rgba(0,0,0,.35);" +
        "font:400 13px/1.5 'Plus Jakarta Sans',system-ui,sans-serif}" +
        "#vg-consent b{font-weight:800}" +
        "#vg-consent a{color:#7fe3d3;text-decoration:underline}" +
        "#vg-consent .vg-row{display:flex;gap:10px;margin-top:12px;flex-wrap:wrap}" +
        "#vg-consent button{flex:1;min-width:120px;border:0;border-radius:9px;padding:11px 14px;font:700 13px/1 sans-serif;cursor:pointer}" +
        "#vg-consent .vg-acc{background:#16b89a;color:#fff}" +
        "#vg-consent .vg-rej{background:transparent;color:#cfe;border:1px solid rgba(255,255,255,.35)}";
      D.head.appendChild(css);
      var el = D.createElement("div");
      el.id = "vg-consent";
      el.setAttribute("role", "dialog");
      el.setAttribute("aria-label", "Persetujuan cookie");
      el.innerHTML =
        "<div><b>Kami pakai cookie</b> untuk analitik & iklan yang relevan. " +
        "Pilihanmu mengatur Google Analytics, Google Ads, dan Meta Pixel.</div>" +
        "<div class='vg-row'>" +
        "<button class='vg-acc' id='vg-acc'>Setuju</button>" +
        "<button class='vg-rej' id='vg-rej'>Tolak</button>" +
        "</div>";
      D.body.appendChild(el);
      D.getElementById("vg-acc").addEventListener("click", function () { grant(true); });
      D.getElementById("vg-rej").addEventListener("click", function () { grant(false); });
    };

    if (D.readyState !== "loading") build();
    else D.addEventListener("DOMContentLoaded", build);
  }
})();
