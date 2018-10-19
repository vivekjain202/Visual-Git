import {
  COMMIT_SELECTED,
  HISTORY_FILE_SELECTED,
  CHANGED_FILE_SELECTED,
} from '../constants/actions';

const initialState = {
  files: '',
  currentCommitHash: '',
  diffDetails: '',
  currentFile: ''
};
export default (state = initialState, action) => {
  switch (action.type) {
    case COMMIT_SELECTED:
      state = {
        ...state,
        files: action.payload.files,
        currentCommitHash: action.payload.commit.hash,
        currentCommitMsg: action.payload.commit.message,
        currentCommitAuthor: action.payload.commit.author_name,
      };
      break;
    case HISTORY_FILE_SELECTED:
      state = { ...state, diffDetails: action.payload };
      break;
    case CHANGED_FILE_SELECTED:
      state = { ...state, diffDetails: action.payload.diff, currentFile: action.payload.currentFile };
      break;
  }
  return state;
};
