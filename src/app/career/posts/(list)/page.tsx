import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CareerPostsView } from 'src/sections/_career/view/career-posts-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Post list | Career - ${CONFIG.appName}` };

export default function Page() {
  return <CareerPostsView />;
}
