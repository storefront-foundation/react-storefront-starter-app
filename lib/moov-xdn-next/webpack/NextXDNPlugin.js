const path = require('path')
const fs = require('fs')
const glob = require('glob')
const pathToRegexp = require('path-to-regexp')
const get = require('lodash/get')

/**
 * Creates .moov/oem.json by calling the getEdgeCacheConfig() static method
 * on each page component.
 */
module.exports = class NextXDNPlugin {
  constructor({ outputFile }) {
    this.outputFile = outputFile
    this.previousOEMConfigJson = null
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap('NextXDNPlugin', compilation => {
      console.log('building Moovweb XDN config...')

      const oemConfig = { custom_cache_keys: [] }
      const pagesDir = path.join(compiler.options.output.path, 'serverless', 'pages')

      const pages = glob.sync('**/*.{js,html}', {
        cwd: pagesDir,
      })

      for (let pagePath of pages) {
        const modulePath = path.join(pagesDir, pagePath)
        console.log('modulePath', modulePath)
        const mod = pagePath.endsWith('.js') ? require(modulePath).default : {}
        const route = toRouteSyntax(pagePath.replace(/\.(html|js)$/, ''))
        const pattern = pathToRegexp(route).toString()

        let customCacheKey

        if (pagePath.startsWith('api/')) {
          if (pagePath.startsWith('api/p/[productId]'))
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

      fs.writeFileSync(
        path.join('.moov', 'oem.json'),
        JSON.stringify(oemConfig, null, '  '),
        'utf8',
      )
    })
  }
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
