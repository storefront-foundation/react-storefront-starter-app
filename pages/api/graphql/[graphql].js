import apolloMiddleware from '../../graphql/server'

export default function graphql(req, res) {
  apolloMiddleware(req, res, () => {
    console.log('next called')
  })
}
