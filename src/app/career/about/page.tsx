import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CareerAboutView } from 'src/sections/_career/view/career-about-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `About us | Career - ${CONFIG.appName}` };

export default function Page() {
  return <CareerAboutView />;
}
