import React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { LandingNavigator } from './src/navigation/LandingNavigator';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <LandingNavigator />
    </ApplicationProvider>
  );
};

export default App;
