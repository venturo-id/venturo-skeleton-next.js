import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { MarketingPostsView } from 'src/sections/_marketing/view/marketing-posts-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Post list | Marketing - ${CONFIG.appName}` };

export default function Page() {
  return <MarketingPostsView />;
}
