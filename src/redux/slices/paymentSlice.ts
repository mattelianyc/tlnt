import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store'; // Adjust the import path as necessary

// Define a type for the slice state
interface PaymentState {
  loading: boolean;
  error: string | null;
  paymentSheetInitialized: boolean;
}

// Define a type for the initializePaymentSheet thunk's arguments
interface PaymentIntentArgs {
  amount: number;
}

// Define a type for the initializePaymentSheet thunk's return value
interface PaymentIntentResult {
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
}

// Initial state
const initialState: PaymentState = {
  loading: false,
  error: null,
  paymentSheetInitialized: false,
};

// Async thunk to initialize the payment sheet
export const initializePaymentSheet = createAsyncThunk<PaymentIntentResult, PaymentIntentArgs, { state: RootState, rejectValue: string }>(
  'payment/initializePaymentSheet',
  async ({ amount }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/payments/create-payment-intent`, { amount });
      const { paymentIntent, ephemeralKey, customer } = response.data;
      console.log(paymentIntent)
      console.log(ephemeralKey)
      console.log(customer)
      return { paymentIntent, ephemeralKey, customer };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice for payment operations
const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPaymentState(state) {
      state.loading = false;
      state.error = null;
      state.paymentSheetInitialized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializePaymentSheet.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializePaymentSheet.fulfilled, (state, action: PayloadAction<PaymentIntentResult>) => {
        state.loading = false;
        state.paymentSheetInitialized = true;
      })
      .addCase(initializePaymentSheet.rejected, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
