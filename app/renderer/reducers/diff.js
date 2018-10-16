import { COMMIT_SELECTED, HISTORY_FILE_SELECTED, CHANGED_FILE_SELECTED } from '../constants/actions'

const initialState = {
    
};
export default (state = initialState, action) => {
    switch (action.type) {
        case COMMIT_SELECTED:
            state = { ...state, files: action.payload }
            break;
        case HISTORY_FILE_SELECTED:
            state = { ...state, diff: action.payload }
            break;
        case CHANGED_FILE_SELECTED:
            state = { ...state, diff: action.payload }
            break;
    }
    return state;
};