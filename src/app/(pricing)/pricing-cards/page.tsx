import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { PricingCardsView } from 'src/sections/pricing/view/pricing-cards-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Pricing cards - ${CONFIG.appName}` };

export default function Page() {
  return <PricingCardsView />;
}
