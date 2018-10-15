import { CHANGE_BRANCH, CHANGE_BRANCH_COMMITS, CHANGE_REPOSITORY_BRANCHES, CHANGE_REPOSITORY, SET_ALL_COMMITS, CURRENT_REPO_PATH } from '../constants/actions'
// import {gitInit, openLocalRepo, cloneRepo, renameRepo, deleteRepo, createNewBranch, switchBranch, deleteBranch, renameBranch} from '../components/RepoHome/SelectionBar/renderer-menu-functions';
const initialState = {
    currentRepo: '',
    currentBranch: 'Master',
    branches: [],
    currentBranchCommits: [],
    otherBranches: [],
    allCommits: [],
    currentRepoPath: ""
};
// , branches: updateBranches(state.branches, action.payload)
export default (state = initialState, action) => {
    console.log(action.type, action.payload, 'action.type, action.payload')
    switch (action.type) {
        case CHANGE_BRANCH:
            state = { ...state, currentBranch: action.payload }
            break;
        case CHANGE_BRANCH_COMMITS:
            state = { ...state, currentBranchCommits: changeBranchCommits(state.allCommits, action.payload) }
            break;
        case CHANGE_REPOSITORY:
            state = { ...state, currentRepo: action.payload }
            break;
        case CHANGE_REPOSITORY_BRANCHES:
            state = { ...state, branches: action.payload }
            break;
        case SET_ALL_COMMITS:
            state = { ...state, allCommits: action.payload }
            break;
        case CURRENT_REPO_PATH:
            state = { ...state, currentRepoPath: action.payload }
            break;
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

const getRepositoryBranches = (branchesRawData) => {
    console.log(branchesRawData, 'branches rawdata from getRepositoryBranches')
}

const changeBranchCommits = (allCommits, commitsHash) => {
    const reqCommits = commitsHash.filter(commit => commit !== null)
    let branchCommits = allCommits.filter(commit => {
        console.log(commit.commitsHash)
        for (let i = 0; i < reqCommits.length; i++) if (commit.hash.includes(reqCommits[i])) return true;
    })
    console.log(branchCommits)
    return branchCommits
}