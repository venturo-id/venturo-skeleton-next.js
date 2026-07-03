export const paths = {
  home: '/',
  /**
   * Article
   */
  article: {
    root: '/article',
    details: (slug: string) => `/article/${slug}`,
  },
  /**
   * Common
   */
  maintenance: '/maintenance',
  comingsoon: '/coming-soon',
  support: '/support',
  page404: '/error/404',
  page500: '/error/500',
  /**
   * Others
   */
  blank: '/blank',
  components: '/components',
};
