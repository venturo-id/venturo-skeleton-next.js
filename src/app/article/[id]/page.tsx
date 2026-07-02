import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { _articles } from 'src/_mock';

import { ArticleDetailsView } from 'src/sections/article/view/article-details-view';

// ----------------------------------------------------------------------

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const article = _articles.find((item) => item.id === id);

  return {
    title: article ? `${article.title} - Venturo` : 'Article not found - Venturo',
    description: article?.description,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const article = _articles.find((item) => item.id === id);

  if (!article) {
    notFound();
  }

  return <ArticleDetailsView article={article} />;
}

export function generateStaticParams() {
  return _articles.map((article) => ({ id: article.id }));
}
