import { removeCartItem } from 'react-storefront-connector'

export default async function handler(req, res) {
  const { item } = req.body || {}
  res.json(await removeCartItem(item, req, res))
}

export const config = {
  api: {
    bodyParser: true,
  },
}
