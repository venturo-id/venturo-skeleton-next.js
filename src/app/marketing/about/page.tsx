import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { MarketingAboutView } from 'src/sections/_marketing/view/marketing-about-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `About us | Marketing - ${CONFIG.appName}` };

export default function Page() {
  return <MarketingAboutView />;
}
