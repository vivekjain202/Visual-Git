import React, { Fragment } from 'react'
import { TextField, DialogContentText, DialogContent, ListItemText, Divider, List, ListItem } from '@material-ui/core'
// import CheckIcon from '@material-ui/icons/Check'
import { connect } from 'react-redux'
import TvIcon from '@material-ui/icons/Tv'
import { CHANGE_REPOSITORY_BRANCHES, CHANGE_REPOSITORY, ADD_REMOTE_ORIGIN, CHANGE_BRANCH_COMMITS, SET_ALL_COMMITS, CURRENT_REPO_PATH, CHANGE_BRANCH } from '../../../constants/actions'
// import { gitInit, cloneRepo, renameRepo, deleteRepo, createNewBranch, switchBranch, deleteBranch, renameBranch } from './renderer-menu-functions.js';
import { CustomDialog } from './CustomComponents'
import { ipcRenderer } from 'electron';
import { gitBranch, gitLog } from './renderer-menu-functions'
const buttonStyle = {
    paddingRight: 10,
    color: 'black'
}
class CurrentRepoDialog extends React.Component {
    state = {
        open: this.props.openStatus,
        filterText: "",
        repos: this.props.otherRepos,
    }
    handleClose = () => {
        this.setState({ open: false });
        this.props.close()
    };
    handleRepo = () => {

    }
    handleRepoClick = (repoName, repoPath) => {
        // console.log(name, 'repository name')
        // console.log(this.props)
        // this.props.changeRepo(name)
        // this.props.changeBranches()
        // console.log(repoName, repoPath, 'repoName and repoPath')
        this.initializeRepoOnSelect(repoPath)
        this.setState({ open: false });
        this.props.close()

    }
    componentDidMount() {
    }
    initializeRepoOnSelect = async (repoPath) => {
        const temp = ipcRenderer.sendSync('git-local-repo', repoPath);
        console.log(temp, 'test for the switching remoteOrigin')
        const splitTemp = temp.path.split('/')
        const repoName = splitTemp[splitTemp.length - 1]
        this.props.updateCurrentRepoPath(temp.path)
        this.props.changeRepo(repoName)
        this.props.setAllCommits(temp.all)
        const branches = await gitBranch(temp.path)
        this.props.changeBranches(branches.all)
        const gitLogs = await gitLog(temp.path, 'master')
        this.props.changeBranch('master')
        this.props.changeBranchCommits(gitLogs);
        if (temp.remotes.length)
            this.props.setRemoteURL(temp.remotes[0].refs['fetch'])
        else this.props.setRemoteURL("")
    }
    render() {
        return (
            <Fragment>
                <CustomDialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="normal"
                            id="repoName"
                            label="Filter"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogContentText style={{ paddingLeft: '23px' }}>Other repositories</DialogContentText>
                    <Divider />
                    {this.state.repos.length === 0 ? <ListItemText style={{ textAlign: "center" }} primary="No recent repositories"></ListItemText> : <List style={{ maxHeight: 200, overflow: 'auto' }}>
                        {this.state.repos.length === 1 ? <ListItemText style={{ textAlign: "center" }} primary="No recent repositories"></ListItemText> : this.state.repos.filter((repo) => {
                            const tempArray = repo.split('/')
                            const repoName = tempArray[tempArray.length - 1]
                            return repoName !== this.props.currentRepoName
                        }).map((repo) => {
                            const tempArray = repo.split('/')
                            const repoName = tempArray[tempArray.length - 1]
                            return <ListItem key={repoName} button onClick={() => this.handleRepoClick(repoName, repo)}>
                                <TvIcon style={buttonStyle} />
                                <ListItemText primary={repoName}></ListItemText>
                            </ListItem>
                        })}
                    </List>}
                </CustomDialog>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        otherRepos: state.global.otherRepos,
        currentRepoName: state.global.currentRepo
    }
}
const mapDispatchToProps = dispatch => {
    return {
        changeRepo: (repoName) => dispatch({ type: CHANGE_REPOSITORY, payload: repoName }),
        changeBranches: (branches) => dispatch({ type: CHANGE_REPOSITORY_BRANCHES, payload: branches }),
        changeBranchCommits: (commits) => dispatch({ type: CHANGE_BRANCH_COMMITS, payload: commits }),
        setAllCommits: (allCommits) => dispatch({ type: SET_ALL_COMMITS, payload: allCommits }),
        updateCurrentRepoPath: (path) => dispatch({ type: CURRENT_REPO_PATH, payload: path }),
        changeBranch: (branchName) => dispatch({ type: CHANGE_BRANCH, payload: branchName }),
        setRemoteURL: (remoteURL) => dispatch({ type: ADD_REMOTE_ORIGIN, payload: remoteURL })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CurrentRepoDialog)