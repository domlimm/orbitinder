import React from 'react';
import { act } from '@testing-library/react-native';
import { create } from 'react-test-renderer';

import App from '../App';

describe('<App />', () => {
  test('Renders correctly', () => {
    let appComponent;

    act(() => {
      appComponent = create(<App />);
    });
  });
});
