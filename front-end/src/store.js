import { configureStore } from '@reduxjs/toolkit';
import addressReducer from './address.slice.js';
export const store = configureStore({
  reducer: {
    address: addressReducer,
  },
});
