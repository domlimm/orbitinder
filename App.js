import React from 'react';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { LandingNavigator } from './src/navigation/LandingNavigator';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <LandingNavigator />
    </ApplicationProvider>
  );
}
