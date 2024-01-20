// Action Types
export const SET_SEARCH_VISIBLE = 'SET_SEARCH_VISIBLE';
export const SET_VIDEOS = 'SET_VIDEOS';

// Action Creators
export const setSearchVisible = (isVisible) => ({
  type: SET_SEARCH_VISIBLE,
  payload: isVisible,
});

export const setVideos = (videos) => ({
  type: SET_VIDEOS,
  payload: videos,
});
