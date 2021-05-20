import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { default as customTheme } from './src/constants/custom-theme.json';
import LandingNavigator from './src/navigation/LandingNavigator';
import { Loading } from './src/components/Navigation';

const App = () => {
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
