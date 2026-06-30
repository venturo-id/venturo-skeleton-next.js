'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';

import { HomeHeading } from './home-heading';
import { asset, TECH_STACK } from './home-data';

// ----------------------------------------------------------------------

export function HomeTechStack() {
  const [tab, setTab] = useState(0);

  const group = TECH_STACK.groups[tab];

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.neutral' }}>
      <Container>
        <HomeHeading caption={TECH_STACK.caption} title={TECH_STACK.title} />

        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          variant="scrollable"
          scrollButtons={false}
          sx={{
            mb: 5,
            justifyContent: 'center',
            '& .MuiTabs-flexContainer': { justifyContent: 'center' },
          }}
        >
          {TECH_STACK.groups.map((item) => (
            <Tab key={item.label} label={item.label} />
          ))}
        </Tabs>

        <Box
          sx={{
            gap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(6, 1fr)',
            },
          }}
        >
          {group.logos.map((logo) => (
            <Box
              key={logo}
              sx={{
                p: 2.5,
                height: 100,
                display: 'grid',
                borderRadius: 2,
                placeItems: 'center',
                bgcolor: 'background.paper',
                boxShadow: (theme) => theme.customShadows.z8,
              }}
            >
              <Box
                component="img"
                alt={logo}
                src={asset(logo)}
                sx={{ maxWidth: 1, maxHeight: 44, objectFit: 'contain' }}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
