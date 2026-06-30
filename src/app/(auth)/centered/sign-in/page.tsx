import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { SignInCenteredView } from 'src/sections/auth/sign-in-centered-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Sign in | Layout centered - ${CONFIG.appName}` };

export default function Page() {
  return <SignInCenteredView />;
}
