import React from 'react';
import { StatusBar, Image, LogBox } from 'react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import * as Notifications from 'expo-notifications';

import { default as customTheme } from './src/constants/custom-theme.json';
import AppNavigator from './src/navigation/AppNavigator';
import { localImages } from './src/constants/imagePaths';
import { authReducer, userReducer, usersReducer } from './src/redux/reducers/';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true };
  }
});

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  users: usersReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchImages = images => {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

LogBox.ignoreLogs([
  'Setting a timer',
  "Warning: Can't perform a React",
  'Warning: Cannot update during an existing state transition'
]);

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
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...customTheme }}>
        <StatusBar barStyle='default' style='auto' />
        <AppNavigator />
      </ApplicationProvider>
    </Provider>
  );
};

export default App;
