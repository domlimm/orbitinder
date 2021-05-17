import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { LandingNavigator } from './src/navigation/LandingNavigator';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

const App = () => {
  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <LandingNavigator />
      </ApplicationProvider>
    </React.Fragment>
  );
};

export default App;
