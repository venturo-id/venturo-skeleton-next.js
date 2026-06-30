import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { MarketingLandingView } from 'src/sections/_marketing/view/marketing-landing-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Home | Marketing - ${CONFIG.appName}` };

export default function Page() {
  return <MarketingLandingView />;
}
