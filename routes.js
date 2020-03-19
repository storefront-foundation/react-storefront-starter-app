const Router = require('@xdn/router/Router')
const { createNextPlugin } = require('@xdn/next')
const { API, SSR, SERVICE_WORKER, cacheResponse } = require('./cache')

module.exports = app => {
  const { nextMiddleware, renderNext } = createNextPlugin(app)

  return new Router()
    .match('/service-worker.js', async ({ cache, serveStatic }) => {
      cache(SERVICE_WORKER)
      await serveStatic('.next/static/service-worker.js')
    })
    .match('/', cacheResponse(SSR))
    .match('/api/', cacheResponse(API))
    .match('/s/:subcategoryId', cacheResponse(SSR))
    .match('/api/s/:subcategoryId', cacheResponse(API))
    .match('/p/:productId', cacheResponse(SSR))
    .match('/api/p/:productId', cacheResponse(API))
    .use(nextMiddleware)
    .fallback(({ proxy }) => proxy('legacy'))
}
