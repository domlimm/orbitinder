import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import LandingNavigator from './src/navigation/LandingNavigator';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

const App = () => {
  return (
    <Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <StatusBar barStyle='default' style='auto' />
        <LandingNavigator />
      </ApplicationProvider>
    </Fragment>
  );
};

export default App;
