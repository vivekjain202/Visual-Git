import { CHANGE_REPOSITORY} from '../constants/actions'

export default (state, action) => {
    switch (action.type) {
        case CHANGE_REPOSITORY:
            state = { ...state, currentRepo: action.payload }
            break;
        // case CHANGE_REPOSITORY_BRANCHES:
        //     state = {...state, branches: getRepositoryBranches(action.payload, state)}
    }
    return null;
};
// const getRepositoryBranches = (repoName) => {

// }