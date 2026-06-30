/* SEO alt-text fix for Venturo static mirror.
   Figma Sites runtime renders <img> without alt (CMS stores none).
   This runs after hydration + watches DOM, applying alt by asset hash. */
(function () {
  var ALT = {
    "logo-venturo-software-house-malang": "Logo Venturo - Software House Malang",
    "tim-programmer-venturo-malang-2025": "Tim programmer Venturo 2025 di kantor Malang",
    "logo-venturo-expert-programmers": "Logo Venturo - Expert Programmers",
    "diagram-outsourcing-tim-it-venturo": "Diagram outsourcing tim IT dari perusahaan Anda ke Venturo",
    "diagram-outsourcing-venturo": "Diagram outsourcing tim IT dari perusahaan Anda ke Venturo",
    "ikon-whatsapp-venturo": "Ikon WhatsApp - hubungi Venturo",
    "ikon-tim-programmer-berdedikasi": "Ikon tim programmer berdedikasi",
    "ikon-respon-cepat": "Ikon layanan respon cepat",
    "ikon-otomatisasi-pengembangan-software": "Ikon proses otomatisasi pengembangan software",
    "ikon-quality-assurance-supervisi": "Ikon quality assurance dan supervisi proyek",
    "ikon-laporan-progres-proyek": "Ikon laporan progres proyek berkala",
    "ilustrasi-konsultasi-pelanggan": "Ilustrasi layanan konsultasi pelanggan",
    "logo-laravel": "Logo Laravel",
    "logo-tailwind-css": "Logo Tailwind CSS",
    "logo-golang": "Logo Go (Golang)",
    "logo-mysql": "Logo MySQL",
    "banner-penawaran-venturo": "Banner penawaran spesial Venturo",
    "logo-nodejs": "Logo Node.js",
    "logo-flutter": "Logo Flutter",
    "logo-bootstrap": "Logo Bootstrap",
    "garansi-bug-project-selesai": "Garansi bug setelah project selesai",
    "logo-figma": "Logo Figma",
    "ilustrasi-pertumbuhan-bisnis": "Ilustrasi pertumbuhan bisnis dan progres proyek",
    "banner-penawaran-venturo-2": "Banner penawaran spesial Venturo",
    "logo-firebase": "Logo Firebase",
    "logo-swift": "Logo Swift",
    "logo-redis": "Logo Redis",
    "logo-mongodb": "Logo MongoDB",
    "ilustrasi-timeline-proyek": "Ilustrasi penjadwalan dan timeline proyek",
    "logo-kotlin": "Logo Kotlin",
    "ilustrasi-masalah-proyek-it": "Ilustrasi masalah proyek IT",
    "logo-rabbitmq": "Logo RabbitMQ",
    "logo-vuejs": "Logo Vue.js",
    "logo-sentry": "Logo Sentry",
    "ikon-penjadwalan-proyek": "Ikon penjadwalan proyek terstruktur",
    "ikon-monitoring-proyek": "Ikon monitoring dan pengawasan proyek",
    "logo-angularjs": "Logo AngularJS",
    "logo-react": "Logo React",
    // Landing-page content images (referenced by Figma content-hash, not slug).
    // Alt written from visual inspection of each asset.
    "f8f537ba73afbbd288bce87c01dbdb7f35b01950": "Tim programmer Venturo mengerjakan proyek Qoin di kantor Malang",
    "f115088c568d4ca4ca5eeba484fd09f5b480f193": "Tim programmer Venturo mengerjakan proyek PROMIS",
    "d647f3d4e9e16a69746c50d449b60d07d6c45a15": "Tim programmer Venturo mengerjakan proyek Humanis",
    "381abc7368b76f2d0467f27c8bd9a752335feafc": "Tim programmer Venturo mengerjakan proyek PT Suparma Tbk",
    "a40578ea0341b2210f8b229f6a38dceef2a2a3a1": "Dashboard Sistem Deteksi Anomali PLN buatan Venturo dengan machine learning Isolation Forest",
    "77fae555f17e8a461f8ae3baad6e96c67c0c7f08": "Portofolio aplikasi buatan Venturo: CUIT, KapanLagi Youniverse, dan Majoo E-Order",
    "399af7879c3e4668e9b9afbbe7826cf571b2d7dd": "Dua profesional bisnis - ilustrasi layanan IT outsourcing Venturo",
    "1c998f2cd7497234509edc9becfb77c923496506": "Alur program magang IT Venturo: Test Kualifikasi, Onboarding Kelas online, On Job Training Malang, Recruitment",
    "e1f3568205f92edd4aebfc10cbed2be31d15224d": "Perbandingan model Project Based vs Venturo Outsourcing berbasis Time & Material",
    "7200f65ad55dc13d8f80760a798cc3f81840fc1b": "Diagram outsourcing 1 programmer dari Jabodetabek ke Malang beserta manfaat HRD, supervisor, dan tunjangan",
    "b2abb11d64cf5b1272b2bbff9b2b7a267092686d": "Struktur organisasi Venturo: CEO, CTO, Software Squad, dan Project Squad",
    "3ab03ed7241545069dc87b4ea8704b12acd59150": "Employee engagement Venturo Goes to Bali bersama tim",
    "32761d4fee9ac7449f8d278c0b4e6bf382dc3da6": "Foto bersama seluruh tim programmer Venturo Malang",
    "fa4c82177f16030f3b58ac4f356bb19fbc060494": "Town Hall Meeting Venturo di Aria Gajayana Hotel Malang",
    "524bb6511d20b93f4bd80acc5e8129ee8a61dcbe": "Logo Figma"
  };
  // decorative assets -> keep alt empty (chevron/checkmark are SVG; these PNG are backgrounds)
  var DECOR = {
    "4ba3a723653010e646f431d430870e80a0ebb030": 1,
    "bbdc6eeb2b9f363c7ca0f30de96a70b13f68e4eb": 1
  };
  function pageContext() {
    var t = (document.title || "").split(/[|–-]/)[0].trim();
    return t ? t + " - Venturo" : "Venturo - Software House Malang";
  }
  function fix() {
    var imgs = document.querySelectorAll('img[src*="/_assets/v11/"]');
    var ctx = pageContext();
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      if (img.alt && img.alt.trim()) continue;
      var src = img.getAttribute('src') || '';
      var m = src.match(/v11\/([a-z0-9-]+)\.(?:png|svg|jpg|webp)/);
      if (!m) continue;
      var h = m[1];
      if (ALT[h]) { img.alt = ALT[h]; continue; }
      if (DECOR[h] || /\.svg/.test(src)) continue;      // decorative -> leave empty
      img.alt = ctx;                                     // contextual fallback for content images
    }
  }
  // Crawlable internal navigation (Figma navbar has no <a href>) -> append a real link footer once
  function addNav() {
    if (document.getElementById('seo-sitenav')) return;
    var links = [
      ['/', 'Home'], ['/profile', 'Tentang Venturo'], ['/it-outsourcing-terbaik', 'Layanan IT Outsourcing'],
      ['/it-outsourcing-jakarta', 'IT Outsourcing Jakarta'], ['/jasa-pembuatan-ai', 'Jasa Pembuatan AI'],
      ['/portfolio', 'Portofolio'], ['/partnership', 'Partnership'], ['/ratecard-compro', 'Rate Card'],
      ['/magang-it-malang', 'Magang IT Malang'], ['/job', 'Karir']
    ];
    var nav = document.createElement('nav');
    nav.id = 'seo-sitenav';
    nav.setAttribute('aria-label', 'Navigasi situs Venturo');
    nav.style.cssText = 'padding:24px 16px;text-align:center;font-size:13px;line-height:2;background:#0e3a3a;color:#cfe;';
    var html = '';
    for (var i = 0; i < links.length; i++) {
      html += '<a href="' + links[i][0] + '" style="color:#9fe;margin:0 10px;text-decoration:none;">' + links[i][1] + '</a>';
    }
    nav.innerHTML = html;
    document.body.appendChild(nav);
  }
  function run() { fix(); addNav(); }
  if (document.readyState !== 'loading') run();
  else document.addEventListener('DOMContentLoaded', run);
  try {
    var mo = new MutationObserver(function () { fix(); });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  } catch (e) {}
  setTimeout(run, 1500);
  setTimeout(run, 4000);
})();
