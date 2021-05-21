import { ApolloClient, InMemoryCache } from '@apollo/client';

const dotenv = require('dotenv');
dotenv.config();
const { IP_ADDRESS, PORT } = process.env;

const URI = `http://${IP_ADDRESS}:${PORT}/`;

export const client = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache()
});
