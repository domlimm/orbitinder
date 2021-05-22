import { ApolloClient, InMemoryCache } from '@apollo/client';
import * as Network from 'expo-network';

const IP_ADDRESS = '192.168.1.163';
const PORT = '4000';

// const URI = `http://${IP_ADDRESS}:${PORT}/`;

const URI = async () => {
  Network.getIpAddressAsync()
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const client = new ApolloClient({
  uri: `http://${IP_ADDRESS}:${PORT}/`,
  cache: new InMemoryCache()
});
