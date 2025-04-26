export const typeDefs = `
  type User {
    id: Int!
    name: String!
    email: String!
    createdAt: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
  }
  input UpdateUserInput {
    name: String
    email: String
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
  }

  type Mutation {
    createUser(data: CreateUserInput!): User!
    updateUser(id: Int!, data: UpdateUserInput!): User
    deleteUser(id: Int!): Boolean!
  }
`;
