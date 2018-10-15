import { FILES_LOADED } from '../constants/actions';

const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case FILES_LOADED:
      return { ...state, files: action.payload ? action.payload.files : [] };
    default:
      return state;
  }
};
