'use client';

import type { IPostProps } from 'src/types/blog';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { ArticleItem } from './article-item';

// ----------------------------------------------------------------------

const ARTICLES_PER_PAGE = 6;

type ArticleListProps = {
  articles: IPostProps[];
};

export function ArticleList({ articles }: ArticleListProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

  const displayedArticles = articles.slice(
    (page - 1) * ARTICLES_PER_PAGE,
    page * ARTICLES_PER_PAGE
  );

  const handleChangePage = useCallback((event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Box
        sx={{
          columnGap: 4,
          rowGap: { xs: 5, md: 8 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        }}
      >
        {displayedArticles.map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </Box>

      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChangePage}
        sx={{
          py: { xs: 8, md: 10 },
          [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
        }}
      />
    </>
  );
}
