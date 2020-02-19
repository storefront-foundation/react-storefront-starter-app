if (process.env.preact === 'true') {
  const moduleAlias = require('module-alias')
  moduleAlias.addAlias('react', 'preact/compat')
  moduleAlias.addAlias('react-dom', 'preact/compat')
  moduleAlias.addAlias('react-ssr-prepass', 'preact-ssr-prepass')
}

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

const { createServer } = require('http')
const next = require('next')
const app = next({ dev })
const router = require('./routes')(app)

app.prepare().then(() => {
  createServer((req, res) => {
    router.run(req, res)
  }).listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
