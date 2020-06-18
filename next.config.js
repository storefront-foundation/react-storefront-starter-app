const webpack = require('webpack')
const withReactStorefront = require('react-storefront/plugins/withReactStorefront')
const { PREFETCH_QUERY_PARAM } = require('@xdn/prefetch/constants')
const withXDN = require('@xdn/next/withXDN')

module.exports = withXDN(
  withReactStorefront({
    target: 'serverless',
    prefetchQueryParam: PREFETCH_QUERY_PARAM,
    connector: 'react-storefront/mock-connector',
    webpack: config => {
      config.plugins.push(
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        })
      )
      return config
    },
  })
)
