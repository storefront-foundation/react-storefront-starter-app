const Router = require('xdn-router/Router')
const createNextPlugin = require('xdn-next/router/createNextPlugin')

module.exports = app => {
  const { renderNext, nextMiddleware } = createNextPlugin(app)

  return new Router()
    .match('/service-worker.js', ({ serveStatic }) => serveStatic('.next/service-worker.js'))
    .match('/foo/:p', ({ render }) => {
      render((req, res, params) => renderNext(req, res, { productId: params.p }, '/index.js'))
    })
    .match('/respond', ({ respond }) => {
      respond('<html><body><h1>Static Response from Router with status 201</h1></body></html>', 201)
    })
    .use(nextMiddleware)
    .fallback(({ proxy }) => {
      proxy('legacy', { path: '{path}' })
    })
}
