'use client';

import type { IconifyName } from 'src/components/iconify';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { PROBLEM } from './home-data';
import { HomeHeading } from './home-heading';

// ----------------------------------------------------------------------

export function HomeProblem() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container>
        <HomeHeading caption={PROBLEM.caption} title={PROBLEM.title} />

        <Box
          sx={{
            gap: { xs: 5, md: 8 },
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Box sx={{ flex: 1, width: 1 }}>
            <Image
              alt={PROBLEM.title}
              src={PROBLEM.image}
              ratio="4/3"
              sx={{ borderRadius: 2, boxShadow: (theme) => theme.customShadows.z8 }}
            />
          </Box>

          <MotionViewport sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {PROBLEM.items.map((item) => (
              <Card
                key={item.title}
                component={m.div}
                variants={varFade('inUp')}
                sx={{ p: 3, gap: 2, display: 'flex', boxShadow: (theme) => theme.customShadows.z8 }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    flexShrink: 0,
                    display: 'grid',
                    borderRadius: '50%',
                    color: 'error.main',
                    placeItems: 'center',
                    bgcolor: 'error.lighter',
                  }}
                >
                  <Iconify width={26} icon={item.icon as IconifyName} />
                </Box>

                <Box>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                    {item.description}
                  </Typography>
                </Box>
              </Card>
            ))}
          </MotionViewport>
        </Box>

        <Typography
          sx={{
            mt: { xs: 4, md: 6 },
            textAlign: 'center',
            fontStyle: 'italic',
            color: 'text.secondary',
          }}
        >
          {PROBLEM.closing}
        </Typography>
      </Container>
    </Box>
  );
}
