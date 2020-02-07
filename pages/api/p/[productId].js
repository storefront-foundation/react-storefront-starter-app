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

async function fetchProduct(req, res) {
  const {
    query: { productId, color },
  } = req

  // When a query parameter exists, we can fetch custom product data
  // pertaining to specific filters.
  if (color) {
    const data = await getPageData(productId)
    data.carousel = { index: 0 }
    return res.json(data)
  }

  res.json(
    await fulfillAPIRequest(req, {
      appData: createAppData,
      pageData: () => getPageData(productId),
    })
  )
}

export default withCaching(fetchProduct, {
  edge: {},
  browser: {
    maxAgeSeconds: 1000, // this should make the service worker cache requests to this route
  },
})
