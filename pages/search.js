import Subcategory from './s/[...categorySlug]'
import fetchServerSideProps from 'react-storefront/props/fetchServerSideProps'

export const getServerSideProps = opts => {
  opts.resolvedUrl = `/search?${opts.resolvedUrl.split('?')[1]}`
  return fetchServerSideProps(opts)
}

export default Subcategory
