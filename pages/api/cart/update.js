import { updateCartItem } from 'react-storefront-connector'
import withAmpFormParser from 'react-storefront/middlewares/withAmpFormParser'

async function handler(req, res) {
  const { item, quantity } = req.body
  res.json(await updateCartItem(item, quantity, req, res))
}

export const config = {
  api: {
    bodyParser: true,
  },
}

export default withAmpFormParser(handler)
