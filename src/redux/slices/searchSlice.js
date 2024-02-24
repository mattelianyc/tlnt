import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchVisible: false,
  searchQuery: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchVisible: (state, action) => {
      state.searchVisible = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

// Export actions
export const { setSearchVisible, setSearchQuery } = searchSlice.actions;

// Export reducer
export default searchSlice.reducer;
