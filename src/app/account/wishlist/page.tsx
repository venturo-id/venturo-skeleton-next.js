import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { AccountWishlistView } from 'src/sections/_account/view/account-wishlist-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Wishlist | Account - ${CONFIG.appName}` };

export default function Page() {
  return <AccountWishlistView />;
}
