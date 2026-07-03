import type { Metadata } from 'next';

import { SupportView } from 'src/sections/support/view/support-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Support` };

export default function Page() {
  return <SupportView />;
}
