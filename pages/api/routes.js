import listRoutes from 'react-storefront/server/listRoutes'

export default async function routes(req, res) {
  res.json(listRoutes())
}
