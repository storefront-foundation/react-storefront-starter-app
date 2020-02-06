import createProduct from '../../components/mocks/createProduct'

const cart = (req, res) => {
  if (req.method === 'POST') {
    const { id, color, size, quantity } = req.body
    console.log('product id: ', id)
    console.log('color id: ', color || 'Not provided')
    console.log('size id: ', size || 'Not provided')
    console.log('quantity ', quantity)

    setTimeout(() => {
      res.end(JSON.stringify({ response: 'success', cartCount: 4 }))
    }, 1)
  } else {
    const products = [createProduct(1), createProduct(2), createProduct(3)]

    res.end(
      JSON.stringify({
        pageData: { items: products.map((item, i) => ({ ...item, quantity: i + 1 })) },
      })
    )
  }
}

export default cart
