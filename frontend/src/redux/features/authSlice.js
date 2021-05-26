import { createSlice } from '@reduxjs/toolkit';

import * as authFirebase from '../../firebase/functions/auth';

export const authSlice = createSlice({
  name: 'user',
  initialState: {
    name: ''
  },
  reducers: {
    signUp: (state, action) => {
      const { email, password, name } = action.payload;

      state.name = authFirebase.signUp(email, password, name);
    },
    logIn: (state, action) => {
      const { email, password } = action.payload;

      state.name = authFirebase.logIn(email, password);
    }
  }
});

export const { signUp, logIn } = authSlice.actions;

export default authSlice.reducer;
