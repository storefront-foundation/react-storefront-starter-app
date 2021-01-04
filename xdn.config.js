require('dotenv').config()
const { join } = require('path')

module.exports = {
  connector: '@xdn/next',
  prerenderConcurrency: 200,
  includeFiles: {
    [join('.next', 'BUILD_ID')]: true,
  },
  backends: {
    legacy: {
      domainOrIp: process.env.LEGACY_BACKEND_DOMAIN || 'www.ebay.com',
      hostHeader: process.env.LEGACY_BACKEND_HOST_HEADER || 'www.ebay.com',
    },
  },
}
