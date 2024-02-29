// src/features/account/accountSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  balance: 0,
  transactions: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Adjust this to your new endpoint that returns both balance and transactions
export const fetchAccountData = createAsyncThunk('account/fetchAccountDetails', async (userId) => {
  const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/account/${userId}/details`);
  return response.data;
});

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAccountData.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAccountData.fulfilled, (state, action) => {
        console.log('Action payload:', action.payload);
        state.status = 'succeeded';
        state.balance = action.payload.balance;
        state.transactions = action.payload.transactions;
      })      
      .addCase(fetchAccountData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default accountSlice.reducer;
