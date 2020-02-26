import createProduct from '../../../components/mocks/createProduct'
import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import createAppData from '../../../components/mocks/createAppData'
import withCaching from 'react-storefront/utils/withCaching'

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

function asciiSum(string = '') {
  return string.split('').reduce((s, e) => s + e.charCodeAt(), 0)
}

async function fetchProduct(req, res) {
  const {
    query: { productId, color, size },
  } = req

  const result = await fulfillAPIRequest(req, {
    appData: createAppData,
    pageData: () => getPageData(productId),
  })

  // When a query parameter exists, we can fetch custom product data
  // pertaining to specific filters.
  if (color || size) {
    result.pageData.carousel = { index: 0 }
    // A price for the fetched product variant would be included in
    // the response, but for demo purposes only, we are setting the
    // price based on the color and size.
    const mockPrice = (asciiSum(color) + asciiSum(size)) / 100
    result.pageData.product.price = mockPrice
    result.pageData.product.priceText = `$${mockPrice.toFixed(2)}`
  }

  res.json(result)
}

export default withCaching(fetchProduct, 60 * 60 * 24) // cache with the service worker for 24 hours
