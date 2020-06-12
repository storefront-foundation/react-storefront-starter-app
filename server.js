if (process.env.preact === 'true') {
  const moduleAlias = require('module-alias')
  moduleAlias.addAlias('react', 'preact/compat')
  moduleAlias.addAlias('react-dom', 'preact/compat')
  moduleAlias.addAlias('react-ssr-prepass', 'preact-ssr-prepass')
}

const express = require('express')
const port = parseInt(process.env.port, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const path = require('path')
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const app = next({ dev })
const handle = app.getRequestHandler()
const getConfig = require('next/config').default
const { stringify } = require('querystring')
const { serverRuntimeConfig } = getConfig()

app.prepare().then(() => {
  const server = express()

  server.get('/service-worker.js', (req, res) => {
    app.serveStatic(req, res, path.join(__dirname, '.next', 'static', 'service-worker.js'))
  })

  server.get('/pages-manifest.json', (req, res) => {
    app.serveStatic(req, res, path.join(__dirname, '.next', 'server', 'pages-manifest.json'))
  })

  const connector = serverRuntimeConfig.reactStorefront.connector
  const routes = connector && require(connector).routes

  if (routes) {
    for (let route of routes) {
      console.log(`> Route: ${route.source}`)

      // add SSR route
      server.get(route.source, (req, res) => {
        const parsedUrl = parse(req.url, true)
        const { query } = parsedUrl
        app.render(req, res, route.destination, query)
      })

      // and corresponding API route
      server.get(`/api${route.source.replace(/\/$/, '')}`, (req, res) => {
        const search = stringify({ ...req.params, ...req.query })
        const url = `/api${route.destination.replace(/\/$/, '')}${
          search.length ? `?${search}` : ''
        }`
        const parsedUrl = parse(url, true)
        handle(req, res, parsedUrl)
      })
    }
  }

  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
