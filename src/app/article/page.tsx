import type { Metadata } from 'next';

import { ArticleListView } from 'src/sections/article/view/article-list-view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Article - Venturo',
  description:
    'Insights and updates on technology, software engineering, IT infrastructure, and artificial intelligence from the Venturo team.',
};

export default function Page() {
  return <ArticleListView />;
}
