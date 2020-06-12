import { subcategory } from 'react-storefront-connector'

export default async function plp(req, res) {
  const { q, subcategoryId: slug, page, filters, sort } = req.query
  console.log('subcategory', subcategory)
  res.json(await subcategory({ q, slug, page, filters, sort }, req, res))
}
