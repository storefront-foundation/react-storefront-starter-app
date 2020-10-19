const { existsSync, readFileSync } = require('fs')
const { join } = require('path')

// Read the Next.js build ID from '.next/BUILD_ID
const buildIdPath = join(process.cwd(), '.next', 'BUILD_ID')

// Configures all of the pages that should be statically rendered during deployment.
// Here we prerender the homepage, first 10 categories and first 10 products
module.exports = async function prerender() {
  const requests = [{ path: '/' }]

  for (let i = 1; i <= 10; i++) {
    requests.push({ path: `/s/${i}` })
    requests.push({ path: `/p/${i}` })
  }

  if (existsSync(buildIdPath)) {
    // Derive the API requests from the HTML page URLs
    const buildId = readFileSync(buildIdPath, 'utf8')
    const apiPaths = requests.map(req => ({ path: `/api${req.path}?__v__=${buildId}` }))
    requests.push(...apiPaths)
  }

  return requests
}
