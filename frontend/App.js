import React, { Fragment } from 'react';
import { StatusBar, Image } from 'react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';

import { default as customTheme } from './src/constants/custom-theme.json';
import LandingNavigator from './src/navigation/LandingNavigator';
import { localImages } from './src/constants/imagePaths';
import { ErrorScreen } from './src/screens/index';

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
    <Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...customTheme }}>
        <StatusBar barStyle='default' style='auto' />
        <LandingNavigator />
      </ApplicationProvider>
    </Fragment>
  );
};

export default App;
