import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { TravelPostsView } from 'src/sections/_travel/view/travel-posts-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Post list | Travel - ${CONFIG.appName}` };

export default function Page() {
  return <TravelPostsView />;
}
