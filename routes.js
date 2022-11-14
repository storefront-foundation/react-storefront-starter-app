const { nextRoutes } = require('@edgio/next')
const { Router } = require('@edgio/core/router')

const { API, SSR, cacheResponse } = require('./cache')
const prerenderRequests = require('./edgio/prerenderRequests')

module.exports = new Router()
  .prerender(prerenderRequests)
  .match('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('.next/static/service-worker.js')
  })
  .match('/', cacheResponse(SSR))
  .match('/api', cacheResponse(API))
  .match('/s/:categorySlug*', cacheResponse(SSR))
  .match('/api/s/:categorySlug*', cacheResponse(API))
  .match('/p/:productId', cacheResponse(SSR))
  .match('/api/p/:productId', cacheResponse(API))
  .use(nextRoutes)
  .fallback(({ proxy }) => proxy('legacy'))
