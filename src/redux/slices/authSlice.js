import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Assuming axios for API calls

// Define async thunks for login and registration
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log('email ', email)
      console.log('pass ', password)
      const response = await axios.post('http://127.0.0.1:3000/auth/login', { email, password });
      console.log('res ', response)
      // Save token to AsyncStorage or secure storage here if needed
      return response.data; // Assuming this includes the user token or user data
    } catch (error) {
      console.log('req err ', error)
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('YOUR_API_ENDPOINT/register', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      // Clear token from AsyncStorage or secure storage here
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
        state.user = action.payload; // Set user data
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // You can add more cases for other async thunks here, like registerUser
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // Handle registration success if needed
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
