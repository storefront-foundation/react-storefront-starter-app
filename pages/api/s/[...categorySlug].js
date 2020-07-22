import { subcategory } from 'react-storefront-connector'

export default async function plp(req, res) {
  const { q, categorySlug: slug, page, filters, sort } = req.query
  try {
    const data = await subcategory({ q, slug, page, filters, sort }, req, res)
    return res.json(data)
  } catch (error) {
    console.error(error)
    return res.json({
      pageData: {
        id: 'error',
        name: 'Unexpected error',
        title: 'Unexpected error',
        products: [],
        total: 0,
        page: 1,
      },
    })
  }
}
