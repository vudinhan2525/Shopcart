import { configureStore } from '@reduxjs/toolkit';
import addressReducer from './slice/address.slice.js';
export const store = configureStore({
  reducer: {
    address: addressReducer,
  },
});
