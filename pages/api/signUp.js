import { signUp } from 'react-storefront-connector'

export default function(req, res) {
  const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  return signUp(data, req, res)
}

export const config = {
  api: {
    bodyParser: true,
  },
}
