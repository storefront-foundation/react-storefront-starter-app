const Router = require('xdn-router/Router')
const createNextPlugin = require('xdn-next/router/createNextPlugin')

module.exports = app => {
  const { nextMiddleware } = createNextPlugin(app)

  return new Router()
    .match('/service-worker.js', ({ serveStatic }) => serveStatic('.next/service-worker.js'))
    .use(nextMiddleware)
    .fallback(({ proxy }) => {
      proxy('legacy', { path: '{path}' })
    })
}
