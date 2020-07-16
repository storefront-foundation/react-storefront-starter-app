import { updateCart } from 'react-storefront-connector'

export async function handler(req, res) {
  const { item, quantity } = req.body
  res.json(await updateCartItem(item, quantity, req, res))
}

export const config = {
  api: {
    bodyParser: false,
  },
}
