import type { Metadata } from 'next';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: CONFIG.appName };

export default function Page() {
  return (
    <Container sx={{ py: 10, minHeight: 560, textAlign: 'center' }}>
      <Typography variant="h2" sx={{ mb: 2 }}>
        {CONFIG.appName}
      </Typography>

      <Typography sx={{ mb: 5, color: 'text.secondary' }}>
        Clean starter. Build your pages from here.
      </Typography>

      <Box sx={{ gap: 2, display: 'flex', justifyContent: 'center' }}>
        <Button href="/components" variant="contained">
          Components
        </Button>
        <Button href="/blank" variant="outlined">
          Blank page
        </Button>
      </Box>
    </Container>
  );
}
