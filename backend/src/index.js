const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
