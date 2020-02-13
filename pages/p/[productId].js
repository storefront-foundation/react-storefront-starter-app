import fetchFromAPI from 'react-storefront/props/fetchFromAPI'
import createLazyProps from 'react-storefront/props/createLazyProps'

const Product = React.memo(lazyProps => {
  return <div>with suspense header</div>
})

Product.getInitialProps = createLazyProps(fetchFromAPI)

export default Product
export const config = { amp: 'hybrid' }
