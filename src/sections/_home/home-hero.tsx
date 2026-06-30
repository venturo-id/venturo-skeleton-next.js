'use client';

import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport, AnimateCountUp } from 'src/components/animate';

import { HERO, asset, CONTACT } from './home-data';

// ----------------------------------------------------------------------

export function HomeHero() {
  return (
    <Box
      component="section"
      sx={(theme) => ({
        overflow: 'hidden',
        position: 'relative',
        py: { xs: 8, md: 14 },
        background: `linear-gradient(180deg, ${varAlpha(theme.vars.palette.primary.lighterChannel, 0.4)}, ${varAlpha(theme.vars.palette.primary.lighterChannel, 0)})`,
      })}
    >
      <Container>
        <Box
          sx={{
            gap: { xs: 5, md: 8 },
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <MotionViewport sx={{ flex: 1 }}>
            <m.div variants={varFade('inUp')}>
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  mb: 3,
                  borderRadius: 1,
                  typography: 'subtitle2',
                  color: 'primary.dark',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.75,
                  bgcolor: 'primary.lighter',
                }}
              >
                <Iconify width={18} icon="solar:check-circle-bold" />
                {HERO.badge}
              </Box>
            </m.div>

            <Typography component={m.h1} variants={varFade('inUp')} variant="h1" sx={{ mb: 3 }}>
              {HERO.title}
            </Typography>

            <Typography
              component={m.p}
              variants={varFade('inUp')}
              sx={{ mb: 4, maxWidth: 520, color: 'text.secondary' }}
            >
              {HERO.description}
            </Typography>

            <Box component={m.div} variants={varFade('inUp')} sx={{ mb: 5 }}>
              <Button
                size="large"
                color="primary"
                variant="contained"
                href={CONTACT.wa}
                target="_blank"
                rel="noopener"
                endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
              >
                {HERO.cta}
              </Button>
            </Box>

            <Box component={m.div} variants={varFade('inUp')} sx={{ display: 'flex', gap: 5 }}>
              {HERO.stats.map((stat) => (
                <Box key={stat.label}>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', color: 'primary.main' }}>
                    <AnimateCountUp to={stat.value} sx={{ typography: 'h2' }} />
                    <Typography component="span" variant="h3">
                      {stat.suffix}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </MotionViewport>

          <Box
            component={m.div}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            sx={{ flex: 1, width: 1 }}
          >
            <Image
              alt={HERO.title}
              src={asset('tim-programmer-venturo-malang-2025.png')}
              ratio="4/3"
              sx={{ borderRadius: 2, boxShadow: (theme) => theme.customShadows.z16 }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
