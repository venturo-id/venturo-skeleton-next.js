import type { Metadata } from 'next';

import { ComingSoonView } from 'src/sections/coming-soon/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Coming soon` };

export default function Page() {
  return <ComingSoonView />;
}
