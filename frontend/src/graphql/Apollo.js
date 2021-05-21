import { ApolloClient, InMemoryCache } from '@apollo/client';

const IP_ADDRESS = '192.168.1.163';
const PORT = '4000';

const URI = `http://${IP_ADDRESS}:${PORT}/`;

export const client = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache()
});
