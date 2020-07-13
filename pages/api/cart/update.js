import { updateCart } from 'react-storefront-connector'
import withAmpFormParser from 'react-storefront/middlewares/withAmpFormParser'

async function handler(req, res) {
  const { cart } = req.body
  res.json(await updateCart(cart, req, res))
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default withAmpFormParser(handler)
