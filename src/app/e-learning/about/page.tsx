import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { ElearningAboutView } from 'src/sections/_elearning/view/elearning-about-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `About us | E-learning - ${CONFIG.appName}` };

export default function Page() {
  return <ElearningAboutView />;
}
