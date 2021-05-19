import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import LandingNavigator from './src/navigation/LandingNavigator';

import { default as customTheme } from './src/constants/custom-theme.json';

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
