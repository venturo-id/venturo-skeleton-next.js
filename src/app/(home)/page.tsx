import type { Metadata } from 'next';

import { HomeView } from 'src/sections/_home/view/home-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Jasa Outsourcing Programmer Malang | Software House Venturo',
  description:
    'Venturo adalah jasa outsource programmer terbesar di Malang dengan 130+ talenta dedicated team. Garansi 30 hari, supervisor berpengalaman, laporan progres mingguan. Konsultasi gratis.',
  keywords:
    'outsourcing programmer malang,software house malang,jasa pembuatan software,dedicated team',
};

export default function Page() {
  return <HomeView />;
}
