import React, { Fragment } from 'react'
import { Dialog, TextField, DialogContentText, DialogContent, ListItemText, Divider, List, ListItem } from '@material-ui/core'
// import CheckIcon from '@material-ui/icons/Check'
import { connect } from 'react-redux'
import { CHANGE_BRANCH, CHANGE_BRANCH_COMMITS } from '../../../constants/actions'
import { gitLog } from './renderer-menu-functions'

const mapStateToProps = state => {
    return {
        branches: state.global.branches,
        currentRepoPath: state.global.currentRepoPath
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
        default: 'master'
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
        this.props.changeBranchCommits(gitLogs)
        this.handleClose()
    }
    render() {
        return (
            <Fragment>
                <Dialog
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
                    <DialogContentText>Other</DialogContentText>
                    <Divider />
                    <List style={{ maxHeight: 200, overflow: 'auto' }}>
                        {this.state.branches.map((branch) => {
                            // const iconDisplay = branch.selected || branch.name==='Master' ? <CheckIcon></CheckIcon> : <span></span>
                            console.log(branch)
                            return <ListItem key={branch} button onClick={() => this.handleBranchClick(branch)}>
                                {/* {iconDisplay} */}
                                <ListItemText primary={branch}></ListItemText>
                            </ListItem>
                            // console.log(branch)
                        })}
                    </List>
                    {/* <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Select
                        </Button>
                    </DialogActions> */}
                </Dialog>
            </Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBranchDialog)