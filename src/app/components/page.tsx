import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { ComponentsView } from 'src/sections/_examples/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Components - ${CONFIG.appName}` };

export default function ComponentsPage() {
  return <ComponentsView />;
}
