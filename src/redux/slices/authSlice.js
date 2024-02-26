// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async thunk to handle user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, { email, password });
      await AsyncStorage.setItem('accessToken', response.data.access_token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to handle user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({email, password}, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/register`, {email, password});
      // dispatch(loginUser({ email, password }));
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk to check authentication status based on the presence of an accessToken in AsyncStorage
export const checkAuthenticationStatus = createAsyncThunk(
  'auth/checkAuthenticationStatus',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      return !!accessToken;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        // Handle registration success if needed
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(checkAuthenticationStatus.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

// Separate thunk for performing logout to handle async operations
export const performLogout = () => async (dispatch) => {
  await AsyncStorage.removeItem('accessToken'); // Async operation to remove token
  dispatch(logout()); // Then dispatch the synchronous logout action
};

export default authSlice.reducer;
