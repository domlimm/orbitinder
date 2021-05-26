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

      const returnedName = authFirebase.signUp(email, password, name);

      state.name = returnedName;
    },
    logIn: (state, action) => {
      const { email, password } = action.payload;

      const name = authFirebase.logIn(email, password);

      state.name = name;
    }
  }
});

export const { signUp, logIn } = authSlice.actions;

export default authSlice.reducer;
