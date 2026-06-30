import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { AccountOrdersView } from 'src/sections/_account/view/account-orders-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Orders | Account - ${CONFIG.appName}` };

export default function Page() {
  return <AccountOrdersView />;
}
