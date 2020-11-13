import { updateCartItem } from 'react-storefront-connector'

export default async function handler(req, res) {
  const { item, quantity } = req.body
  res.json(await updateCartItem(item, quantity, req, res))
}

export const config = {
  api: {
    bodyParser: true,
  },
}
