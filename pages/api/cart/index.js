import { cart } from 'react-storefront-connector'

export default async function(req, res) {
  res.json(await cart(req, res))
}
