import getRoutes from 'react-storefront/server/getRoutes'
import fs from 'fs'
import path from 'path'

// Depending on the context (local dev, serverless lambda), the page manifest
// file can be at different locations
const MANIFEST_PATHS = [
  path.join(process.cwd(), 'pages-manifest.json'),
  path.join(process.cwd(), '.next', 'server', 'pages-manifest.json'),
  path.join(process.cwd(), '.next', 'serverless', 'pages-manifest.json'),
]

export default function routes(req, res) {
  let routesJson = '{}'

  try {
    const manifestPath = MANIFEST_PATHS.find(path => fs.existsSync(path))
    if (manifestPath) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
      const routes = getRoutes(manifest)
      routesJson = JSON.stringify(routes)
    } else {
      throw new Error(`Could not find pages-manifests.json in ${MANIFEST_PATHS.join(' or ')}`)
    }
  } catch (e) {
    console.error(e)
  }

  res.end(routesJson)
}
