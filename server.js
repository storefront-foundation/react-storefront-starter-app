if (process.env.preact !== 'false') {
  const moduleAlias = require('module-alias')
  moduleAlias.addAlias('react', 'preact/compat')
  moduleAlias.addAlias('react-dom', 'preact/compat')
  moduleAlias.addAlias('react-ssr-prepass', 'preact-ssr-prepass')
}

const port = parseInt(process.env.port, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const path = require('path')
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    if (pathname === '/service-worker.js') {
      app.serveStatic(req, res, path.join(__dirname, '.next', 'static', 'service-worker.js'))
    } else if (pathname.indexOf('/serviceWorkerBootstrap.') === 0) {
      app.serveStatic(req, res, path.join(__dirname, '.next', pathname.substr(1)))
    } else if (pathname === '/pages-manifest.json') {
      app.serveStatic(req, res, path.join(__dirname, '.next', 'server', 'pages-manifest.json'))
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
