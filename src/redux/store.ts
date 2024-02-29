import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import videosReducer from './slices/videosSlice';
import skatersReducer from './slices/skatersSlice';
import authReducer from './slices/authSlice';
import paymentReducer from './slices/paymentSlice';
import accountReducer from './slices/accountSlice';

// Configure the store and automatically get the ReturnType of its getState method to infer the RootState type
export const store = configureStore({
  reducer: {
    search: searchReducer,
    videos: videosReducer,
    skaters: skatersReducer,
    auth: authReducer,
    payment: paymentReducer,
    account: accountReducer
  },
});

// RootState is inferred from the store's state
export type RootState = ReturnType<typeof store.getState>;

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;

export default store;
