import type { Metadata } from 'next';

import { getFaqGroups } from 'src/lib/api';

import { SupportView } from 'src/sections/support/view/support-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Pertanyaan yang sering diajukan seputar layanan outsourcing programmer, pengembangan software, dan cara kerja tim Venturo.',
  alternates: { canonical: '/support/' },
};

export default async function Page() {
  // ISR via the fetch's revalidate (300s). Backend down → null → view falls
  // back to the same static FAQ copy as the home section.
  const faqGroups = await getFaqGroups('id').catch(() => null);

  return <SupportView faqGroups={faqGroups} />;
}
