import React from 'react';
import { render } from '@testing-library/react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import { MainAppScreen } from '../../src/screens';
import {
  authReducer,
  userReducer,
  usersReducer
} from '../../src/redux/reducers/';

describe('<MainAppScreen />', () => {
  test('Renders correctly', () => {});
});

// describe('<MainAppScreen />', () => {
//   const rootReducer = combineReducers({
//     auth: authReducer,
//     user: userReducer,
//     users: usersReducer
//   });

//   const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

//   test('Renders correctly', () => {
//     const component = (
//       <Provider store={store}>
//         <MainAppScreen />
//       </Provider>
//     );

//     render(component);
//   });
// });
