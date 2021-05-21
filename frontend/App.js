import React from 'react';
import { StatusBar, Image } from 'react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import { ApolloProvider } from '@apollo/client';

import { default as customTheme } from './src/constants/custom-theme.json';
import AppNavigator from './src/navigation/AppNavigator';
import { localImages } from './src/constants/imagePaths';
import { ErrorScreen } from './src/screens/index';
import { client } from './src/graphql/Apollo';

const fetchImages = images => {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

const App = () => {
  const [isAssetsLoading, setIsAssetsLoading] = React.useState(false);

  const loadAssetsAsync = async () => {
    await fetchImages([...localImages]);
  };

  if (!isAssetsLoading) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={() => setIsAssetsLoading(true)}
        onError={() => <ErrorScreen />}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...customTheme }}>
        <StatusBar barStyle='default' style='auto' />
        <AppNavigator />
      </ApplicationProvider>
    </ApolloProvider>
  );
};

export default App;
