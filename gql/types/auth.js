const { gql } = require('apollo-server-express');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Token {
    jwt: String
  }

  type Mutation {
	login(username: String!, password: String!): Token
	register(username: String!, password: String!, email: String!): Token
  }
`;

module.exports = typeDefs;