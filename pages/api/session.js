import { session } from 'react-storefront-connector'

export default function(req, res) {
  return session(req, res)
}
