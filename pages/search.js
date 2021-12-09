import Subcategory from './s/[...categorySlug]'
import fetchFromAPI from 'react-storefront/props/fetchFromAPI'

export const getServerSideProps = opts => {
  opts.asPath = `/search?${opts.asPath.split('?')[1]}`
  return fetchFromAPI(opts)
}

export default Subcategory
