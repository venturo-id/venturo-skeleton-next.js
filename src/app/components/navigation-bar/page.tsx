import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { NavigationBarView } from 'src/sections/_examples/navigation-bar-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Navigation bar | Components - ${CONFIG.appName}` };

export default function Page() {
  return <NavigationBarView />;
}
