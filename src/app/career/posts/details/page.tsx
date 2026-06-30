import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CareerPostView } from 'src/sections/_career/view/career-post-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Post details | Career - ${CONFIG.appName}` };

export default function Page() {
  return <CareerPostView />;
}
