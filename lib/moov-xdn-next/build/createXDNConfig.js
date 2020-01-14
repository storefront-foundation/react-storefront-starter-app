const fs = require('fs')
const path = require('path')
const pathToRegexp = require('path-to-regexp')
const get = require('lodash/get')

function createXDNConfig() {
  console.log('Creating Moovweb XDN config...')

  const oemConfig = { custom_cache_keys: [] }
  const baseDir = path.join('.next', 'serverless')
  const manifest = JSON.parse(fs.readFileSync(path.join(baseDir, 'pages-manifest.json')))

  for (let key in manifest) {
    const file = manifest[key]
    const mod = file.endsWith('.js') ? require(path.resolve(path.join(baseDir, file))).default : {}
    const route = toRouteSyntax(file.replace(/pages\//, '').replace(/\.(html|js)$/, ''))
    const pattern = pathToRegexp(route).toString()

    let customCacheKey

    if (file.startsWith('pages/api/')) {
      customCacheKey = get(getConfigForApiRoute(mod), 'edge.key')
    } else {
      customCacheKey = get(mod, 'xdnCacheConfig.edge.key')
    }

    if (customCacheKey) {
      oemConfig.custom_cache_keys.push({
        path_regex: pattern,
        ...customCacheKey,
      })
    }
  }

  if (!fs.existsSync('.moov')) {
    fs.mkdirSync('.moov')
  }

  fs.writeFileSync(path.join('.moov', 'oem.json'), JSON.stringify(oemConfig, null, '  '), 'utf8')

  console.log('Moovweb XDN config successfully created.')
}

function toRouteSyntax(pagePath) {
  return pagePath.replace(/\[([^\]]+)\]/g, ':$1')
}

/**
 * Here we extract the config from an API handler wrapped in withCaching
 * by calling it with a mock request, which should in turn call the `global.rsfSetCacheConfig`
 * function we set up to receive the config.  See `withCaching` to understand how `global.rsfSetCacheConfig`
 * is called
 * @param {Function} apiHandler
 */
function getConfigForApiRoute(apiHandler) {
  let config
  global.rsfSetCacheConfig = c => (config = c)
  const req = { headers: {}, url: '/p/1' }
  const res = { end: Function.prototype }
  apiHandler(req, res)
  return config
}

createXDNConfig()
