import type { Metadata } from 'next';

import { _products } from 'src/_mock';
import { CONFIG } from 'src/global-config';

import { EcommerceWishlistView } from 'src/sections/_ecommerce/view/ecommerce-wishlist-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Products wishlist | E-commerce - ${CONFIG.appName}` };

export default function Page() {
  return <EcommerceWishlistView products={_products.slice(0, 4)} />;
}
