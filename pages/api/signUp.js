import { signUp } from 'react-storefront-connector'

export default function(req, res) {
  return signUp(req.body, req, res)
}

export const config = {
  api: {
    bodyParser: false,
  },
}
