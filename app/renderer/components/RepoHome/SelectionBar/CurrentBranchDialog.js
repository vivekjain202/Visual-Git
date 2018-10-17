import React from 'react'
import { TextField, DialogContentText, DialogContent, ListItemText, Divider, List, ListItem, SvgIcon } from '@material-ui/core'
import { connect } from 'react-redux'
import { CHANGE_BRANCH, CHANGE_BRANCH_COMMITS } from '../../../constants/actions'
import { gitLog } from './renderer-menu-functions'
import { CustomDialog } from './CustomComponents'
import CheckIcon from '@material-ui/icons/Done'
import PositionedSnackbar from './PositionedSnackbar'
const mapStateToProps = state => {
    return {
        branches: state.global.branches,
        currentRepoPath: state.global.currentRepoPath,
        currentBranch: state.global.currentBranch
    }
}
const mapDispatchToProps = dispatch => {
    return {
        changeBranch: (branchName) => dispatch({ type: CHANGE_BRANCH, payload: branchName }),
        changeBranchCommits: (commits) => dispatch({ type: CHANGE_BRANCH_COMMITS, payload: commits }),
    }
}
class CurrentBranchDialog extends React.Component {
    state = {
        open: this.props.openStatus,
        filterText: "",
        branches: [],
        alertOpen: false,
    }
    handleClose = () => {
        this.setState({ open: false });
        this.props.close()
    };
    componentDidMount() {
        this.setState({
            branches: this.props.branches,
        })
    }
    handleBranchClick = async (name) => {
        this.props.changeBranch(name)
        const gitLogs = await gitLog(this.props.currentRepoPath, name)
        this.props.changeBranchCommits(gitLogs)
        this.handleClose()
    }
    handleAlertClose = () => {
        this.setState({
            alertOpen: false,
        })
    }
    noBranchSelected = () => {
        return <PositionedSnackbar message={this.props.message} closeComponent={this.props.close}></PositionedSnackbar>
    }
    render() {
        return (
            !this.props.currentBranch ? this.noBranchSelected() : <CustomDialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogContent style={{ padding: '0px 24px' }}>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="repoName"
                        label="Filter"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                {/* selected={this.props.currentBranch === branch} */}
                <DialogContentText style={{ paddingLeft: '23px', paddingTop: '23px', }}>Default branch</DialogContentText>
                <List>
                    <ListItem key={'master'} button onClick={() => this.handleBranchClick('master')}>
                        {/* <Icon style={{ color: '#444' }} className="fa fa-code-branch" /> */}
                        <SvgIcon viewBox="0 0 10 16">
                            <path d="M10 5c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v.3c-.02.52-.23.98-.63 1.38-.4.4-.86.61-1.38.63-.83.02-1.48.16-2 .45V4.72a1.993 1.993 0 0 0-1-3.72C.88 1 0 1.89 0 3a2 2 0 0 0 1 1.72v6.56c-.59.35-1 .99-1 1.72 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-.53-.2-1-.53-1.36.09-.06.48-.41.59-.47.25-.11.56-.17.94-.17 1.05-.05 1.95-.45 2.75-1.25S8.95 7.77 9 6.73h-.02C9.59 6.37 10 5.73 10 5zM2 1.8c.66 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm0 12.41c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm6-8c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path>
                        </SvgIcon>
                        <ListItemText primary={'master'}></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <DialogContentText style={{ paddingLeft: '23px', paddingTop: '23px', }}>Other</DialogContentText>
                {/* <Divider /> */}

                <List style={{ overflow: 'auto', maxHeight: '300px' }}>
                    {this.state.branches.map((branch) => {
                        const iconToDisplay = this.props.currentBranch === branch ? <CheckIcon /> : <SvgIcon viewBox="0 0 10 16">
                            <path d="M10 5c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v.3c-.02.52-.23.98-.63 1.38-.4.4-.86.61-1.38.63-.83.02-1.48.16-2 .45V4.72a1.993 1.993 0 0 0-1-3.72C.88 1 0 1.89 0 3a2 2 0 0 0 1 1.72v6.56c-.59.35-1 .99-1 1.72 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-.53-.2-1-.53-1.36.09-.06.48-.41.59-.47.25-.11.56-.17.94-.17 1.05-.05 1.95-.45 2.75-1.25S8.95 7.77 9 6.73h-.02C9.59 6.37 10 5.73 10 5zM2 1.8c.66 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm0 12.41c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm6-8c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path>
                        </SvgIcon>
                        return <React.Fragment key={branch}>
                            <ListItem key={branch} button onClick={() => this.handleBranchClick(branch)}>
                                {iconToDisplay}
                                <ListItemText primary={branch}></ListItemText>
                            </ListItem>
                            {/* <Divider /> */}
                        </React.Fragment>
                    })}
                </List>
            </CustomDialog>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBranchDialog)