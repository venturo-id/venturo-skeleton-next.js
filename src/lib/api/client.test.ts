// @vitest-environment node
import { it, expect, describe } from 'vitest';

import { stubFetch, sentRequest, jsonResponse } from 'src/test/fetch-mock';

import { ApiError, apiFetch } from './client';

// ----------------------------------------------------------------------

describe('apiFetch request', () => {
  it('unwraps the envelope and sends the tenant header with only non-empty params', async () => {
    const fetchMock = stubFetch(jsonResponse({ data: { ok: true }, message: 'OK' }));

    const envelope = await apiFetch<{ ok: boolean }>('api/articles', {
      params: { page: 2, search: '', category: null, featured: false },
    });

    expect(envelope.data).toEqual({ ok: true });
    const request = sentRequest(fetchMock);
    expect(request.url).toBe('https://api.example.test/v1/api/articles?page=2&featured=false');
    expect(request.headers.get('X-Company-Slug')).toBe('acme');
  });
});

describe('apiFetch errors', () => {
  it('maps a non-2xx envelope to ApiError with the backend message and field errors', async () => {
    const fieldErrors = { search: ['Maksimal 100 karakter.'] };
    const fetchMock = stubFetch(
      jsonResponse({ data: null, message: 'Validasi gagal.', errors: fieldErrors }, 422)
    );

    const failure = apiFetch('api/articles');

    await expect(failure).rejects.toBeInstanceOf(ApiError);
    await expect(failure).rejects.toMatchObject({
      status: 422,
      message: 'Validasi gagal.',
      errors: fieldErrors,
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('keeps the HTTP status when the error body is not an envelope', async () => {
    stubFetch(new Response('Not Found', { status: 404 }));

    await expect(apiFetch('api/articles/missing')).rejects.toMatchObject({
      name: 'ApiError',
      status: 404,
      errors: null,
    });
  });

  it('maps a network failure to ApiError status 0 and does not retry a POST', async () => {
    const fetchMock = stubFetch(new TypeError('fetch failed'));

    const failure = apiFetch('api/contact', { method: 'post', body: { name: 'Budi' } });

    await expect(failure).rejects.toMatchObject({ name: 'ApiError', status: 0 });
    await expect(failure).rejects.toThrow(/^Network error/);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('passes an abort through unchanged', async () => {
    stubFetch(new DOMException('The operation was aborted.', 'AbortError'));

    const failure = apiFetch('api/articles');

    await expect(failure).rejects.toMatchObject({ name: 'AbortError' });
    await expect(failure).rejects.not.toBeInstanceOf(ApiError);
  });
});
