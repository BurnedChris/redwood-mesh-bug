export const schema = gql`
  type User {
    email: String
    issuer: String!
    publicAddress: String!
  }

  type Query {
    profile: User
  }
`
