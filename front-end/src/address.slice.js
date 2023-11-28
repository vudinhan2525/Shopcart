import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from './utils/http';
const initialState = { addressList: [], isLoading: false };
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
export const updateAddress = createAsyncThunk('address/updateAddress', async (data, thunkAPI) => {
  const response = await http.patch(`address/${data.addressId}`, data.newForm, {
    withCredentials: true,
    signal: thunkAPI.signal,
  });
  return response.data;
});
export const deleteAddress = createAsyncThunk('address/deleteAddress', async (addressId, thunkAPI) => {
  const response = await http.delete(`address/${addressId}`, {
    withCredentials: true,
    signal: thunkAPI.signal,
  });
  return response.data;
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
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        const idx = state.addressList.findIndex((el) => el._id === action.payload.data._id);
        if (idx !== -1) state.addressList[idx] = action.payload.data;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        const idx = state.addressList.findIndex((el) => el._id === action.payload.data._id);
        if (idx !== -1) state.addressList.splice(idx, 1);
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        console.log(action);
      })
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

export default addressSlice.reducer;
