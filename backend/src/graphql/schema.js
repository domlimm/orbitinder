const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    info: String!
    getUser(id: ID!): User
  }

  type Mutation {
    signUp(input: SignUpInput): AuthenticatedUser!
    logIn(input: LogInInput): AuthenticatedUser!
  }

  input SignUpInput {
    email: String!
    password: String!
    name: String!
  }

  input LogInInput {
    email: String!
    password: String!
  }

  type AuthenticatedUser {
    user: User!
    token: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`;

module.exports = typeDefs;
