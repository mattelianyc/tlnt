import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import videosReducer from './slices/videosSlice';
import skatersReducer from './slices/skatersSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    videos: videosReducer,
    skaters: skatersReducer,
    auth: authReducer,
  },
});

export default store;
