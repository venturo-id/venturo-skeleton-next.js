import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { MarketingContactView } from 'src/sections/_marketing/view/marketing-contact-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Contact us | Marketing - ${CONFIG.appName}` };

export default function Page() {
  return <MarketingContactView />;
}
