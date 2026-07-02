'use client';

import type { FaqGroup } from 'src/lib/api';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { Iconify } from 'src/components/iconify';

import { FAQS } from './home-data';
import { HomeHeading } from './home-heading';

// ----------------------------------------------------------------------

// Static copy as fallback when the FAQ API is unreachable or empty.
const FALLBACK_GROUPS: FaqGroup[] = [
  {
    key: 'fallback',
    title: '',
    entries: FAQS.items.map((item) => ({ question: item.question, answer: item.answer })),
  },
];

type HomeFaqsProps = {
  groups?: FaqGroup[] | null;
};

export function HomeFaqs({ groups }: HomeFaqsProps) {
  const resolvedGroups = groups?.length ? groups : FALLBACK_GROUPS;
  const showGroupTitles = resolvedGroups.length > 1;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container>
        <HomeHeading caption={FAQS.caption} title={FAQS.title} />

        <Box sx={{ mx: 'auto', maxWidth: 760 }}>
          {resolvedGroups.map((group) => (
            <Box key={group.key} sx={{ '& + &': { mt: 5 } }}>
              {showGroupTitles && (
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {group.title}
                </Typography>
              )}

              {group.entries.map((entry) => (
                <Accordion key={entry.question}>
                  <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                    <Typography variant="subtitle1">{entry.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ color: 'text.secondary' }}>{entry.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
