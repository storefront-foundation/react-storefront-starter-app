import { updateCart } from 'react-storefront-connector'
import withAmpFormParser from 'react-storefront/middlewares/withAmpFormParser'

async function handler(req, res) {
  const { item, quantity } = req.body
  res.json(await updateCart(item, quantity, req, res))
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default withAmpFormParser(handler)
