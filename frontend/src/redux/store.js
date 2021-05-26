import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/authSlice';

export default configureStore({
  reducer: {
    auth: authReducer
  }
});
