import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { PricingColumnsView } from 'src/sections/pricing/view/pricing-columns-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Pricing columns - ${CONFIG.appName}` };

export default function Page() {
  return <PricingColumnsView />;
}
