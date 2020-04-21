const webpack = require('webpack')
const withReactStorefront = require('react-storefront/plugins/withReactStorefront')
const { withServiceWorker } = require('@xdn/next')

module.exports = withReactStorefront(
  withServiceWorker({
    target: 'serverless',

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
