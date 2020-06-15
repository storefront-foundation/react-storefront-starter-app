import { subcategory } from 'react-storefront-connector'

export default async function plp(req, res) {
  const { q, subcategoryId, page, filters, sort } = req.query
  res.json(await subcategory({ q, id: subcategoryId, page, filters, sort }, req, res))
}
