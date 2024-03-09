import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching account details
export const fetchAccountData = createAsyncThunk('account/fetchAccountDetails', async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/account/${userId}/details`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk for adding funds
export const addFunds = createAsyncThunk(
  'account/addFunds',
  async ({ userId, amount }, { dispatch, rejectWithValue }) => {
    try {
      // Step 1: Create Payment Intent
      const paymentIntentResponse = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/payments/create-payment-intent`, {
        amount: amount * 100, // Convert to cents
      });
      const { clientSecret, paymentIntentId } = paymentIntentResponse.data;

      // In a real app, use Stripe's SDK to handle payment with clientSecret
      // For simulation, assume payment succeeds and we get a paymentIntentId
      
      // Step 2: Record transaction after successful payment
      // Update to use the new endpoint for recording payments
      await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/account/${userId}/record-payment`, {
        paymentIntentId,
        amount,
      });

      // Step 3: Refresh account data
      dispatch(fetchAccountData(userId));
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  balance: 0,
  transactions: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling fetchAccountData
      .addCase(fetchAccountData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAccountData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.balance = action.payload.balance;
        state.transactions = action.payload.transactions;
      })
      .addCase(fetchAccountData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handling addFunds
      .addCase(addFunds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addFunds.fulfilled, (state) => {
        state.status = 'succeeded';
        // Account data will be refreshed by fetchAccountData, so no need to update state here
      })
      .addCase(addFunds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default accountSlice.reducer;
