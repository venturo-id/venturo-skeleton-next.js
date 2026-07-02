'use client';

import type { ArticleListFilters } from './articles';

import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { articleKeys, getArticles, getArticleCategories } from './articles';

// ----------------------------------------------------------------------

export function useArticlesQuery(filters: ArticleListFilters) {
  return useQuery({
    queryKey: articleKeys.list(filters),
    queryFn: () => getArticles(filters),
    // Keep showing the previous page while the next filter/page loads.
    placeholderData: keepPreviousData,
  });
}

export function useArticleCategoriesQuery() {
  return useQuery({
    queryKey: articleKeys.categories,
    queryFn: () => getArticleCategories(),
    staleTime: 5 * 60 * 1000,
  });
}
