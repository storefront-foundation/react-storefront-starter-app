import { removeCartItem } from 'react-storefront-connector'

export async function handler(req, res) {
  const { item } = req.body
  res.json(await removeCartItem(item, req, res))
}

export const config = {
  api: {
    bodyParser: false,
  },
}
