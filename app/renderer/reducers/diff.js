import {
  COMMIT_SELECTED,
  HISTORY_FILE_SELECTED,
  CHANGED_FILE_SELECTED,
} from '../constants/actions';

const initialState = {
  files: '',
  currentCommitHash: '',
  diffDetails: '',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case COMMIT_SELECTED:
      state = { ...state, files: action.payload[0], currentCommitHash: action.payload[1] };
      break;
    case HISTORY_FILE_SELECTED:
      state = { ...state, diffDetails: action.payload };
      break;
    case CHANGED_FILE_SELECTED:
      state = { ...state, diffDetails: action.payload };
      break;
  }
  return state;
};
