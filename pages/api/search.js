import { search } from 'react-storefront-connector'

export default async function sp(req, res) {
  return res.json(await search(req.query, req, res))
}
