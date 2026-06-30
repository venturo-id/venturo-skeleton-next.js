import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CareerContactView } from 'src/sections/_career/view/career-contact-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Contact us | Career - ${CONFIG.appName}` };

export default function Page() {
  return <CareerContactView />;
}
