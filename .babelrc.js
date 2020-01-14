const plugins = [
  [
    'babel-plugin-transform-imports',
    {
      '@material-ui/core': {
        // Use "transform: '@material-ui/core/${member}'," if your bundler does not support ES modules
        transform: '@material-ui/core/${member}',
        preventFullImport: true
      },
      '@material-ui/icons': {
        // Use "transform: '@material-ui/icons/${member}'," if your bundler does not support ES modules
        transform: '@material-ui/icons/${member}',
        preventFullImport: true
      }
    }
  ]
]

const presets = ['next/babel']

module.exports = { plugins, presets }
