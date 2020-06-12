import createProduct from '../../../components/mocks/createProduct'
import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import createAppData from '../../../components/mocks/createAppData'
import getBase64ForImage from 'react-storefront/utils/getBase64ForImage'

function asciiSum(string = '') {
  return string.split('').reduce((s, e) => s + e.charCodeAt(), 0)
}

export default async function getProduct(req, res) {
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
    const data = await getPageData(productId)
    data.carousel = { index: 0 }
    // A price for the fetched product variant would be included in
    // the response, but for demo purposes only, we are setting the
    // price based on the color name.
    const mockPrice = (asciiSum(color) + asciiSum(size)) / 100
    data.product.price = mockPrice
    data.product.priceText = `$${mockPrice.toFixed(2)}`
    return res.json(data)
  }

  res.json(result)
}

async function getPageData(id) {
  const result = {
    title: `Product ${id}`,
    product: createProduct(id),
    breadcrumbs: [
      {
        text: `Home`,
        href: '/',
      },
      {
        text: `Subcategory ${id}`,
        as: `/s/${id}`,
        href: '/s/[subcategoryId]',
      },
    ],
  }

  const mainProductImage = result.product.media.full[0]
  mainProductImage.src = await getBase64ForImage(mainProductImage.src)

  return result
}
