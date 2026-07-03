import ky, { HTTPError } from 'ky';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------
// Response envelope — see marketplace-be/docs/api-contract/README.md
// { data, message, meta: { pagination? }, errors }

export type ApiPagination = {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
};

export type ApiMeta = {
  pagination?: ApiPagination;
} | null;

export type ApiEnvelope<T> = {
  data: T;
  message: string;
  meta?: ApiMeta;
  errors?: Record<string, string[]> | null;
};

export class ApiError extends Error {
  status: number;

  errors: Record<string, string[]> | null;

  constructor(status: number, message: string, errors: Record<string, string[]> | null = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

// ----------------------------------------------------------------------

/**
 * The browser always talks to the public API URL. On the server (RSC, sitemap)
 * an internal URL can be preferred via the non-public `API_URL` env — useful when
 * FE and BE share a private network (e.g. k8s) — falling back to the public one.
 */
function getBaseUrl() {
  const raw =
    typeof window === 'undefined' && CONFIG.serverApiUrl ? CONFIG.serverApiUrl : CONFIG.apiUrl;

  // Standard URL resolution drops the last path segment of a slash-less base
  // (new URL('api/x', 'https://h/prefix') → https://h/api/x) — force exactly
  // one trailing slash so a path-prefixed API URL keeps its prefix.
  return raw ? `${raw.replace(/\/+$/, '')}/` : '';
}

/**
 * Shared ky instance for the Go backend. Injects the `X-Company-Slug` tenant
 * header required by all public `/api/*` endpoints. ky forwards Next.js cache
 * options (`next: { revalidate, tags }`) to the patched fetch on the server
 * (ky >= 1.13), and browsers ignore them — one instance serves both runtimes.
 *
 * This instance is unauthenticated. When auth lands, extend it client-side:
 * `api.extend({ hooks: { beforeRequest: [attachToken], afterResponse: [refreshOn401] } })`.
 */
export const api = ky.create({
  baseUrl: getBaseUrl(),
  timeout: 10_000,
  // Only send the tenant header when configured — an empty `X-Company-Slug:`
  // would still be transmitted and rejected by the backend middleware.
  headers: CONFIG.companySlug ? { 'X-Company-Slug': CONFIG.companySlug } : undefined,
});

export type ApiFetchOptions = {
  /** Query string params — empty string / null / undefined entries are skipped. */
  params?: Record<string, string | number | boolean | null | undefined>;
  method?: 'get' | 'post' | 'put' | 'delete';
  body?: unknown;
  signal?: AbortSignal;
  /** Next.js Data Cache options — honored on the server, ignored by browsers. */
  next?: NextFetchRequestConfig;
  cache?: RequestCache;
};

function cleanParams(params: ApiFetchOptions['params']) {
  const search: Record<string, string> = {};

  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined && value !== null && value !== '') {
      search[key] = String(value);
    }
  }

  return search;
}

/**
 * Typed request against the Go backend: unwraps the response envelope and
 * throws `ApiError` on non-2xx (with the backend's message + field errors).
 *
 * NOTE: paths are relative (no leading slash) so they resolve against
 * `baseUrl` even when it carries a path prefix — use the `endpoints` map,
 * which follows this convention.
 */
export async function apiFetch<T>(
  path: string,
  { params, method = 'get', body, ...options }: ApiFetchOptions = {}
): Promise<ApiEnvelope<T>> {
  if (!getBaseUrl()) {
    throw new ApiError(0, 'API URL is not configured — set NEXT_PUBLIC_API_URL in .env');
  }

  if (!CONFIG.companySlug) {
    throw new ApiError(
      0,
      'Company slug is not configured — set NEXT_PUBLIC_COMPANY_SLUG in .env (required X-Company-Slug header)'
    );
  }

  try {
    return await api<ApiEnvelope<T>>(path, {
      method,
      searchParams: cleanParams(params),
      ...(body !== undefined && { json: body }),
      ...options,
    }).json();
  } catch (error) {
    if (error instanceof HTTPError) {
      const payload = (await error.response.json().catch(() => null)) as ApiEnvelope<null> | null;

      throw new ApiError(
        error.response.status,
        payload?.message || error.message,
        payload?.errors ?? null
      );
    }
    throw error;
  }
}
