
const { ApolloServer, gql } = require('apollo-server');
const resolvers = require('./resolvers');
const typeDefs = require('./types');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    authScope: req.headers.authorization
  })
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});