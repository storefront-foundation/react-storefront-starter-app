require('dotenv').config()

module.exports = {
  backends: {
    legacy: {
      domainOrIp: process.env.LEGACY_BACKEND_DOMAIN || 'www.ebay.com',
      hostHeader: process.env.LEGACY_BACKEND_HOST_HEADER || 'www.ebay.com',
    },
  },
}
