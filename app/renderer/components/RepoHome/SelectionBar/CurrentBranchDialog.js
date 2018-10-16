import React, { Fragment } from 'react'
import {  TextField, DialogContentText, DialogContent, ListItemText, Divider, List, ListItem, Icon } from '@material-ui/core'
// import CheckIcon from '@material-ui/icons/Check'
import { connect } from 'react-redux'
import { CHANGE_BRANCH, CHANGE_BRANCH_COMMITS } from '../../../constants/actions'
import { gitLog } from './renderer-menu-functions'
import { CustomDialog } from './CustomComponents'
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
    handleRepo = () => {

    }
    componentDidMount() {
        console.log(this.props.branches)
        this.setState({
            branches: this.props.branches,
        })
    }
    handleBranchClick = async (name) => {
        this.props.changeBranch(name)
        // this.props.changeBranchCommits()
        // this.setState({
        //     default: name!=='Master' ? name : 'Master',
        // })
        const gitLogs = await gitLog(this.props.currentRepoPath, name)
        console.log(gitLogs, 'from the handleBranchClick')
        this.props.changeBranchCommits(gitLogs)
        this.handleClose()
    }
    handleAlertClose = () => {
        this.setState({
            alertOpen: false,
        })
    }
    render() {
        if (this.state.branches.length === 0) return null
        return (
            <Fragment>
                <CustomDialog
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
                    <DialogContentText style={{ paddingLeft: '23px', paddingTop: '23px', }}>Select the branch</DialogContentText>
                    <Divider />
                    <List style={{ overflow: 'auto', maxHeight: '300px' }}>
                        {this.state.branches.map((branch) => {
                            // const iconDisplay = branch.selected || branch.name==='Master' ? <CheckIcon></CheckIcon> : <span></span>
                            console.log(branch)
                            return <React.Fragment key={branch}>
                                <ListItem key={branch} selected={this.props.currentBranch === branch} button onClick={() => this.handleBranchClick(branch)}>
                                    <Icon  style={{color: '#444'}}className="fa fa-code-branch" />
                                    <ListItemText primary={branch}></ListItemText>
                                </ListItem>
                                <Divider />
                            </React.Fragment>

                            // console.log(branch)
                        })}
                    </List>
                </CustomDialog>
            </Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBranchDialog)