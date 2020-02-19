const Router = require('xdn-router/Router')
const createNextPlugin = require('xdn-next/router/createNextPlugin')

const {
  API_CACHE_CONFIG,
  SSR_CACHE_CONFIG,
  FAR_FUTURE_CACHE_CONFIG,
  cacheResponse,
} = require('./cache')

module.exports = app => {
  const { nextMiddleware, renderNext } = createNextPlugin(app)

  return new Router()
    .match('/service-worker.js', async ({ cache, serveStatic }) => {
      cache({
        ...FAR_FUTURE_CACHE_CONFIG,
        browser: {
          httpCacheSeconds: 0,
        },
      })
      await serveStatic('.next/service-worker.js')
    })
    .match('/', cacheResponse(SSR_CACHE_CONFIG))
    .match('/api/', cacheResponse(API_CACHE_CONFIG))
    .match('/s/:subcategoryId', cacheResponse(SSR_CACHE_CONFIG))
    .match('/api/s/:subcategoryId', cacheResponse(API_CACHE_CONFIG))
    .match('/p/:productId', cacheResponse(SSR_CACHE_CONFIG))
    .match('/api/p/:productId', cacheResponse(API_CACHE_CONFIG))
    .use(nextMiddleware)
    .fallback(({ proxy }) => proxy('legacy'))
}
