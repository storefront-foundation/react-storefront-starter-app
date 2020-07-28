import { signIn } from 'react-storefront-connector'

export default function(req, res) {
  const { email, password } = JSON.parse(req.body)
  return signIn(email, password, req, res)
}

export const config = {
  api: {
    bodyParser: true,
  },
}
