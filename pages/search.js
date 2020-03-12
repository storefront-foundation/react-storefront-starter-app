import Subcategory from './s/[subcategoryId]'
import fetchFromAPI from 'react-storefront/props/fetchFromAPI'
import createLazyProps from 'react-storefront/props/createLazyProps'

Subcategory.getInitialProps = createLazyProps(opts => {
  opts.asPath = `/s/1?${opts.asPath.split('?')[1]}`
  return fetchFromAPI(opts)
})

export default Subcategory
