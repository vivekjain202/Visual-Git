import React, { Fragment } from 'react'
import { Dialog, TextField, DialogActions, DialogContentText, Button, DialogContent, ListItemText, Divider, List, ListItem } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import { connect } from 'react-redux'
import { CHANGE_BRANCH, CHANGE_BRANCH_COMMITS } from '../../../constants/actions'

const mapStateToProps = state => {
    return {
        branches: state.global.branches
    }
}
const mapDispatchToProps = dispatch => {
    return {
        changeBranch: (branchName) => dispatch({ type: CHANGE_BRANCH, payload: branchName }),
        changeBranchCommits: (branchName) => dispatch({ type: CHANGE_BRANCH_COMMITS, payload: branchName })
    }
}
class CurrentBranchDialog extends React.Component {
    state = {
        open: this.props.openStatus,
        filterText: "",
        branches: [{ id: 1, name: 'master', selected: true }, { id: 2, name: 'UI-1', selected: false }, { id: 3, name: 'UI-2', selected: false }]
    }
    handleClose = () => {
        this.setState({ open: false });
        this.props.close()
    };
    handleRepo = () => {

    }
    componentDidMount() {
        this.setState({
            branches: this.props.branches,
        })
    }
    handleBranchClick = (name) => {
        this.props.branchName(name)
    }
    render() {
        return (
            <Fragment>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    onBackdropClick='false'
                >

                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="normal"
                            id="repoName"
                            label="Filter"
                            type="text"
                            maxWidth={'lg'}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogContentText>Other</DialogContentText>
                    <Divider />
                    <List style={{ maxHeight: 200, overflow: 'auto' }}>
                        {this.state.branches.map((branch) => {
                            const iconDisplay = branch.selected ? <CheckIcon></CheckIcon> : <span></span>
                            return <ListItem key={branch.id} button onClick={() => this.handleBranchClick(branch.name)}>
                                {iconDisplay}
                                <ListItemText primary={branch.name}></ListItemText>
                            </ListItem>
                        })}
                    </List>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Select
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBranchDialog)