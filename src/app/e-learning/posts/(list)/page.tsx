import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { ElearningPostsView } from 'src/sections/_elearning/view/elearning-posts-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Post list | E-learning - ${CONFIG.appName}` };

export default function Page() {
  return <ElearningPostsView />;
}
