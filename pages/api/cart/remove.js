import { removeCartItem } from 'react-storefront-connector'
import withAmpFormParser from 'react-storefront/middlewares/withAmpFormParser'

async function handler(req, res) {
  const { item } = req.body
  res.json(await removeCartItem(item, req, res))
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default withAmpFormParser(handler)
