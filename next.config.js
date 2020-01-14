const path = require('path')
const webpack = require('webpack')
const API_VERSION = new Date().getTime()
const CopyPlugin = require('copy-webpack-plugin')
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const withServiceWorker = require('react-storefront/webpack/withServiceWorker')
const copyBootstrap = require('react-storefront/service-worker/copyBootstrap')
const ClearRequireCachePlugin = require('webpack-clear-require-cache-plugin')

module.exports = (phase, { defaultConfig }) => {
  const bootstrapOptions = {
    prefetchRampUpTime: -5000,
    allowPrefetchThrottling: false,
    serveSSRFromCache: false,
  }
  // if debugging service workers, options can be change in Dev phase:
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    bootstrapOptions.allowPrefetchThrottling = true
  }
  const { bootstrapPath, makeCopyOptions } = copyBootstrap(bootstrapOptions)

  return withServiceWorker(
    {
      target: 'serverless',
      webpack(config, options) {
        config.resolve.symlinks = false
        config.resolve.alias = {
          ...config.resolve.alias,
          'moov-xdn-next': path.resolve('./lib/moov-xdn-next/src'),
          'moov-xdn': path.resolve('./lib/moov-xdn/src'),
          // preact
          react: 'preact/compat',
          react$: 'preact/compat',
          'react-dom/test-utils': 'preact/test-utils',
          'react-dom': 'preact/compat',
          'react-dom$': 'preact/compat',
        }

        config.plugins.push(
          new webpack.DefinePlugin({
            'process.env.RSF_API_VERSION': JSON.stringify(API_VERSION),
          }),
        )

        config.plugins.push(new CopyPlugin([makeCopyOptions(config.output.path)]))
        if (process.env.NODE_ENV === 'development') {
          // required to recompile server build when linked dependency changes
          config.plugins.push(
            new ClearRequireCachePlugin([
              /\.next\/server\/ssr-module-cache.js/,
              /react-storefront-analytics/,
              /react-storefront-amp/,
              /react-storefront\//,
            ]),
          )
        }

        config.module.rules.push({
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        })

        if (!options.isServer && process.env.analyze === 'true') {
          config.plugins.push(new BundleAnalyzerPlugin())
        }

        return config
      },
      webpackDevMiddleware(config) {
        config.watchOptions = {
          // required to recompile client build when there are changes in node_modules
          ignored: [],
        }
        return config
      },
    },
    bootstrapPath,
  )
}
