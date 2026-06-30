import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { AccountPaymentView } from 'src/sections/_account/view/account-payment-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Payment | Account - ${CONFIG.appName}` };

export default function Page() {
  return <AccountPaymentView />;
}
