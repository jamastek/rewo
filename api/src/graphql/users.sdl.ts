export const schema = gql`
  type User {
    id: Int!
    firstName: String
    lastName: String
    username: String
    email: String!
    password: String!
    refreshToken: String
    createAt: DateTime!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    firstName: String
    lastName: String
    username: String
    email: String!
    password: String!
    refreshToken: String
    createAt: DateTime!
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
    refreshToken: String
    createAt: DateTime
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
