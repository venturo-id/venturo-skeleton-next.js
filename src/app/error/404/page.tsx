import type { Metadata } from 'next';

import { NotFoundView } from 'src/sections/error/not-found-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `404 page not found! | Error` };

export default function Page() {
  return <NotFoundView />;
}
