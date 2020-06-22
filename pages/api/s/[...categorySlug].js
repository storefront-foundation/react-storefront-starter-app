import { subcategory } from 'react-storefront-connector'

export default async function plp(req, res) {
  const { q, categorySlug: slug, page, filters, sort } = req.query
  res.json(await subcategory({ q, slug, page, filters, sort }, req, res))
}
