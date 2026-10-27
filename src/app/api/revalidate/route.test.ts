// @vitest-environment node
import { revalidateTag } from 'next/cache';
import { it, vi, expect, describe } from 'vitest';

import { POST } from './route';

// ----------------------------------------------------------------------

vi.mock('next/cache', () => ({ revalidateTag: vi.fn() }));

const TOKEN = 'test-revalidate-token';

function revalidateRequest(body: unknown, token = TOKEN) {
  return new Request('http://localhost/api/revalidate/', {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

describe('POST /api/revalidate/ rejects', () => {
  it('a wrong bearer token with 401 and purges nothing', async () => {
    const response = await POST(revalidateRequest({ tags: ['articles'] }, 'salah'));

    expect(response.status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it.each([['{}'], ['bukan json']])('the body %s with 400', async (body) => {
    const response = await POST(revalidateRequest(body));

    expect(response.status).toBe(400);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it('an unknown tag with 400 and the allowed list', async () => {
    const response = await POST(revalidateRequest({ tags: ['articles', 'users'] }));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      allowed: expect.arrayContaining(['articles', 'faq']),
    });
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it('every request with 503 while REVALIDATE_TOKEN is not configured', async () => {
    vi.resetModules();
    vi.stubEnv('REVALIDATE_TOKEN', '');
    const route = await import('./route');

    const response = await route.POST(revalidateRequest({ tags: ['articles'] }));

    expect(response.status).toBe(503);
  });
});

describe('POST /api/revalidate/ accepts', () => {
  it('known tags and article slugs, purging each one', async () => {
    const response = await POST(revalidateRequest({ tags: ['articles'], slugs: ['halo-dunia'] }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      revalidated: ['articles', 'article:halo-dunia'],
    });
    expect(vi.mocked(revalidateTag).mock.calls).toEqual([
      ['articles', 'max'],
      ['article:halo-dunia', 'max'],
    ]);
  });
});
