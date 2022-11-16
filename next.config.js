// This file was automatically added by edgio init.
// You should commit this file to source control.
const { withEdgio, withServiceWorker } = require('@edgio/next/config')

require('dotenv').config()
const webpack = require('webpack')
const withReactStorefront = require('react-storefront/plugins/withReactStorefront')
const { PREFETCH_QUERY_PARAM } = require('@edgio/core/constants')
const { withEdgio } = require('@edgio/next/config')

const _preEdgioExport = withEdgio(
  withReactStorefront({
    target: 'serverless',
    prefetchQueryParam: PREFETCH_QUERY_PARAM,
    connector: 'react-storefront/mock-connector',
    webpack: (config, options) => {
      if (!options.isServer) {
        config.plugins.push(
          new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
          })
        )
      }
      return config
    },
  })
)

module.exports = (phase, config) =>
  withEdgio(
    withServiceWorker({
      // Output sourcemaps so that stack traces have original source filenames and line numbers when tailing
      // the logs in the Edgio developer console.
      edgioSourceMaps: true,

      // Set the following to `true` to disable the Edgio dev tools.
      disableEdgioDevTools: false,

      ..._preEdgioExport,
    })
  )
