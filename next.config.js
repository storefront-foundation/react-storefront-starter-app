require('dotenv').config()
const webpack = require('webpack')
const withReactStorefront = require('react-storefront/plugins/withReactStorefront')
const { PREFETCH_QUERY_PARAM } = require('@layer0/core/constants')
const { withLayer0 } = require('@layer0/next/config')

module.exports = withLayer0(
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
