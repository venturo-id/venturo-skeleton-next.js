'use client';

import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { CONTACT, RESOURCE } from './home-data';

// ----------------------------------------------------------------------

export function HomeResource() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container>
        <Box
          sx={(theme) => ({
            p: { xs: 4, md: 8 },
            borderRadius: 3,
            overflow: 'hidden',
            color: 'common.white',
            background: `linear-gradient(135deg, ${theme.vars.palette.primary.dark}, ${theme.vars.palette.primary.darker})`,
          })}
        >
          <Box
            sx={{
              gap: { xs: 5, md: 8 },
              display: 'flex',
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <MotionViewport sx={{ flex: 1 }}>
              <Typography component={m.h2} variants={varFade('inUp')} variant="h2" sx={{ mb: 3 }}>
                {RESOURCE.titleLines.map((line) => (
                  <Box key={line} component="span" sx={{ display: 'block' }}>
                    {line}
                  </Box>
                ))}
              </Typography>

              <Typography component={m.p} variants={varFade('inUp')} sx={{ mb: 3, opacity: 0.8 }}>
                {RESOURCE.description}
              </Typography>

              <Box
                component={m.div}
                variants={varFade('inUp')}
                sx={{
                  p: 2,
                  mb: 4,
                  borderRadius: 1.5,
                  typography: 'subtitle1',
                  bgcolor: (theme) => varAlpha(theme.vars.palette.common.whiteChannel, 0.16),
                }}
              >
                {RESOURCE.promo}
              </Box>

              <Box component={m.div} variants={varFade('inUp')}>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  href={CONTACT.wa}
                  target="_blank"
                  rel="noopener"
                  startIcon={<Iconify icon="solar:chat-round-call-linear" />}
                  sx={{
                    bgcolor: 'common.white',
                    color: 'primary.dark',
                    '&:hover': { bgcolor: 'grey.200' },
                  }}
                >
                  {RESOURCE.cta}
                </Button>
                <Typography variant="caption" sx={{ mt: 1.5, display: 'block', opacity: 0.72 }}>
                  {RESOURCE.ctaNote}
                </Typography>
              </Box>
            </MotionViewport>

            <Box sx={{ flex: 1, width: 1 }}>
              <Image alt="Venturo" src={RESOURCE.image} ratio="4/3" sx={{ borderRadius: 2 }} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
