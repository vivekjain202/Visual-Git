import { CHANGE_BRANCH, CHANGE_BRANCH_COMMITS, CHANGE_REPOSITORY_BRANCHES, CHANGE_REPOSITORY, SET_ALL_COMMITS, CURRENT_REPO_PATH, ADD_OTHER_REPO, CHANGE_TO_HISTORY_VIEW } from '../constants/actions'
// import {gitInit, openLocalRepo, cloneRepo, renameRepo, deleteRepo, createNewBranch, switchBranch, deleteBranch, renameBranch} from '../components/RepoHome/SelectionBar/renderer-menu-functions';
const initialState = {
    currentRepo: '',
    currentBranch: '',
    branches: [],
    currentBranchCommits: [],
    otherBranches: [],
    allCommits: [],
    currentRepoPath: "",
    otherRepos: [],
    isHistoryView: false,
    latestBranchCommit:{}
};
// , branches: updateBranches(state.branches, action.payload)
export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_BRANCH:
            state = { ...state, currentBranch: action.payload }
            break;
        case CHANGE_BRANCH_COMMITS:
            state = { ...state, currentBranchCommits: action.payload.all, latestBranchCommit: action.payload.latest }
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
        case ADD_OTHER_REPO:
            state = { ...state, otherRepos: addOtherRepo(action.payload, state.otherRepos) }
            break;
        case CHANGE_TO_HISTORY_VIEW:
        state = { ...state, isHistoryView: action.payload };
        break;
    }
    return state;
}
const addOtherRepo = (pathToRepo, otherRepos) => {
    if (!otherRepos.includes(pathToRepo)) return [...otherRepos, pathToRepo]
    else return otherRepos
}

// const updateBranches = (branches, branchName) => {
//     const newBranches = branches.map(branch => {
//         if (branch.name !== branchName) return { ...branch, selected: false }
//         else return { ...branch, selected: true }
//     })
//     return newBranches
// }

// const getCurrentBranchCommits = (branches, branchName) => {
//     const commits = branches.map(branch => {
//         if (branch.name === branchName) return branch.commits
//     })
//     return commits
// }

// const getRepositoryBranches = (branchesRawData) => {
//     console.log(branchesRawData, 'branches rawdata from getRepositoryBranches')
// }

// const changeBranchCommits = (allCommits, commitsHash) => {
//     console.log(allCommits,"all commits");
//     console.log(commitsHash,"commit hash")
//     return commitsHash;
// }
