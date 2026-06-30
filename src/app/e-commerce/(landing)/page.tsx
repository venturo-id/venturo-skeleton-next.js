import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { EcommerceLandingView } from 'src/sections/_ecommerce/view/ecommerce-landing-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Home | E-commerce - ${CONFIG.appName}` };

export default function Page() {
  return <EcommerceLandingView />;
}
