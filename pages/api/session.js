import { session } from 'react-storefront-connector'

export default async function(req, res) {
  res.json(await session(req, res))
}
