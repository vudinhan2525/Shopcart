import http from '../utils/http';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = { productList: [], isLoading: false, isAlreadyAdding: false };
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
export const deleteProd = createAsyncThunk('prod/deleteProd', async (data, thunkAPI) => {
  const response = await http.post(
    `prods/deleteProdFromUserList/${data.userId}`,
    { data: data.productId },
    { withCredentials: true, signal: thunkAPI.signal },
  );
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
        state.isAlreadyAdding = true;
      })
      .addCase(addProdList.rejected, (state, action) => {})
      .addCase(deleteProd.fulfilled, (state, action) => {
        const idx = state.productList.findIndex((el) => el._id === action.payload.data);
        if (idx !== -1) state.productList.splice(idx, 1);
      })
      .addCase(deleteProd.rejected, (state, action) => {})
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.isLoading = true;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.isLoading = false;
        },
      );
  },
});
export default productSlice.reducer;
