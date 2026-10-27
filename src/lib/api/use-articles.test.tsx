import type { ReactNode } from 'react';

import { it, expect, describe } from 'vitest';
import { act, waitFor, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { stubFetch, sentRequest, jsonResponse } from 'src/test/fetch-mock';

import { ApiError } from './client';
import { articleKeys } from './articles';
import { useArticlesQuery } from './use-articles';

// ----------------------------------------------------------------------

function renderArticlesQuery(initialPage: number) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  const hook = renderHook(({ page }) => useArticlesQuery({ page, category: 'news' }), {
    wrapper,
    initialProps: { page: initialPage },
  });

  return { queryClient, ...hook };
}

const listReply = (slug: string) => jsonResponse({ data: [{ slug, title: slug }], message: 'OK' });

describe('useArticlesQuery', () => {
  it('loads the page for the filters and caches it under the same key as the server prefetch', async () => {
    const fetchMock = stubFetch(listReply('artikel-pertama'));

    const { result, queryClient } = renderArticlesQuery(2);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.articles.map((item) => item.slug)).toEqual(['artikel-pertama']);
    expect(sentRequest(fetchMock).url).toContain('page=2&limit=12&category=news');
    expect(queryClient.getQueryData(articleKeys.list({ page: 2, category: 'news' }))).toBe(
      result.current.data
    );
  });

  it('keeps showing the previous page while the next page loads', async () => {
    stubFetch(listReply('halaman-satu'), new Promise<never>(() => {}));

    const { result, rerender } = renderArticlesQuery(1);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    act(() => rerender({ page: 2 }));

    expect(result.current.isPlaceholderData).toBe(true);
    expect(result.current.data?.articles[0]?.slug).toBe('halaman-satu');
  });

  it('exposes a backend failure as ApiError', async () => {
    stubFetch(jsonResponse({ data: null, message: 'Kategori tidak ditemukan.' }, 404));

    const { result } = renderArticlesQuery(1);

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(ApiError);
    expect(result.current.error).toMatchObject({ status: 404 });
  });
});
