// reducer.js
import { SET_SEARCH_VISIBLE, SET_VIDEOS, SET_SKATERS, SET_SEARCH_QUERY } from './actions';
import skateVideos from '../api/mock/skate-videos.json'
import skaters from '../api/mock/skaters.json'

const initialState = {
  searchVisible: false,
  videos: [...skateVideos],
  skaters: [...skaters],
  searchQuery: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_VISIBLE:
      return { ...state, searchVisible: action.payload };
    case SET_VIDEOS:
      return { ...state, videos: action.payload };
    case SET_SKATERS:
      return { ...state, skaters: action.payload };
    case SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
