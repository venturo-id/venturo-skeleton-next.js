import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { PlayerView } from 'src/sections/_examples/player-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Player | Components - ${CONFIG.appName}` };

export default function Page() {
  return <PlayerView />;
}
