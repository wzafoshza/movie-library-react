import * as TYPES from '../actions/types';

export default (state = { loading: true }, action) => {
  switch (action.type) {
    //case TYPES.FETCH_TVSERIES_GENRE:
    case TYPES.FETCH_TVSERIES:
    //case TYPES.FETCH_TVSERIES_SEARCH:
      return { ...state, ...action.payload };
    case TYPES.FETCH_TVSERIES_LOADING:
      return { ...state, loading: true };
    case TYPES.FETCH_TVSERIES_FINISHED:
      return { ...state, loading: false };
    default:
      return state;
  }
};
