'use client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { _articles } from 'src/_mock';

import { ArticleList } from '../article-list';

// ----------------------------------------------------------------------

export function ArticleListView() {
  return (
    <Container sx={{ pt: { xs: 5, md: 8 } }}>
      <Typography variant="h2" component="h1">
        Article
      </Typography>

      <Typography sx={{ mt: 2, mb: { xs: 5, md: 8 }, color: 'text.secondary', maxWidth: 560 }}>
        Insights and updates on technology, software engineering, IT infrastructure, and artificial
        intelligence from the Venturo team.
      </Typography>

      <ArticleList articles={_articles} />
    </Container>
  );
}
