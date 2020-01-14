import cache from './cache'

/**
 * A higher order function that adds caching to a page component or api endpoint
 * @param {Function} target a page component or api endpoint
 * @param {Object} config A cache config object
 * @param {Object} config.browser The browser cache config
 * @param {Object} config.edge The edge cache config
 * @return {Function}
 */
export default function withCaching(target, config) {
  target.xdnCacheConfig = config
  const originalGetInitialProps = target.getInitialProps

  if (originalGetInitialProps) {
    // Page component
    target.getInitialProps = (...args) => {
      const [req] = args

      if (req.res) {
        // res will only be defined during SSR
        cache(req.res, config)
      }

      return originalGetInitialProps(...args)
    }
    return target
  } else {
    if (global.rsfSetCacheConfig) {
      // expose cache config to NextXDNPlugin by calling the function it provides as a global
      global.rsfSetCacheConfig(config)
    }

    // API handler
    return (...args) => {
      const [_req, res] = args
      cache(res, config)
      return target(...args)
    }
  }
}
