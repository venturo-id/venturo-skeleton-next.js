import type { Metadata } from 'next';

import { getFaqGroups } from 'src/lib/api';

import { HomeView } from 'src/sections/_home/view/home-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Jasa Outsourcing Programmer Malang | Software House Venturo',
  description:
    'Venturo adalah jasa outsource programmer terbesar di Malang dengan 130+ talenta dedicated team. Garansi 30 hari, supervisor berpengalaman, laporan progres mingguan. Konsultasi gratis.',
  keywords:
    'outsourcing programmer malang,software house malang,jasa pembuatan software,dedicated team',
};

export default async function Page() {
  // ISR via the fetch's revalidate (300s). Backend down → null → the FAQ
  // section falls back to its static copy, so home never breaks.
  const faqGroups = await getFaqGroups('id').catch(() => null);

  return <HomeView faqGroups={faqGroups} />;
}
