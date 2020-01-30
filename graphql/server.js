import { ApolloServer } from 'apollo-server'
import typeDefs from './schema'
import resolvers from './resolvers'

const server = new ApolloServer({ typeDefs, resolvers })
export default server.getMiddleware({ path: '/api/graphql' })
