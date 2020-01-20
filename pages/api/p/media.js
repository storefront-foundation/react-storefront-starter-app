import createMedia from '../../../components/mocks/createMedia'

export default function media(req, res) {
  const {
    query: { productId, color },
  } = req

  setTimeout(() => {
    res.setHeader('cache-control', 'no-cache, no-store')

    const media = createMedia(productId, color)

    res.end(
      JSON.stringify({
        media,
      })
    )
  }, 1000)
}
