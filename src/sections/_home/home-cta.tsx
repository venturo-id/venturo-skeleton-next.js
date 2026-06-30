'use client';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { CONTACT, CLOSING_CTA } from './home-data';

// ----------------------------------------------------------------------

export function HomeCta() {
  return (
    <Box component="section" sx={{ pb: { xs: 8, md: 12 } }}>
      <Container>
        <MotionViewport
          sx={{
            px: 3,
            py: { xs: 6, md: 10 },
            borderRadius: 3,
            textAlign: 'center',
            bgcolor: 'background.neutral',
          }}
        >
          <Typography
            component={m.p}
            variants={varFade('inUp')}
            variant="overline"
            sx={{ mb: 2, display: 'block', color: 'primary.main' }}
          >
            {CLOSING_CTA.caption}
          </Typography>

          <Typography
            component={m.h2}
            variants={varFade('inUp')}
            variant="h2"
            sx={{ mx: 'auto', mb: 3, maxWidth: 680 }}
          >
            {CLOSING_CTA.title}
          </Typography>

          <Typography
            component={m.p}
            variants={varFade('inUp')}
            sx={{ mx: 'auto', mb: 5, maxWidth: 560, color: 'text.secondary' }}
          >
            {CLOSING_CTA.description}
          </Typography>

          <Box component={m.div} variants={varFade('inUp')}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              href={CONTACT.wa}
              target="_blank"
              rel="noopener"
              startIcon={<Iconify icon="solar:chat-round-call-linear" />}
            >
              {CLOSING_CTA.cta}
            </Button>
          </Box>
        </MotionViewport>
      </Container>
    </Box>
  );
}
