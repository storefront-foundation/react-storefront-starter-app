import apolloMiddleware from '../../graphql/server'

export default function graphql(req, res) {
  // req.url += '?'
  console.log(req.url)
  console.log(req.path)

  apolloMiddleware(req, res, () => {
    console.log('next called')
  })
}
