import { CHANGE_BRANCH, CHANGE_BRANCH_COMMITS } from '../constants/actions'

export default (state, action) => {
    switch (action.type) {
        case CHANGE_BRANCH:
            state = { ...state, currentBranch: action.payload }
            break;
        case CHANGE_BRANCH_COMMITS:
            state = { ...state, currentBranchCommits: getCurrentBranchCommits(state.branches, action.payload)}
            break;
    }
    return state;
};
const getCurrentBranchCommits = (branches, branchName) => {
    const commits = branches.map(branch => {
        if (branch.name === branchName) return branch.commits
    })
    return commits
}