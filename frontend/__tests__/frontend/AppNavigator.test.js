import React from 'react';
import { render } from '@testing-library/react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import AppNavigator from '../../src/navigation/AppNavigator';
import {
  authReducer,
  userReducer,
  usersReducer
} from '../../src/redux/reducers/';
import { default as customTheme } from '../../src/constants/custom-theme.json';

describe('<AppNavigator />', () => {
  test('Renders correctly', () => {});
});

// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

// describe('<AppNavigator />', () => {
//   const rootReducer = combineReducers({
//     auth: authReducer,
//     user: userReducer,
//     users: usersReducer
//   });

//   const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

//   test('Application navigation system works correctly', async () => {
//     const component = (
//       <Provider store={store}>
//         <IconRegistry icons={EvaIconsPack} />
//         <ApplicationProvider {...eva} theme={{ ...eva.light, ...customTheme }}>
//           <AppNavigator />
//         </ApplicationProvider>
//       </Provider>
//     );

//     render(component);
//   });
// });
