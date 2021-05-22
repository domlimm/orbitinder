import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network';

const IP_ADDRESS = '192.168.1.163';
const PORT = '4000';

const URI = `http://${IP_ADDRESS}:${PORT}/`;

// const URI = async () => {
//   Network.getIpAddressAsync()
//     .then(data => {
//       console.log(data);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

const httpLink = createHttpLink({
  uri: URI
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token || ''
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
