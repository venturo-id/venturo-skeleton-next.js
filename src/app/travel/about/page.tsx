import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { TravelAboutView } from 'src/sections/_travel/view/travel-about-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `About us | Travel - ${CONFIG.appName}` };

export default function Page() {
  return <TravelAboutView />;
}
