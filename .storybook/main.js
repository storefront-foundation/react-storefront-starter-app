const path = require('path')
const { PHASE_PRODUCTION_BUILD } = require('next/constants')
const { findPagesDir } = require('next/dist/lib/find-pages-dir')
const loadConfig = require('next/dist/server/config').default
const getWebpackConfig = require('next/dist/build/webpack-config').default

const CWD = process.cwd()

module.exports = {
  "stories": [
    "../.storybook/**/*.stories.mdx",
    "../.storybook/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-viewport",
    "@storybook/addon-toolbars",
    "@storybook/addon-jest",
    "@storybook/addon-a11y",
    "@storybook/addon-measure",
    // "@next/plugin-storybook",
    "storybook-addon-pseudo-states",
    "@storybook/addon-actions"
  ],
  "webpackFinal": async (config, { configType }) => {

    const svgRule = config.module.rules.find((rule) => 'test.svg'.match(rule.test));
    svgRule.test = RegExp(svgRule.test.source.replace('svg|', ''))

    const assetLoader = {
      loader: svgRule.loader,
      options: svgRule.options || svgRule.query
    };

    config.module.rules.unshift({
      test: /\.svg$/,
      use: ["@svgr/webpack", assetLoader]
    });

    config = await setupNextStoryBook(config)
    return config;
  },
  core: {
    builder: "webpack5",
  },
  babel: async (options) => {
    options.plugins.push('babel-plugin-inline-react-svg');
    return options;
  }
}

async function  setupNextStoryBook(config) {
  const pagesDir = findPagesDir(CWD)
  const nextConfig = await loadConfig(PHASE_PRODUCTION_BUILD, CWD)
  const nextWebpackConfig = await getWebpackConfig(CWD, {
    pagesDir,
    entrypoints: {},
    isServer: false,
    target: 'server',
    config: nextConfig,
    buildId: 'storybook',
    rewrites: { beforeFiles: [], afterFiles: [], fallback: [] },
  })

  config.plugins = [...config.plugins, ...nextWebpackConfig.plugins.filter((plugin)=>plugin.constructor.name !== "ProfilingPlugin")]

  config.resolve = {
    ...config.resolve,
    ...nextWebpackConfig.resolve,
  }

  config.module.rules = [
    ...filterModuleRules(config),
    ...nextWebpackConfig.module.rules.map((rule) => {
      // we need to resolve next-babel-loader since it's not available
      // relative with storybook's config
      if (rule.use && rule.use.loader === 'next-babel-loader') {
        rule.use.loader = require.resolve(
            'next/dist/build/webpack/loaders/next-babel-loader'
        )
      }
      return rule
    }),
  ]

  return config
}

function filterModuleRules(config) {
  return config.module.rules.filter((rule) => {
    // the rules we're filtering use RegExp for the test
    if (!(rule.test instanceof RegExp)) return true
    // use Next.js' built-in CSS
    if (rule.test.test('hello.css')) {
      return false
    }
    // use next-babel-loader instead of storybook's babel-loader
    if (
        rule.test.test('hello.js') &&
        Array.isArray(rule.use) &&
        rule.use[0].loader === 'babel-loader'
    ) {
      return false
    }
    return true
  })
}
