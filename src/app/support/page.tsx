import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { SupportView } from 'src/sections/support/view/support-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Support - ${CONFIG.appName}` };

export default function Page() {
  return <SupportView />;
}
