import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { TravelContactView } from 'src/sections/_travel/view/travel-contact-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Contact us | Travel - ${CONFIG.appName}` };

export default function Page() {
  return <TravelContactView />;
}
