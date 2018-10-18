import React, { Fragment } from 'react'
import { CustomDialog } from '../SelectionBar/CustomComponents'
import { DialogContent, DialogContentText, TextField, withStyles, Button } from '@material-ui/core'
import classNames from 'classnames'
import SelectPath from '@material-ui/icons/Create'
import { ipcRenderer } from 'electron'
import { gitBranch, gitLog } from '../SelectionBar/renderer-menu-functions'
const { dialog } = require('electron').remote
const styles = {
    inputField: {
        marginBottom: '0px'
    },
    cloneButtonMargin: {
        marginTop: '10px',
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
    }
}
class CloneRepository extends React.Component {
    state = {
        open: false,
        url: '',
        path: '',
        isCloneDisabled: ''
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
        const isCloned = await ipcRenderer.sendSync('git-clone', [this.state.url, this.state.path])
        if(isCloned) this.initiateLocalRepoDialog()
    }
    initiateLocalRepoDialog = async () => {
        const temp = ipcRenderer.sendSync('git-local-repo')
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
                            <Button onClick={this.handlePath} className={classes.button}><SelectPath></SelectPath></Button>
                        </div>
                        <Button variant="contained" color="secondary" disabled={this.state.isCloneDisabled}className={classes.cloneButtonMargin} onClick={this.handleClone}>
                            Clone
                    </Button>
                    </DialogContent>
                </CustomDialog>
            </Fragment>
        )
    }
}
export default withStyles(styles)(CloneRepository)