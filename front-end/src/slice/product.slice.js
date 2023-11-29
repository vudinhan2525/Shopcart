import http from '../utils/http';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = { productList: [], isLoading: false };
export const getProdList = createAsyncThunk('prod/getProdList', async (data, thunkAPI) => {
  const response = await http.post(
    `prods/getRelatedProd`,
    { data: data },
    { withCredentials: true, signal: thunkAPI.signal },
  );
  return response.data;
});
export const addProdList = createAsyncThunk('prod/addProdList', async (data, thunkAPI) => {
  try {
    await http.patch(
      `users/${data.userId}`,
      { products: data.newData },
      { withCredentials: true, signal: thunkAPI.signal },
    );
  } catch (error) {
    console.log(error);
  }
  const response = await http.get(`prods/${data.newData[data.newData.length - 1]}`);
  return response.data;
});
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProdList.fulfilled, (state, action) => {
        state.productList = action.payload.data;
      })
      .addCase(getProdList.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(addProdList.fulfilled, (state, action) => {
        state.productList.push(action.payload.data);
      });
  },
});
export default productSlice.reducer;
