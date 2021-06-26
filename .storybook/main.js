const path = require('path')

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
    "@next/plugin-storybook",
    "storybook-addon-pseudo-states",
    "@storybook/addon-actions"
  ],
}
