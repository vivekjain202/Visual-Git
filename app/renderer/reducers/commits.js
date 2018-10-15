import { COMMITS_LOADED } from '../constants/actions';

const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case COMMITS_LOADED:
      return { ...state, commits: action.payload ? action.payload.commits : [] };
    default:
      return state;
  }
};
