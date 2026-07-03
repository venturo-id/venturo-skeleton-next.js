'use client';

import type { FaqGroup } from 'src/lib/api';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// Data-only import: fallback FAQ statis yang sama dengan section home,
// supaya halaman ini tetap berisi saat API mati.
import { FAQS } from 'src/sections/_home/home-data';

import { SupportHero } from '../support-hero';
import { SupportContent } from '../support-content';

// ----------------------------------------------------------------------

const FALLBACK_GROUPS: FaqGroup[] = [
  {
    key: 'fallback',
    title: 'Umum',
    entries: FAQS.items.map((item) => ({ question: item.question, answer: item.answer })),
  },
];

type SupportViewProps = {
  faqGroups?: FaqGroup[] | null;
};

export function SupportView({ faqGroups }: SupportViewProps) {
  const resolvedGroups = faqGroups?.length ? faqGroups : FALLBACK_GROUPS;
  const showGroupTitles = resolvedGroups.length > 1;

  return (
    <>
      <SupportHero />

      <Container component="section" sx={{ pb: { xs: 10, md: 15 } }}>
        <Box sx={{ mx: 'auto', maxWidth: 860, pt: { xs: 5, md: 8 } }}>
          {resolvedGroups.map((group) => (
            <Box key={group.key} sx={{ '& + &': { mt: 6 } }}>
              {showGroupTitles && (
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                  {group.title}
                </Typography>
              )}

              <SupportContent contents={group.entries} />
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
}
