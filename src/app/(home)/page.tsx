import type { Metadata } from 'next';

import { getFaqGroups, getWhatsAppLink } from 'src/lib/api';

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
  // ISR via the fetch's revalidate (300s). Backend down → null → sections
  // fall back to their static copy, so home never breaks.
  const [faqGroups, waLink] = await Promise.all([
    getFaqGroups('id').catch(() => null),
    getWhatsAppLink('id').catch(() => null),
  ]);

  return <HomeView faqGroups={faqGroups} waLink={waLink} />;
}
