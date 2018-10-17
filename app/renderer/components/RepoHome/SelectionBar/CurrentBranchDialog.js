import React from 'react'
import { TextField, DialogContentText, DialogContent, ListItemText, Divider, List, ListItem, Icon } from '@material-ui/core'
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
                        <Icon style={{ color: '#444' }} className="fa fa-code-branch" />
                        <ListItemText primary={'master'}></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <DialogContentText style={{ paddingLeft: '23px', paddingTop: '23px', }}>Other</DialogContentText>
                {/* <Divider /> */}

                <List style={{ overflow: 'auto', maxHeight: '300px' }}>
                    {this.state.branches.map((branch) => {
                        const iconToDisplay = this.props.currentBranch === branch ? <CheckIcon /> : <Icon style={{ color: 'orange' }} className="fa fa-code-branch" />
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