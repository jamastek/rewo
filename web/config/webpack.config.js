/** @returns {import('webpack').Configuration} Webpack Configuration */
const path = require('path')

const aliases = {
  '@/styled': path.resolve(__dirname, './stitches.config.js'),
}

module.exports = (config, { mode }) => {
  if (mode === 'development') {
    // Add dev plugin
  }

  config.resolve.alias = {
    ...config.resolve.alias,
    ...aliases,
  }

  // Add custom rules for your project
  // config.module.rules.push(YOUR_RULE)

  // Add custom plugins for your project
  // config.plugins.push(YOUR_PLUGIN)

  return config
}
