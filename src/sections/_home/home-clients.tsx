'use client';

import AutoScroll from 'embla-carousel-auto-scroll';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Carousel, useCarousel } from 'src/components/carousel';

import { HERO, CLIENTS } from './home-data';

// ----------------------------------------------------------------------

export function HomeClients() {
  const carousel = useCarousel(
    { loop: true, slidesToShow: { xs: 2.5, sm: 4, md: 6 }, slideSpacing: '24px' },
    [AutoScroll({ playOnInit: true, speed: 1, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  if (!CLIENTS.length) {
    return null;
  }

  return (
    <Box component="section" sx={{ pb: { xs: 6, md: 10 } }}>
      <Container>
        <Typography variant="subtitle2" sx={{ mb: 3, color: 'text.secondary' }}>
          {HERO.trustedLabel}
        </Typography>

        <Carousel
          carousel={carousel}
          sx={{
            // soft fade on both edges of the marquee
            maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
          }}
        >
          {CLIENTS.map((client) => (
            <Box
              key={client.name}
              sx={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Box
                component="img"
                alt={client.name}
                src={client.logo}
                sx={{ maxWidth: 150, maxHeight: 36, objectFit: 'contain' }}
              />
            </Box>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}
