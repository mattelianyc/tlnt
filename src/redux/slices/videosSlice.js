import { createSlice } from '@reduxjs/toolkit';
import skateVideos from '../../api/mock/skate-videos.json';

const initialState = {
  videos: skateVideos,
};

export const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
  },
});

// Export actions
export const { setVideos } = videosSlice.actions;

// Export reducer
export default videosSlice.reducer;
