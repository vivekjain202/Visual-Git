import React, { Fragment } from 'react'
import { CustomDialog } from '../SelectionBar/CustomComponents'
import { DialogContent, DialogContentText, TextField, withStyles, Button, Fade, CircularProgress } from '@material-ui/core'
import classNames from 'classnames'
import { ipcRenderer } from 'electron'
import { gitBranch, gitLog } from '../SelectionBar/renderer-menu-functions'
import FolderIcon from '@material-ui/icons/CreateNewFolder'
import { CHANGE_REPOSITORY, CHANGE_REPOSITORY_BRANCHES, CHANGE_BRANCH_COMMITS, SET_ALL_COMMITS, CURRENT_REPO_PATH, CHANGE_BRANCH } from '../../../constants/actions'
import { connect } from 'react-redux';
const { dialog } = require('electron').remote
const styles = {
    inputField: {
        marginBottom: '0px'
    },
    cloneButtonMargin: {
        marginTop: '20px',
        textTransform: 'capitalize'
    },
    displayflex: {
        display: 'flex',
    },
    flexDirectionRow: {
        flexDirection: 'row'
    },
    inputFieldPartialWidth: {
        width: '330px',
    },
    inputFieldPaddingRight: {
        paddingRight: '10px'
    },
    flexSpaceBetween: {
        justifyContent: 'space-between'
    }
}
class CloneRepository extends React.Component {
    state = {
        open: false,
        url: '',
        path: '',
        isCloneDisabled: false,
        loading: false
    }
    handleClose = () => {
        this.setState({
            open: false,
        });
        this.props.close()
    };
    componentDidMount() {
        this.setState({
            open: this.props.openStatus
        })
    }
    handlePath = () => {
        const path = dialog.showOpenDialog({
            properties: ['openDirectory']
        })
        this.setState({
            path: path,
        })
    }
    componentWillUnmount() {
        this.setState({
            url: '',
            path: ''
        })
        this.handleClose()
    }
    handleUrlChange = (e) => {
        this.setState({
            url: e.target.value,
        })
    }
    handlePathChange = (e) => {
        this.setState({
            path: e.target.value
        })
    }
    handleClone = async () => {
        this.setState({
            loading: true,
        })
        const isCloned = ipcRenderer.sendSync('git-clone', [this.state.url, this.state.path])
        console.log(isCloned)
        const temp = this.state.url.split('/')
        const reponame = temp[temp.length - 1]
        if (isCloned === "true") this.initiateLocalRepoDialog(reponame)
    }
    initiateLocalRepoDialog = async (reponame) => {
        const temp = ipcRenderer.sendSync('git-local-repo', `${this.state.path}/${reponame.split('.')[0]}`)
        const splitTemp = temp.path[0].split('/')
        this.props.updateCurrentRepoPath(temp.path[0])
        this.props.changeRepo(splitTemp[splitTemp.length - 1])
        this.props.setAllCommits(temp.all)
        const branches = await gitBranch(temp.path[0])
        this.props.changeBranches(branches.branches)
        const gitLogs = await gitLog(temp.path[0], 'master')
        this.props.changeBranch('master')
        this.props.changeBranchCommits(gitLogs)
        this.props.addToOtherRepos(temp.path[0])
    }
    render() {
        const { classes } = this.props
        const { loading } = this.state
        return (
            <Fragment>
                <CustomDialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogContent>
                        <DialogContentText style={{ fontSize: '24px' }}>Clone Repository</DialogContentText>
                        <TextField
                            margin="dense"
                            id="repoName"
                            label="Url"
                            type="text"
                            fullWidth
                            className={classes.inputField}
                            onChange={this.handleUrlChange}
                            value={this.state.url}
                        />
                        <div className={classNames(classes.displayflex, classes.flexDirectionRow, classes.flexSpaceBetween)}>
                            <TextField
                                margin="dense"
                                id="repoPath"
                                label="Repository path to save"
                                type="text"
                                value={this.state.path}
                                fullWidth
                                className={classNames(classes.inputField, classes.inputFieldPartialWidth, classes.inputFieldPaddingRight)}
                                onChange={this.handleRepositoryPathChange}
                            />
                            <Button onClick={this.handlePath} className={classes.button}><FolderIcon></FolderIcon></Button>
                        </div>
                        <div className={classNames(classes.displayflex, classes.flexSpaceBetween)}>
                            <Button variant="contained" color="secondary" disabled={this.state.isCloneDisabled} className={classes.cloneButtonMargin} onClick={this.handleClone}>
                                Clone
                    </Button>
                            <Fade in={loading} style={{ transitionDelay: loading ? '800ms' : '0ms', }} unmountOnExit>
                                <CircularProgress />
                            </Fade>
                        </div>
                    </DialogContent>
                </CustomDialog>
            </Fragment>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeRepo: (repoName) => dispatch({ type: CHANGE_REPOSITORY, payload: repoName }),
        changeBranches: (branches) => dispatch({ type: CHANGE_REPOSITORY_BRANCHES, payload: branches }),
        changeBranchCommits: (commits) => dispatch({ type: CHANGE_BRANCH_COMMITS, payload: commits }),
        setAllCommits: (allCommits) => dispatch({ type: SET_ALL_COMMITS, payload: allCommits }),
        updateCurrentRepoPath: (path) => dispatch({ type: CURRENT_REPO_PATH, payload: path }),
        changeBranch: (branchName) => dispatch({ type: CHANGE_BRANCH, payload: branchName }),
        addToOtherRepos: (pathToRepo) => dispatch({ type: ADD_OTHER_REPO, payload: pathToRepo }),
    }
}
const mapStateToProps = () => { return {} }
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CloneRepository))