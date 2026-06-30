import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CareerLandingView } from 'src/sections/_career/view/career-landing-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Home | Career - ${CONFIG.appName}` };

export default function Page() {
  return <CareerLandingView />;
}
