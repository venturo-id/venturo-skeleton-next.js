import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { VerifyView } from 'src/sections/auth/verify-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Verify - ${CONFIG.appName}` };

export default function Page() {
  return <VerifyView />;
}
