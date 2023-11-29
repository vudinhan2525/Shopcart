import { configureStore } from '@reduxjs/toolkit';
import addressReducer from './slice/address.slice.js';
import productReducer from './slice/product.slice.js';
export const store = configureStore({
  reducer: {
    address: addressReducer,
    product: productReducer,
  },
});
