'use client';

import type { IPostProps } from 'src/types/blog';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';

import { fDate } from 'src/utils/format-time';

import { _articles } from 'src/_mock';

import { Label } from 'src/components/label';
import { Image } from 'src/components/image';
import { Markdown } from 'src/components/markdown';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ArticleItem } from '../article-item';

// ----------------------------------------------------------------------

type ArticleDetailsViewProps = {
  article: IPostProps;
};

export function ArticleDetailsView({ article }: ArticleDetailsViewProps) {
  const relatedArticles = _articles.filter((item) => item.id !== article.id).slice(0, 3);

  return (
    <Container sx={{ pt: { xs: 3, md: 5 }, pb: { xs: 10, md: 15 } }}>
      <CustomBreadcrumbs
        links={[
          { name: 'Home', href: '/' },
          { name: 'Article', href: paths.article.root },
          { name: article.title },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Label variant="soft" color="info" sx={{ mb: 2, alignSelf: 'flex-start' }}>
          {article.category}
        </Label>

        <Typography variant="h2" component="h1">
          {article.title}
        </Typography>

        <Typography variant="h5" component="p" sx={{ mt: 3, color: 'text.secondary' }}>
          {article.description}
        </Typography>

        <Box sx={{ my: 5, gap: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={article.author.avatarUrl}
            alt={article.author.name}
            sx={{ width: 48, height: 48 }}
          />

          <ListItemText
            primary={article.author.name}
            secondary={`${fDate(article.createdAt)} • ${article.duration}`}
            slotProps={{
              primary: { sx: { typography: 'subtitle2' } },
              secondary: { sx: { typography: 'caption', color: 'text.disabled' } },
            }}
          />
        </Box>

        <Image src={article.heroUrl} alt={article.title} ratio="16/9" sx={{ borderRadius: 3 }} />

        <Markdown content={article.content} sx={{ mt: 5 }} />

        {!!article.tags?.length && (
          <Box sx={{ mt: 5, gap: 1, display: 'flex', flexWrap: 'wrap' }}>
            {article.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" variant="soft" />
            ))}
          </Box>
        )}
      </Box>

      <Divider sx={{ mt: { xs: 8, md: 10 }, mb: { xs: 5, md: 8 } }} />

      <Typography variant="h4" sx={{ mb: 5 }}>
        Related articles
      </Typography>

      <Box
        sx={{
          columnGap: 4,
          rowGap: { xs: 5, md: 8 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        }}
      >
        {relatedArticles.map((item) => (
          <ArticleItem key={item.id} article={item} />
        ))}
      </Box>
    </Container>
  );
}
