import createProduct from '../components/mocks/createProduct'

export default {
  Query: {
    product: (root, args) => createProduct(args.id),
  },
}
