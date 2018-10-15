import { CHANGE_BRANCH, CHANGE_BRANCH_COMMITS, CHANGE_REPOSITORY_BRANCHES } from '../constants/actions'
const initialState = {
    currentRepo: 'VisualGit',
    currentBranch: 'Master',
    branches: [{ name: 'Master', selected: false }, { name: 'experiment', selected: false }],
    currentBranchCommits: [],
    otherBranches: []
};
export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_BRANCH:
            state = { ...state, currentBranch: action.payload, branches: updateBranches(state.branches, action.payload) }
            break;
        case CHANGE_BRANCH_COMMITS:
            state = { ...state, currentBranchCommits: getCurrentBranchCommits(state.branches, action.payload) }
            break;
        case CHANGE_REPOSITORY_BRANCHES:
            state = { ...state, branches: getRepositoryBranches(action.payload, state) }
    }

    return state;
};
const updateBranches = (branches, branchName) => {
    const newBranches = branches.map(branch => {
        if (branch.name !== branchName) return { ...branch, selected: false }
        else return { ...branch, selected: true }
    })
    return newBranches
}

const getCurrentBranchCommits = (branches, branchName) => {
    const commits = branches.map(branch => {
        if (branch.name === branchName) return branch.commits
    })
    return commits
}

const getRepositoryBranches =() => {

}