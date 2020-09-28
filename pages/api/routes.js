import listRoutes from 'react-storefront/server/listRoutes'

export default async function routes(req, res) {
  res.setHeader('cache-control', 'max-age=' + 60 * 60 * 24 * 365)
  res.json(listRoutes())
}
