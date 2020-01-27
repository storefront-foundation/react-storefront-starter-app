import createProduct from '../../../components/mocks/createProduct'
import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import createAppData from '../../../components/mocks/createAppData'

async function getPageData(productId) {
  return Promise.resolve({
    title: `Product ${productId}`,
    product: createProduct(productId),
    breadcrumbs: [
      {
        text: `Home`,
        href: '/',
      },
      {
        text: `Subcategory ${productId}`,
        as: `/s/${productId}`,
        href: '/s/[subcategoryId]',
      },
    ],
  })
}

export default async function fetchProduct(req, res) {
  const {
    query: { productId, color },
  } = req

  // When a query parameter exists, we can fetch custom product data
  // pertaining to specific filters.
  if (color) {
    const data = await getPageData(productId)
    data.carousel = { index: 0 }
    // A price for the fetched product variant would be included in
    // the response, but for demo purposes only, we are setting the
    // price based on the color name.
    const mockPrice = color.split``.reduce((s, e) => s + e.charCodeAt(), 0) / 100
    data.product.price = mockPrice
    data.product.priceText = `$${mockPrice.toFixed(2)}`
    return res.json(data)
  }

  res.json(
    await fulfillAPIRequest(req, {
      appData: createAppData,
      pageData: () => getPageData(productId),
    })
  )
}
