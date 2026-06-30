'use client';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Image } from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';

import { MANAGEMENT } from './home-data';
import { HomeHeading } from './home-heading';

// ----------------------------------------------------------------------

export function HomeManagement() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container>
        <HomeHeading
          caption={MANAGEMENT.caption}
          title={MANAGEMENT.title}
          description={MANAGEMENT.description}
        />

        <Box sx={{ mb: { xs: 5, md: 8 }, mx: 'auto', maxWidth: 880 }}>
          <Image
            alt={MANAGEMENT.title}
            src={MANAGEMENT.image}
            ratio="16/9"
            sx={{ borderRadius: 2, boxShadow: (theme) => theme.customShadows.z16 }}
          />
        </Box>

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
          {MANAGEMENT.items.map((item) => (
            <Card
              key={item.title}
              component={m.div}
              variants={varFade('inUp')}
              sx={{ p: 3, height: 1, boxShadow: (theme) => theme.customShadows.z8 }}
            >
              <Box
                component="img"
                alt={item.title}
                src={item.icon}
                sx={{ width: 56, height: 56, mb: 2, objectFit: 'contain' }}
              />
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
