import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EditPrefScreen, UserPreferencesScreen } from '../screens';
const { Navigator, Screen } = createStackNavigator();

const PrefStackNavigator = () => (
  <Navigator headerMode='none'>
    <Screen name='UserPreferences' component={UserPreferencesScreen} />
    <Screen name='EditPref' component={EditPrefScreen} />
  </Navigator>
);

export default PrefStackNavigator;
