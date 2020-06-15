import { home } from 'react-storefront-connector'

export default async function(req, res) {
  res.json(await home(req, res))
}
