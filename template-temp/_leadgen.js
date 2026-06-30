/* Venturo lead-gen layer (standalone static site).
   No backend: form builds a prefilled WhatsApp deep link.
   References: 3+ CTA above-fold, value-articulated copy, social proof, low friction, fast response. */
(function () {
  var WA = "6285128043814";              // primary WhatsApp (from CMS)
  var EMAIL = "hello@venturo.id";
  var TEAL = "#0e8a8a", DARK = "#0e3a3a";

  function pageTopic() {
    var t = (document.title || "").split(/[|–-]/)[0].trim();
    return t || "layanan Venturo";
  }

  // ---------- styles ----------
  var css = document.createElement("style");
  css.textContent = [
    "#vg-bar{position:fixed;left:0;right:0;bottom:0;z-index:99998;background:" + DARK + ";color:#fff;",
    "display:flex;gap:12px;align-items:center;justify-content:center;padding:10px 14px;font:600 14px/1.3 'Plus Jakarta Sans',system-ui,sans-serif;box-shadow:0 -2px 18px rgba(0,0,0,.25)}",
    "#vg-bar .vg-txt{opacity:.95}#vg-bar .vg-sub{font-weight:400;opacity:.7;font-size:12px}",
    "#vg-bar button{background:" + TEAL + ";color:#fff;border:0;border-radius:8px;padding:10px 18px;font:700 14px/1 sans-serif;cursor:pointer;white-space:nowrap}",
    "#vg-bar .vg-x{background:transparent;opacity:.6;padding:6px 10px;font-size:18px}",
    "@media(max-width:640px){#vg-bar .vg-sub{display:none}#vg-bar{font-size:13px}}",
    "#vg-ov{position:fixed;inset:0;z-index:99999;background:rgba(8,20,20,.6);display:none;align-items:center;justify-content:center;padding:16px}",
    "#vg-ov.on{display:flex}",
    "#vg-modal{background:#fff;color:#13312f;max-width:440px;width:100%;border-radius:20px;font-family:'Plus Jakarta Sans',system-ui,sans-serif;box-shadow:0 24px 70px rgba(6,40,38,.45);position:relative;max-height:92vh;overflow:hidden;display:flex;flex-direction:column}",
    "#vg-modal .vg-head{background:linear-gradient(135deg,#16b89a 0%,#0e7c8f 55%,#0e5a7a 100%);color:#fff;padding:24px 26px 20px}",
    "#vg-modal h2{margin:0 0 5px;font-size:21px;font-weight:800;letter-spacing:-.2px}",
    "#vg-modal p.vg-lead{margin:0;font-size:13.5px;line-height:1.5;color:rgba(255,255,255,.88)}",
    "#vg-modal .vg-body{padding:18px 26px 24px;overflow:auto}",
    "#vg-modal label{display:block;font-size:12px;font-weight:700;margin:11px 0 4px;color:#2a4d4a}",
    "#vg-modal input,#vg-modal select,#vg-modal textarea{width:100%;box-sizing:border-box;padding:12px 13px;border:1.5px solid #d7e6e3;border-radius:10px;font-size:14px;font-family:inherit;background:#f7fbfa;color:#13312f;transition:border-color .15s,box-shadow .15s}",
    "#vg-modal input:focus,#vg-modal select:focus,#vg-modal textarea:focus{outline:0;border-color:#16b89a;box-shadow:0 0 0 3px rgba(22,184,154,.18);background:#fff}",
    "#vg-modal .vg-submit{width:100%;margin-top:18px;background:linear-gradient(135deg,#16b89a,#0e7c8f);color:#fff;border:0;border-radius:12px;padding:15px;font:800 15px/1 'Plus Jakarta Sans',sans-serif;cursor:pointer;box-shadow:0 8px 20px rgba(14,124,143,.35);transition:transform .12s,box-shadow .12s}",
    "#vg-modal .vg-submit:hover{transform:translateY(-1px);box-shadow:0 12px 26px rgba(14,124,143,.45)}",
    "#vg-modal .vg-alt{display:block;text-align:center;margin-top:12px;font-size:13px;color:#0e7c8f;font-weight:600;text-decoration:none}",
    "#vg-modal .vg-close{position:absolute;top:14px;right:14px;border:0;background:rgba(255,255,255,.22);width:32px;height:32px;border-radius:50%;font-size:18px;line-height:32px;text-align:center;padding:0;cursor:pointer;color:#fff;z-index:2;display:flex;align-items:center;justify-content:center;transition:background .15s}",
    "#vg-modal .vg-close:hover{background:rgba(255,255,255,.38)}",
    "#vg-modal .vg-trust{display:flex;gap:8px;margin:14px 0 0;flex-wrap:wrap}",
    "#vg-modal .vg-trust span{background:rgba(255,255,255,.16);color:#fff;font-size:11px;font-weight:700;padding:5px 10px;border-radius:20px;border:1px solid rgba(255,255,255,.25)}"
  ].join("");
  document.head.appendChild(css);

  // ---------- modal ----------
  function buildModal() {
    if (document.getElementById("vg-ov")) return;
    var ov = document.createElement("div"); ov.id = "vg-ov";
    ov.innerHTML =
      '<div id="vg-modal" role="dialog" aria-label="Konsultasi gratis Venturo">' +
      '<button class="vg-close" aria-label="Tutup">&times;</button>' +
      '<div class="vg-head">' +
      '<h2>Konsultasi Gratis &amp; Estimasi Biaya</h2>' +
      '<p class="vg-lead">Ceritakan kebutuhan Anda. Tim Venturo balas cepat via WhatsApp &mdash; tanpa biaya, tanpa komitmen.</p>' +
      '<div class="vg-trust"><span>130+ Talenta</span><span>Sejak 2013</span><span>Garansi 30 Hari</span><span>Ganti Talent Gratis</span></div>' +
      '</div>' +
      '<form id="vg-form" class="vg-body">' +
      '<label>Nama<input name="nama" required placeholder="Nama Anda"></label>' +
      '<label>Perusahaan<input name="perusahaan" placeholder="Nama perusahaan (opsional)"></label>' +
      '<label>Kebutuhan<select name="kebutuhan">' +
      '<option>Outsourcing / Dedicated Programmer</option><option>Pembuatan Aplikasi Web</option>' +
      '<option>Pembuatan Aplikasi Mobile</option><option>Solusi AI / Machine Learning</option>' +
      '<option>Sistem Informasi / ERP</option><option>Lainnya</option></select></label>' +
      '<label>No. WhatsApp / Kontak<input name="kontak" required placeholder="08xxxxxxxxxx"></label>' +
      '<label>Detail singkat (opsional)<textarea name="detail" rows="2" placeholder="Misal: butuh 2 programmer Laravel selama 6 bulan"></textarea></label>' +
      '<button class="vg-submit" type="submit">Kirim via WhatsApp &rarr;</button>' +
      '<a class="vg-alt" id="vg-email" href="#">atau kirim lewat email</a>' +
      '</form></div>';
    document.body.appendChild(ov);
    ov.addEventListener("click", function (e) { if (e.target === ov) close(); });
    ov.querySelector(".vg-close").addEventListener("click", close);
    ov.querySelector("#vg-form").addEventListener("submit", submit);
    ov.querySelector("#vg-email").addEventListener("click", function (e) {
      e.preventDefault();
      var f = ov.querySelector("#vg-form"), d = {};
      ["nama", "perusahaan", "kebutuhan", "kontak", "detail"].forEach(function (k) { d[k] = (f[k].value || "").trim(); });
      var body = msg(d).replace(/%0A/g, "\n");
      window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Konsultasi - " + (d.nama || "Lead Web")) + "&body=" + encodeURIComponent(body);
    });
  }
  function open() { buildModal(); document.getElementById("vg-ov").classList.add("on"); }
  function close() { var o = document.getElementById("vg-ov"); if (o) o.classList.remove("on"); }

  // Form lead di-hide sementara: CTA langsung ke WhatsApp chat (tanpa modal form).
  // Set HIDE_FORM=false untuk balikin form lead.
  var HIDE_FORM = true;
  function waDirect() {
    var text =
      "Halo Venturo! 👋\n\n" +
      "Saya tertarik dengan " + pageTopic() + " dan ingin konsultasi gratis untuk kebutuhan proyek/tim IT saya.\n\n" +
      "Mohon info lebih lanjut soal layanan, estimasi biaya, dan cara kerjanya. Terima kasih!";
    try { if (window.gtag) gtag("event", "generate_lead", { method: "whatsapp", page: pageTopic() }); } catch (x) {}
    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(text), "_blank");
  }
  function cta() { if (HIDE_FORM) waDirect(); else open(); }

  function msg(d) {
    return "Halo Venturo, saya tertarik dengan " + pageTopic() + ".%0A%0A" +
      "Nama: " + d.nama + "%0A" +
      (d.perusahaan ? "Perusahaan: " + d.perusahaan + "%0A" : "") +
      "Kebutuhan: " + d.kebutuhan + "%0A" +
      "Kontak: " + d.kontak + "%0A" +
      (d.detail ? "Detail: " + d.detail + "%0A" : "");
  }
  function submit(e) {
    e.preventDefault();
    var f = e.target, d = {};
    ["nama", "perusahaan", "kebutuhan", "kontak", "detail"].forEach(function (k) { d[k] = (f[k].value || "").trim(); });
    if (!d.nama || !d.kontak) return;
    try { localStorage.setItem("vg_lead", "1"); } catch (x) {}
    try { if (window.gtag) gtag("event", "generate_lead", { method: "whatsapp", kebutuhan: d.kebutuhan, page: pageTopic() }); } catch (x) {}
    window.open("https://wa.me/" + WA + "?text=" + msg(d).replace(/ /g, "%20"), "_blank");
    close();
  }

  // ---------- sticky bar ----------
  function buildBar() {
    if (document.getElementById("vg-bar")) return;
    var bar = document.createElement("div"); bar.id = "vg-bar";
    bar.innerHTML =
      '<span class="vg-txt">Butuh tim developer? <span class="vg-sub">Konsultasi gratis &amp; estimasi biaya proyek Anda.</span></span>' +
      '<button id="vg-bar-cta">Konsultasi Gratis</button>' +
      '<button class="vg-x" aria-label="Tutup">&times;</button>';
    document.body.appendChild(bar);
    bar.querySelector("#vg-bar-cta").addEventListener("click", cta);
    bar.querySelector(".vg-x").addEventListener("click", function () { bar.style.display = "none"; liftWidget(false); try { sessionStorage.setItem("vg_bar_x", "1"); } catch (x) {} });
  }

  // ---------- lift Figma floating WA widget above our bar ----------
  function findWidget() {
    var all = document.querySelectorAll('body > div, body * ');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (el.id === 'vg-bar' || el.id === 'vg-ov') continue;
      var t = (el.textContent || '');
      if (t.indexOf('Hubungi Kami') === -1 && t.indexOf('Konsultasi 100%') === -1) continue;
      if (getComputedStyle(el).position !== 'fixed') continue;
      var r = el.getBoundingClientRect();
      if (r.width > 0 && r.width < 420 && r.bottom > window.innerHeight - 200) return el;
    }
    return null;
  }
  function liftWidget(up) {
    var w = findWidget();
    if (!w) return;
    var bar = document.getElementById('vg-bar');
    var visible = bar && bar.style.display !== 'none';
    var h = (up && visible) ? bar.offsetHeight + 8 : 0;
    w.style.setProperty('transform', 'translateY(-' + h + 'px)', 'important');
    w.style.setProperty('transition', 'transform .2s', 'important');
  }

  // ---------- exit intent (desktop) ----------
  function armExit() {
    var fired = false;
    document.addEventListener("mouseout", function (e) {
      if (fired) return;
      try { if (localStorage.getItem("vg_lead")) return; } catch (x) {}
      if (e.clientY <= 0 && !e.relatedTarget) { fired = true; open(); }
    });
  }

  // Lead-gen layer (sticky bar + form) dimatikan sementara — pakai bubble WA Figma saja.
  // Set ENABLE_LEADGEN=true untuk balikin sticky bar.
  var ENABLE_LEADGEN = false;
  function init() {
    if (!ENABLE_LEADGEN) return;
    try { if (sessionStorage.getItem("vg_bar_x") !== "1") buildBar(); } catch (x) { buildBar(); }
    liftWidget(true);
    setTimeout(function () { liftWidget(true); }, 1500);
    setTimeout(function () { liftWidget(true); }, 4000);
    window.addEventListener("resize", function () { liftWidget(true); });
    if (!HIDE_FORM) armExit();   // exit-intent buka form; matikan saat form di-hide
    // hook any existing "Hubungi"/"Konsultasi" buttons to open form too (progressive enhancement)
  }
  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
  setTimeout(init, 2500);
})();
