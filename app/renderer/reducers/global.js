import { CHANGE_BRANCH, CHANGE_BRANCH_COMMITS, CHANGE_REPOSITORY_BRANCHES, CHANGE_REPOSITORY } from '../constants/actions'
// import {gitInit, openLocalRepo, cloneRepo, renameRepo, deleteRepo, createNewBranch, switchBranch, deleteBranch, renameBranch} from '../components/RepoHome/SelectionBar/renderer-menu-functions';
const initialState = {
    currentRepo: '',
    currentBranch: 'Master',
    branches: [{ name: 'Master', selected: false }, { name: 'experiment', selected: false }],
    currentBranchCommits: [],
    otherBranches: []
};
export default (state = initialState, action) => {
    console.log(action.type, action.payload, 'action.type, action.payload')
    switch (action.type) {
        case CHANGE_BRANCH:
            state = { ...state, currentBranch: action.payload, branches: updateBranches(state.branches, action.payload) }
            break;
        case CHANGE_BRANCH_COMMITS:
            state = { ...state, currentBranchCommits: getCurrentBranchCommits(state.branches, action.payload) }
            break;
        case CHANGE_REPOSITORY:
            state = { ...state, currentRepo: action.payload }
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

const getRepositoryBranches = () => {

}


