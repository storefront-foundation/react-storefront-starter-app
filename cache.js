const { CustomCacheKey } = require('@xdn/core/router')

/**
 * 24 hours
 */
const PAGE_TTL = 60 * 60 * 24

/**
 * 10 years
 */
const FAR_FUTURE_TTL = 60 * 60 * 24 * 365 * 10

/**
 * The custom cache key for all SSR and API responses.  Here we ignore all
 * query parameters except ones that we know our app specifically handles.  This
 * prevents cache fragmentation due to unexpected query parameters added in links
 * from 3rd parties.
 */
const key = new CustomCacheKey().excludeAllQueryParametersExcept('q', 'color', 'size')

module.exports = {
  FAR_FUTURE_TTL,
  PAGE_TTL,
  key,

  /**
   * The cache config for all server side rendered pages
   */
  SSR: {
    browser: {
      maxAgeSeconds: 0,
    },
    edge: {
      maxAgeSeconds: PAGE_TTL,
      staleWhileRevalidateSeconds: PAGE_TTL,
      key,
    },
  },

  /**
   * The cache config for all server side rendered pages
   */
  API: {
    browser: {
      maxAgeSeconds: 0,
      serviceWorkerSeconds: PAGE_TTL,
    },
    edge: {
      maxAgeSeconds: PAGE_TTL,
      staleWhileRevalidateSeconds: PAGE_TTL,
      key,
    },
  },

  /**
   * Cache config for static assets that never change and thus can be cached
   * at the edge and in the browser forever.
   */
  FAR_FUTURE: {
    browser: {
      maxAgeSeconds: FAR_FUTURE_TTL,
    },
    edge: {
      maxAgeSeconds: FAR_FUTURE_TTL,
      staleWhileRevalidateSeconds: 60 * 60 * 24,
    },
  },

  /**
   * Cache the service worker at edge, but never in the browser.  Allowing
   * the service worker to be cached in the browser can prevent it from ever being updated.
   */
  SERVICE_WORKER: {
    browser: {
      maxAgeSeconds: 0,
    },
    edge: {
      maxAgeSeconds: FAR_FUTURE_TTL,
      staleWhileRevalidateSeconds: 60 * 60 * 24,
    },
  },

  /**
   * Creates a route handler that caches based on the specified config
   * @param {Object} config A config for @xdn/core's cache function
   * @return {Function} a route handler
   */
  cacheResponse: config => ({ cache }) => cache(config),
}
