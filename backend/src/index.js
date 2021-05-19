const { ApolloServer } = require('apollo-server');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const typeDefs = require('./graphql/schema');
const { resolvers, getUserUsingToken } = require('./graphql/resolvers');

const { DB_URI, DB_NAME } = process.env;

const start = async () => {
  const client = new MongoClient(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await client.connect();

  const db = client.db(DB_NAME);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const user = await getUserUsingToken(req.headers.authorization, db);
      return { db, user };
    }
  });

  server.listen(process.env.PORT || 4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

start();
