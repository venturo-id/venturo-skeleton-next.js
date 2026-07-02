import type { Article } from './api/articles';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

/**
 * Google Article structured data — all properties are "recommended" (none
 * required): https://developers.google.com/search/docs/appearance/structured-data/article
 */
export function articleJsonLd(article: Article, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    ...(article.excerpt && { description: article.excerpt }),
    ...(article.cover_url && { image: [article.cover_url] }),
    ...(article.published_at && { datePublished: article.published_at }),
    ...((article.updated_at ?? article.published_at) && {
      dateModified: article.updated_at ?? article.published_at,
    }),
    author: [{ '@type': 'Organization', name: article.author || CONFIG.appName }],
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

/**
 * Serialize for a <script type="application/ld+json"> tag. Escaping `<`
 * blocks `</script>` breakout injection — official Next.js guidance:
 * https://nextjs.org/docs/app/guides/json-ld
 */
export function toJsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
