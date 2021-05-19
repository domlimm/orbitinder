const { ApolloServer } = require('apollo-server');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const { DB_URI, DB_NAME } = process.env;

const start = async () => {
  const client = new MongoClient(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await client.connect();

  const db = client.db(DB_NAME);

  const context = { db };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return context;
    }
  });

  server.listen(process.env.PORT || 4000).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

start();
