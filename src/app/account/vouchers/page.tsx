import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { AccountVouchersView } from 'src/sections/_account/view/account-vouchers-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Vouchers | Account - ${CONFIG.appName}` };

export default function Page() {
  return <AccountVouchersView />;
}
