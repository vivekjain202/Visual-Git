import React from 'react'
import { ipcRenderer } from 'electron'
import { CustomDialog } from './SelectionBar/CustomComponents'
import { DialogContent, DialogContentText, CHANGE_BRANCH, TextField, withStyles, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { UPDATE_BRANCHES } from '../../constants/actions'

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
    }
}
class RenameBranch extends React.Component {
    state = {
        open: false,
        isCreateButtonDisabled: false,
        branchName: ''
    }
    handleCreate = () => {
        const branches = ipcRenderer.sendSync('git-rename-branch', this.props.repo, this.props.branch, this.state.branchName);
        if(!this.state.branchName) this.props.changeBranch(this.state.branchName);
        this.setState({ open: false });
        this.props.updateBranches(branches.branches);
        
    }
    componentDidMount() {
        this.setState({
            open: this.props.openStatus
        })
    }
    handleClose = () => {
        this.setState({
            open: false,
        })
        this.props.close()
    }
    handleBranchInputChange = (e) => {
        this.setState({
            branchName: e.target.value
        })
    }
    render() {
        const { classes } = this.props
        return (
            <CustomDialog
                open={this.state.open}
                onClose={this.handleClose}
            >
                <DialogContent>
                    <DialogContentText style={{ fontSize: '24px' }}>Rename branch</DialogContentText>
                    <TextField
                        margin="dense"
                        id="repoName"
                        label="branch name"
                        type="text"
                        fullWidth
                        className={classes.inputField}
                        onChange={this.handleBranchInputChange}
                        value={this.state.branchName}
                    />
                    <Button variant="contained" color="secondary" disabled={this.state.isCreateButtonDisabled} className={classes.cloneButtonMargin} onClick={this.handleCreate}>
                        Rename Branch
                    </Button>
                </DialogContent>
            </CustomDialog>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateBranches: (branch) => dispatch({ type: UPDATE_BRANCHES, payload: branch }),
        changeBranch: (branchName) => dispatch({ type: CHANGE_BRANCH, payload: branchName }),
    }
}
const mapStateToProps = (state) => { return { branch: state.global.currentBranch, repo: state.global.currentRepoPath } }
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(RenameBranch))