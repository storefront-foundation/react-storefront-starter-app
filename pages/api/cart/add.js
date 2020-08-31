import { addToCart } from 'react-storefront-connector'
import withAmpFormParser from 'react-storefront/middlewares/withAmpFormParser'

async function handler(req, res) {
  const result = await addToCart(req.body, req, res)

  if (req.query['__amp_source_origin']) {
    res.setHeader('AMP-Redirect-To', `${req.query['__amp_source_origin']}/cart`)
  }

  res.json(result)
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default withAmpFormParser(handler)
