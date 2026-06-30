'use client';

import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

import { SOLUTION } from './home-data';
import { HomeHeading } from './home-heading';

// ----------------------------------------------------------------------

export function HomeSolution() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.neutral' }}>
      <Container>
        <HomeHeading caption={SOLUTION.caption} title={SOLUTION.title} />

        <MotionViewport
          sx={{
            gap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {SOLUTION.items.map((item) => (
            <Card
              key={item.title}
              component={m.div}
              variants={varFade('inUp')}
              sx={{
                p: 4,
                height: 1,
                textAlign: 'center',
                transition: (theme) => theme.transitions.create(['box-shadow', 'transform']),
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: (theme) => theme.customShadows.z16,
                },
              }}
            >
              <Box
                sx={{
                  width: 88,
                  height: 88,
                  mx: 'auto',
                  mb: 3,
                  display: 'grid',
                  borderRadius: '50%',
                  placeItems: 'center',
                  bgcolor: (theme) => varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
                }}
              >
                <Box
                  component="img"
                  alt={item.title}
                  src={item.icon}
                  sx={{ width: 48, height: 48, objectFit: 'contain' }}
                />
              </Box>

              <Typography variant="h6" sx={{ mb: 1 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {item.description}
              </Typography>
            </Card>
          ))}
        </MotionViewport>
      </Container>
    </Box>
  );
}
