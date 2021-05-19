const { gql } = require('apollo-server');

const typeDefs = gql`
  ### Data Models
  # User data
  type User {
    id: ID!
    email: String!
    name: String!
  }

  # Queries
  type Query {
    info: String!
    getUser(id: ID!): User
  }

  # Mutation
  type Mutation {
    createUser(email: String!, name: String!): User!
  }
`;

module.exports = typeDefs;
