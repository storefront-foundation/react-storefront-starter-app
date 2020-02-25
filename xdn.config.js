const { LEGACY_BACKEND_DOMAIN, LEGACY_BACKEND_HOST_HEADER } = process.env

if (!LEGACY_BACKEND_DOMAIN) {
  console.error('Please add a LEGACY_BACKEND_DOMAIN to the .env file')
  process.exit(1)
}

if (!LEGACY_BACKEND_HOST_HEADER) {
  console.error('Please add a LEGACY_BACKEND_HOST_HEADER to the .env file')
  process.exit(1)
}

module.exports = {
  backends: {
    legacy: {
      domainOrIp: LEGACY_BACKEND_DOMAIN,
      hostHeader: LEGACY_BACKEND_HOST_HEADER,
    },
  },
}
