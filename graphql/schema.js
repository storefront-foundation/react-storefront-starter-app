import { gql } from 'apollo-server'

const schema = gql`
  type Query {
    product(id: Int!): Product!
  }

  type Color {
    id: String!
    text: String!
    media: Media
  }

  type Size {
    id: String!
    text: String!
    media: Media
  }

  type Media {
    full: [MediaLink]
    thumbnails: [MediaLink]
  }

  type MediaLink {
    src: String!
    alt: String!
    magnify: Magnify
  }

  type Magnify {
    height: Int!
    width: Int!
    src: String!
  }

  type Product {
    id: Int!
    url: String!
    color: String!
    type: String!
    name: String!
    price: String!
    priceText: String!
    description: String!
    specs: String!
    rating: Float!
    reviews: Int!
    colors: [Color!]!
    sizes: [Size!]!
    media: Media!
  }

  schema {
    query: Query
  }
`

export default schema
