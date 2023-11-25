import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from './utils/http';
const initialState = { addressList: [] };
export const getAddressList = createAsyncThunk('address/getAddressList', async (data, thunkAPI) => {
  const response = await http.post(
    `address/getUserAddress`,
    { data: data },
    {
      withCredentials: true,
      signal: thunkAPI.signal,
    },
  );
  return response.data;
});
export const addAddress = createAsyncThunk('address/addAddress', async (data, thunkAPI) => {
  const response1 = await http.post(`address`, data.newForm, {
    withCredentials: true,
    signal: thunkAPI.signal,
  });
  try {
    await http.patch(
      `users/${data.userId}`,
      { address: [...data.userAddress, response1.data.data._id] },
      {
        withCredentials: true,
        signal: thunkAPI.signal,
      },
    );
  } catch (error) {
    console.log(error);
    return;
  }
  return response1.data;
});
const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAddressList.fulfilled, (state, action) => {
        state.addressList = action.payload.data;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addressList.push(action.payload.data);
      })
      .addCase(addAddress.rejected, (state, action) => {
        console.log(action);
      });
  },
});

export default addressSlice.reducer;
