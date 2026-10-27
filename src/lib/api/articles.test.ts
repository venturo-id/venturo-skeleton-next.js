// @vitest-environment node
import { it, expect, describe } from 'vitest';

import { stubFetch, sentRequest, jsonResponse } from 'src/test/fetch-mock';

import { getArticles, articleKeys, ARTICLES_PER_PAGE, parseArticleListParams } from './articles';

// ----------------------------------------------------------------------

describe('parseArticleListParams', () => {
  it('takes the first value of a repeated param and defaults the rest', () => {
    expect(parseArticleListParams({ category: ['news', 'promo'], search: ['a', 'b'] })).toEqual({
      page: 1,
      search: 'a',
      category: 'news',
    });
  });

  it.each([
    ['3', 3],
    ['2.5', 2],
    ['0', 1],
    ['-4', 1],
    ['abc', 1],
    [null, 1],
  ])('clamps page %s to the integer %d (contract: int >= 1)', (page, expected) => {
    expect(parseArticleListParams({ page }).page).toBe(expected);
  });
});

describe('articleKeys.list', () => {
  it('serializes every filter so different limits never share a cache entry', () => {
    expect(articleKeys.list({ page: 1 })).toEqual([
      'articles',
      'list',
      { page: 1, limit: ARTICLES_PER_PAGE, search: '', category: '' },
    ]);
    expect(articleKeys.list({ page: 1, limit: 4 })).not.toEqual(articleKeys.list({ page: 1 }));
  });
});

describe('getArticles', () => {
  const article = { slug: 'halo-dunia', title: 'Halo Dunia' };

  it('validates the list and the pagination from meta', async () => {
    const pagination = { page: 2, limit: 12, total: 13, total_pages: 2 };
    const fetchMock = stubFetch(
      jsonResponse({ data: [article], message: 'OK', meta: { pagination } })
    );

    const result = await getArticles({ page: 2, category: 'news' });

    expect(result.pagination).toEqual(pagination);
    expect(result.articles).toEqual([{ ...article, excerpt: '', author: '' }]);
    expect(sentRequest(fetchMock).url).toContain('page=2&limit=12&category=news');
  });

  it('turns a null list into [] with a single-page fallback pagination', async () => {
    stubFetch(jsonResponse({ data: null, message: 'OK' }));

    await expect(getArticles()).resolves.toEqual({
      articles: [],
      pagination: { page: 1, limit: ARTICLES_PER_PAGE, total: 0, total_pages: 1 },
    });
  });

  it('fails loudly when the backend drops a required field', async () => {
    stubFetch(jsonResponse({ data: [{ slug: 'tanpa-judul' }], message: 'OK' }));

    await expect(getArticles()).rejects.toThrow(/title/);
  });
});
