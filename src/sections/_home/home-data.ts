import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const asset = (name: string) => `${CONFIG.assetsDir}/assets/venturo/${name}`;

export const CONTACT = {
  wa: 'https://wa.me/6285128043814',
  email: 'hello@venturo.id',
};

// ----------------------------------------------------------------------

export const HERO = {
  badge: 'Konsultasi 100% Gratis',
  title: 'Software House Malang dengan Talenta Programmer Terbesar',
  description:
    'Venturo adalah jasa outsource programmer terbesar di Malang, didukung 130+ talenta programmer, dan dipercaya berbagai bisnis serta brand untuk layanan pembuatan software.',
  cta: 'Mulai Konsultasi',
  stats: [
    { value: 130, suffix: '+', label: 'Dedicated IT experts' },
    { value: 250, suffix: '+', label: 'Successful Projects' },
  ],
  trustedLabel: 'Dipercaya Oleh:',
};

/**
 * Logo klien/brand untuk row "Dipercaya Oleh" (trusted-by).
 * File logo ada di `public/assets/venturo/clients/`.
 * Untuk menambah klien: taruh file di folder itu lalu daftarkan di sini.
 */
export const CLIENTS: { name: string; logo: string }[] = [
  { name: 'Qoin', logo: asset('clients/qoin.png') },
  { name: 'Shipper', logo: asset('clients/shipper.png') },
  { name: 'Hayyu Skin Clinic', logo: asset('clients/hayyu.png') },
  { name: 'Bobobox', logo: asset('clients/bobobox.png') },
  { name: 'Liputan 6', logo: asset('clients/liputan6.png') },
  { name: 'Powmeals', logo: asset('clients/powmeals.png') },
  { name: 'Bolong', logo: asset('clients/bolong.png') },
  { name: 'Majoo', logo: asset('clients/majoo.png') },
  { name: 'Pudu', logo: asset('clients/pudu.png') },
  { name: 'Humanis', logo: asset('clients/humanis.png') },
  { name: 'Wisdom Crowd', logo: asset('clients/wisdom-crowd.png') },
  { name: 'Bio Farma', logo: asset('clients/biofarma.png') },
  { name: 'Kemenkes', logo: asset('clients/kemenkes.png') },
  { name: 'Olahkarsa', logo: asset('clients/olahkarsa.png') },
];

// ----------------------------------------------------------------------

export const PROBLEM = {
  caption: 'The Problem',
  title: 'Proyek IT Anda Bermasalah?',
  image: asset('ilustrasi-masalah-proyek-it.png'),
  items: [
    {
      title: 'Kesulitan Menemukan Programmer yang Tepat',
      description:
        'Lulusan IT melimpah, tapi menemukan programmer andal sesuai harapan bukanlah hal yang mudah.',
      icon: 'solar:user-rounded-outline',
    },
    {
      title: 'Proyek Molor, Melebihi Anggaran, Tak Sesuai Ekspektasi',
      description:
        'Efeknya proyek makin lama selesai, budget makin bengkak, Anda makin kecewa. Anda tidak sendirian — banyak bisnis juga mengalaminya.',
      icon: 'solar:hourglass-line-outline',
    },
    {
      title: 'Tingkat Perputaran yang Tinggi di Industri Ini',
      description:
        'Bosan gonta-ganti programmer! Tingkat turnover yang relatif tinggi mencapai 19,22% — lebih tinggi daripada industri lain.',
      icon: 'solar:restart-bold',
    },
  ],
  closing: 'Dan akhirnya… bisnis Anda kehilangan waktu, biaya, bahkan kepercayaan klien.',
};

// ----------------------------------------------------------------------

export const SOLUTION = {
  caption: 'Stress-Free Solutions',
  title: 'Solusi Tanpa Drama untuk Proyek IT Anda',
  items: [
    {
      title: 'Tim yang Berdedikasi',
      icon: asset('ikon-tim-programmer-berdedikasi.png'),
      description:
        'Bangun tim outsource full-time layaknya memiliki tim internal sendiri. Squad ini sepenuhnya fokus mengerjakan proyek Anda tanpa terbagi ke proyek lain.',
    },
    {
      title: 'Supervisor Berpengalaman',
      icon: asset('ikon-quality-assurance-supervisi.png'),
      description:
        'Setiap tim didukung supervisor senior yang memastikan kualitas melalui analisa, pendampingan, dan review dari berbagai proyek serupa.',
    },
    {
      title: 'Respon Cepat',
      icon: asset('ikon-respon-cepat.png'),
      description:
        'Selama masa kontrak berjalan, tim kami siap memberikan dukungan respons cepat melalui grup messenger online bersama seluruh PIC proyek Anda.',
    },
    {
      title: 'Tes Otomatisasi',
      icon: asset('ikon-otomatisasi-pengembangan-software.png'),
      description:
        'Pengujian otomatis untuk memastikan kualitas perangkat lunak secara cepat, akurat, konsisten, dan meminimalisir human error.',
    },
    {
      title: 'Laporan Progresif',
      icon: asset('ikon-laporan-progres-proyek.png'),
      description:
        'Laporan progress detail diberikan setiap minggu, sehingga Anda selalu mendapat update perkembangan proyek secara transparan.',
    },
  ],
};

// ----------------------------------------------------------------------

export const FOCUS = {
  caption: 'Focus on Your Core Business',
  title: 'Fokus pada Bisnis Inti Anda, Biar Urusan IT Kami yang Pegang',
  description:
    'Venturo, jasa pembuatan software house Malang, siap membantu dengan programmer profesional yang bekerja seolah tim in-house Anda sendiri.',
  highlight: 'Tim IT Khusus Anda',
  image: asset('diagram-outsourcing-tim-it-venturo.png'),
  points: [
    'Squad full-time yang fokus pada proyek Anda',
    'Didampingi supervisor & project manager',
    'Transparan dengan laporan progres mingguan',
  ],
};

// ----------------------------------------------------------------------

export const MANAGEMENT = {
  caption: 'We Already Have a Good Management',
  title: 'Manajemen Proyek yang Sudah Teruji',
  description: 'Jasa outsourcing programmer, perusahaan IT di Malang terbaik.',
  image: asset('diagram-outsourcing-venturo.png'),
  items: [
    {
      title: 'Roadmap untuk Timeline Planning',
      icon: asset('ikon-penjadwalan-proyek.png'),
      description:
        'Roadmap berisi list task dan timeline project yang dapat Anda pantau setiap saat, dibuat berdasarkan kesepakatan dengan Anda.',
    },
    {
      title: 'Monitoring Sprint Mingguan',
      icon: asset('ikon-monitoring-proyek.png'),
      description:
        'Mengontrol sprint dan memastikan programmer kami bekerja sesuai dengan waktu yang Anda beli.',
    },
    {
      title: 'Lacak Progress Terkini',
      icon: asset('ikon-laporan-progres-proyek.png'),
      description:
        'Dengan sekali lihat, Anda dapat memantau modul mana yang sedang berjalan atau sudah selesai.',
    },
    {
      title: 'Tes Skenario untuk Mencegah Bug',
      icon: asset('ikon-otomatisasi-pengembangan-software.png'),
      description:
        'Setiap use case dicatat secara rinci pada Test Scenario sebagai langkah antisipasi terhadap bug/error.',
    },
    {
      title: 'Layanan Maksimal untuk Klien',
      icon: asset('garansi-bug-project-selesai.png'),
      description:
        'Kami menjamin pelayanan maksimal 48 jam penanganan bug dan improvement yang dapat Anda pantau.',
    },
    {
      title: 'Memantau Kinerja Setiap Squad',
      icon: asset('ikon-quality-assurance-supervisi.png'),
      description:
        'Setiap talenta memiliki target harian dan bulanan, dan bersaing untuk menjadi yang terbaik.',
    },
  ],
};

// ----------------------------------------------------------------------

export const RESOURCE = {
  caption: 'The Largest Programmer Resource in Malang',
  titleLines: ['The Largest', 'Programmer Resource', 'in Malang'],
  description:
    'Cari programmer terbaik di Malang? Venturo menghadirkan the largest programmer resource in Malang untuk kebutuhan outsourcing dan pengembangan software skala besar.',
  promo:
    '50% OFF hiring fee khusus hingga 31 Mei 2026 — siap menyelesaikan proyek IT Anda tanpa drama!',
  cta: 'Hubungi Kami Sekarang',
  ctaNote: 'Konsultasi gratis untuk kebutuhan bisnis Anda',
  image: asset('ilustrasi-pertumbuhan-bisnis.png'),
};

// ----------------------------------------------------------------------

export const TECH_STACK = {
  caption: 'Technology Stack',
  title: 'Teknologi yang Kami Kuasai',
  groups: [
    {
      label: 'Web Programmer',
      logos: [
        'logo-laravel.png',
        'logo-golang.png',
        'logo-nodejs.png',
        'logo-react.png',
        'logo-vuejs.png',
        'logo-angularjs.png',
        'logo-bootstrap.png',
        'logo-tailwind-css.png',
        'logo-mysql.png',
        'logo-mongodb.png',
        'logo-redis.png',
        'logo-rabbitmq.png',
        'logo-sentry.png',
      ],
    },
    {
      label: 'Mobile Programmer',
      logos: ['logo-flutter.png', 'logo-kotlin.png', 'logo-swift.png', 'logo-firebase.png'],
    },
    {
      label: 'UI / UX',
      logos: ['logo-figma.png'],
    },
  ],
};

// ----------------------------------------------------------------------

export const FAQS = {
  caption: 'FAQ',
  title: 'Frequently Asked Questions',
  items: [
    {
      question:
        'Apa keunggulan menggunakan layanan outsourcing programmer dibanding merekrut langsung?',
      answer:
        'Anda mendapatkan tim siap kerja tanpa repot rekrutmen, training, dan retensi. Hemat waktu dan biaya, dengan supervisor serta manajemen yang sudah terbukti, sehingga Anda bisa fokus ke core business.',
    },
    {
      question: 'Apakah tim Anda berpengalaman dengan proyek AI atau machine learning?',
      answer:
        'Ya. Tim kami menangani berbagai proyek termasuk integrasi AI/ML — mulai dari pengolahan data, model prediktif, hingga implementasi fitur berbasis AI pada aplikasi.',
    },
    {
      question: 'Bagaimana model kerja outsourcing programmer di Venturo?',
      answer:
        'Anda membentuk dedicated squad full-time yang bekerja seperti tim in-house Anda, didampingi supervisor, dengan roadmap, sprint mingguan, dan laporan progres transparan.',
    },
    {
      question: 'Berapa lama waktu Venturo untuk mempersiapkan tim hingga siap untuk Development?',
      answer:
        'Umumnya tim dapat disiapkan dalam hitungan hari setelah kebutuhan dan kesepakatan final, tergantung skala serta stack yang dibutuhkan.',
    },
    {
      question: 'Apakah saya menerima source code setelah proses development selesai?',
      answer: 'Ya. Seluruh source code menjadi milik Anda dan diserahkan sesuai kesepakatan kerja.',
    },
    {
      question: 'Apakah ada garansi setelah melakukan development?',
      answer:
        'Ada. Kami pastikan sistem bebas dari bug kritis pasca serah terima, dengan garansi perbaikan hingga 30 hari tanpa biaya tambahan.',
    },
    {
      question: 'Bagaimana jika programmer yang diberikan tidak cocok?',
      answer:
        'Kami akan melakukan evaluasi dan penggantian talenta agar tim benar-benar sesuai dengan kebutuhan dan ekspektasi proyek Anda.',
    },
  ],
};

// ----------------------------------------------------------------------

export const CLOSING_CTA = {
  caption: 'Garansi 30 Hari',
  title: 'Bebas Bug Kritis, atau Kami Perbaiki Tanpa Biaya Tambahan',
  description:
    'Kami pastikan sistem bebas dari bug kritis pasca serah terima. Jika Anda serius, tim kami siap mendukung dari awal hingga selesai.',
  cta: 'Mulai Konsultasi',
};
