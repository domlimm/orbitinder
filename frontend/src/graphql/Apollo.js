import { ApolloClient, InMemoryCache } from '@apollo/client';

const URI = 'http://localhost:4000/';

export const client = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache()
});
