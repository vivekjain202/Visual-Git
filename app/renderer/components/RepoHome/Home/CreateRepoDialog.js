import React, { Fragment } from 'react'
import { DialogContent, TextField, DialogContentText, Button, withStyles } from '@material-ui/core'
import classNames from 'classnames';
import { CustomDialog } from '../SelectionBar/CustomComponents'
import FolderIcon from '@material-ui/icons/CreateNewFolder'
import { gitBranch, gitLog } from '../SelectionBar/renderer-menu-functions'
import { ipcRenderer } from 'electron'
import { CHANGE_REPOSITORY, ADD_OTHER_REPO, CHANGE_REPOSITORY_BRANCHES, CHANGE_BRANCH_COMMITS, SET_ALL_COMMITS, CURRENT_REPO_PATH, CHANGE_BRANCH } from '../../../constants/actions'
import { connect } from 'react-redux'
const { dialog } = require('electron').remote;

const styles = {
    inputField: {
        marginBottom: '0px'
    },
    inputFieldPartialWidth: {
        width: '330px',
    },
    displayflex: {
        display: 'flex',
    },
    flexDirectionRow: {
        flexDirection: 'row'
    },
    button: {
        margin: 'dense',
        color: 'black',
        padding: '0px',
    },
    flexSpaceBetween: {
        justifyContent: 'space-between'
    },
    createButtonMargin: {
        marginTop: '10px',
        textTransform: 'capitalize'
    },
    inputFieldPaddingRight: {
        paddingRight: '10px'
    }
}
class NewRepoDialog extends React.Component {
    state = {
        open: this.props.openStatus,
        directoryPath: "",
        name: "",
        description: ""
    }
    handleClose = () => {
        this.setState({
            open: false,
            name: "",
            description: "",
            directoryPath: ""
        });
        this.props.close()
    };
    handlePath = () => {
        const path = dialog.showOpenDialog({
            properties: ['openDirectory']
        })
        this.setState({
            directoryPath: path,
        })
    }
    componentDidMount() {
        this.setState({
            open: this.props.openStatus
        })
    }
    componentWillUnmount() {
        this.setState({
            directoryPath: ""
        })
        this.handleClose()
    }
    handleRepositoryPathChange = (e) => {
        this.setState({
            directoryPath: e.target.value
        })
    }
    handleCreate = async () => {
        const dirData = await ipcRenderer.sendSync('git-init', this.state.directoryPath)
        console.log(dirData)
        if (dirData) this.initiateLocalRepoDialog(dirData)
    }
    initiateLocalRepoDialog = async (dirData) => {
        const path = dirData.path[0]
        console.log(path)
        // const temp = ipcRenderer.sendSync('git-local-repo', path[0])
        // console.log(temp.path[0])
        const splitPath = path.split('/')
        this.props.updateCurrentRepoPath(path)
        this.props.changeRepo(splitPath[splitPath.length - 1])
        this.props.setAllCommits(dirData.all)
        const branches = await gitBranch(path)
        this.props.changeBranches(branches.branches)
        const gitLogs = await gitLog(path, 'master')
        this.props.changeBranch('master')
        this.props.changeBranchCommits(gitLogs)
        this.props.addToOtherRepos(path)
    }
    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <CustomDialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogContent>
                        <DialogContentText style={{ fontSize: '24px' }}>Create Repository</DialogContentText>
                        <div className={classNames(classes.displayflex, classes.flexDirectionRow, classes.flexSpaceBetween)}>
                            <TextField
                                margin="dense"
                                id="repoPath"
                                label="Repository path"
                                type="text"
                                value={this.state.directoryPath}
                                fullWidth
                                className={classNames(classes.inputField, classes.inputFieldPartialWidth, classes.inputFieldPaddingRight)}
                                onChange={this.handleRepositoryPathChange}
                            />
                            <Button onClick={this.handlePath} className={classes.button}><FolderIcon></FolderIcon></Button>
                        </div>
                        <Button variant="contained" color="secondary" className={classes.createButtonMargin} onClick={this.handleCreate}>
                            Create Repository
                    </Button>
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
const mapStateToProps = () => {return{}}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewRepoDialog))
// style={{ width: '200px', textAlign: 'center', margin: '0 auto', marginLeft: 'auto', marginRight: 'auto' }}