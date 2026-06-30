import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { MarketingPostView } from 'src/sections/_marketing/view/marketing-post-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Post details | Marketing - ${CONFIG.appName}` };

export default function Page() {
  return <MarketingPostView />;
}
