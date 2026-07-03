import packageJson from '../package.json';

// ----------------------------------------------------------------------

export const CONFIG = {
  appName: 'Venturo',
  appVersion: packageJson.version,
  assetsDir: process.env.NEXT_PUBLIC_ASSETS_DIR ?? '',
  /** Tampilkan galeri referensi /components di build production (dev selalu tampil). */
  showComponents: process.env.NEXT_PUBLIC_SHOW_COMPONENTS === 'true',
  /** Go backend base URL (marketplace-be). */
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
  /** Tenant slug sent as X-Company-Slug on every public API call. */
  companySlug: process.env.NEXT_PUBLIC_COMPANY_SLUG ?? '',
  /**
   * Whitelabel client slug (level di atas company — lihat core/auth.md:
   * JWT membawa client_id + company_id). Dipakai untuk bootstrap translation
   * overrides (`GET /core/v1/translation-overrides?slug={client_slug}`) dan
   * endpoint yang me-resolve tenant via X-Client-Slug.
   */
  clientSlug: process.env.NEXT_PUBLIC_CLIENT_SLUG ?? '',
  /**
   * Public site origin — canonical URLs, OG tags, sitemap, robots.
   * Trailing slashes are stripped so `${siteUrl}/path` never yields `//`.
   */
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:8002').replace(/\/+$/, ''),
};

// Fail the production build instead of silently publishing localhost URLs
// to sitemap/canonical/OG (dev keeps the localhost fallback).
if (
  typeof window === 'undefined' &&
  process.env.NODE_ENV === 'production' &&
  !process.env.NEXT_PUBLIC_SITE_URL
) {
  throw new Error(
    '[global-config] NEXT_PUBLIC_SITE_URL is required in production — canonical/OG/sitemap URLs would point at http://localhost:8002'
  );
}
