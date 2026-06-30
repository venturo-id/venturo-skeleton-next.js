import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { AccountPersonalView } from 'src/sections/_account/view/account-personal-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Personal | Account - ${CONFIG.appName}` };

export default function Page() {
  return <AccountPersonalView />;
}
