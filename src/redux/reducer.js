import { SET_SEARCH_VISIBLE, SET_VIDEOS } from './actions';
import skateVideos from '../api/mock/skate-videos.json'

const initialState = {
  searchVisible: false,
  videos: [...skateVideos],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_VISIBLE:
      return { ...state, searchVisible: action.payload };
    case SET_VIDEOS:
      return { ...state, videos: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
