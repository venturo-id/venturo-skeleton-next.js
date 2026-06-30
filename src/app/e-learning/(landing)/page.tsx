import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { ElearningLandingView } from 'src/sections/_elearning/view/elearning-landing-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Home | E-learning - ${CONFIG.appName}` };

export default function Page() {
  return <ElearningLandingView />;
}
