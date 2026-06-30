'use client';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { FOCUS } from './home-data';

// ----------------------------------------------------------------------

export function HomeFocus() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container>
        <Box
          sx={{
            gap: { xs: 5, md: 8 },
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column-reverse', md: 'row' },
          }}
        >
          <MotionViewport sx={{ flex: 1 }}>
            <Typography
              component={m.p}
              variants={varFade('inUp')}
              variant="overline"
              sx={{ mb: 2, display: 'block', color: 'primary.main' }}
            >
              {FOCUS.caption}
            </Typography>

            <Typography component={m.h2} variants={varFade('inUp')} variant="h2" sx={{ mb: 3 }}>
              {FOCUS.title}
            </Typography>

            <Typography
              component={m.p}
              variants={varFade('inUp')}
              sx={{ mb: 4, color: 'text.secondary' }}
            >
              {FOCUS.description}
            </Typography>

            <Stack component={m.div} variants={varFade('inUp')} spacing={2}>
              {FOCUS.points.map((point) => (
                <Box key={point} sx={{ gap: 1.5, display: 'flex', alignItems: 'center' }}>
                  <Iconify icon="solar:check-circle-bold" sx={{ color: 'primary.main' }} />
                  <Typography variant="subtitle1">{point}</Typography>
                </Box>
              ))}
            </Stack>
          </MotionViewport>

          <Box sx={{ flex: 1, width: 1 }}>
            <Image alt={FOCUS.title} src={FOCUS.image} ratio="1/1" sx={{ borderRadius: 2 }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
