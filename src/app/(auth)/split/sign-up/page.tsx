import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { SignUpSplitView } from 'src/sections/auth/sign-up-split-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Sign up | Layout split - ${CONFIG.appName}` };

export default function Page() {
  return <SignUpSplitView />;
}
