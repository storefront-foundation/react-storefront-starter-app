import { cart } from 'react-storefront-connector'

export default function(req, res) {
  // using connector's `cart` POST as Add To Cart
  return cart(req, res)
}
