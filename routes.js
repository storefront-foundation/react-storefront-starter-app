import { Router } from '@xdn/router'
import createNextPlugin from '@xdn/next/router/createNextPlugin'

import {
  API,
  SSR,
  SERVICE_WORKER,
  cacheResponse,
} from './cache'

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
