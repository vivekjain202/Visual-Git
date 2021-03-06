import React from 'react'
import { TextField, DialogContentText, DialogContent, ListItemText, Divider, List, ListItem, SvgIcon } from '@material-ui/core'
import { connect } from 'react-redux'
import { CHANGE_BRANCH, UPDATE_BRANCHES, CHANGE_BRANCH_COMMITS } from '../../../constants/actions'
import { gitLog, deleteBranch } from './renderer-menu-functions'
import { CustomDialog } from './CustomComponents'
import CheckIcon from '@material-ui/icons/Done'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import PositionedSnackbar from './PositionedSnackbar'
import Fuse from 'fuse.js'
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
        updateBranches: (branches) => dispatch({ type: UPDATE_BRANCHES, payload: branches }),
    }
}
class CurrentBranchDialog extends React.Component {
    state = {
        open: this.props.openStatus,
        filterText: "",
        branches: [],
        filteredBranches: [],
        alertOpen: false,
        filterInputText: "",
        branchKeys: []
    }
    handleClose = () => {
        this.setState({ open: false });
        this.props.close()
    };
    componentDidMount() {
        const { branches } = this.props
        const branchKeys = Object.keys(branches).map(branchKey => {
            return { name: branchKey, ...branches[branchKey] }
        })
        this.setState({
            branches: Object.keys(this.props.branches),
            filteredBranches: Object.keys(this.props.branches),
            branchKeys
        })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.branches.length !== this.props.branches.length) {
            console.log(this.props.branches, 'after deletion branches')
            this.setState({
                branches: this.props.branches,
                filteredBranches: this.props.branches,
            })
        }
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
    handleFilterInput = (e) => {
        let options = {
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
                "name",
                "commit",
                "label",
            ]
        };
        const fuse = new Fuse(this.state.branchKeys, options)
        const result = fuse.search(e.target.value)
        this.setState({ filteredBranches: result.map(branch => branch.name) })
    }
    handleDeleteBranch = (branch) => {
        this.handleClose()
        console.log(branch)
        const branchesAfterDeleteBranch = deleteBranch(this.props.currentRepoPath, branch)
        this.props.updateBranches(branchesAfterDeleteBranch['branches'])
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
                        label="Filter by commit hash, label, name"
                        type="text"
                        onChange={this.handleFilterInput}
                        fullWidth
                    />
                </DialogContent>
                <DialogContentText style={{ paddingLeft: '23px', paddingTop: '23px', }}>Default branch</DialogContentText>
                <List>
                    <ListItem key={'master'} button onClick={() => this.handleBranchClick('master')}>
                        <SvgIcon viewBox="0 0 10 16">
                            <path d="M10 5c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v.3c-.02.52-.23.98-.63 1.38-.4.4-.86.61-1.38.63-.83.02-1.48.16-2 .45V4.72a1.993 1.993 0 0 0-1-3.72C.88 1 0 1.89 0 3a2 2 0 0 0 1 1.72v6.56c-.59.35-1 .99-1 1.72 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-.53-.2-1-.53-1.36.09-.06.48-.41.59-.47.25-.11.56-.17.94-.17 1.05-.05 1.95-.45 2.75-1.25S8.95 7.77 9 6.73h-.02C9.59 6.37 10 5.73 10 5zM2 1.8c.66 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm0 12.41c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm6-8c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path>
                        </SvgIcon>
                        <ListItemText primary={'master'}></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <DialogContentText style={{ paddingLeft: '23px', paddingTop: '23px', }}>Other</DialogContentText>
                <List style={{ overflow: 'auto', maxHeight: '300px' }}>
                    {this.state.filteredBranches.length ? this.state.filteredBranches.map((branch) => {
                        const iconToDisplay = this.props.currentBranch === branch ? <CheckIcon /> : <SvgIcon viewBox="0 0 10 16">
                            <path d="M10 5c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v.3c-.02.52-.23.98-.63 1.38-.4.4-.86.61-1.38.63-.83.02-1.48.16-2 .45V4.72a1.993 1.993 0 0 0-1-3.72C.88 1 0 1.89 0 3a2 2 0 0 0 1 1.72v6.56c-.59.35-1 .99-1 1.72 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-.53-.2-1-.53-1.36.09-.06.48-.41.59-.47.25-.11.56-.17.94-.17 1.05-.05 1.95-.45 2.75-1.25S8.95 7.77 9 6.73h-.02C9.59 6.37 10 5.73 10 5zM2 1.8c.66 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm0 12.41c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm6-8c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path>
                        </SvgIcon>
                        return <React.Fragment key={branch}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <ListItem key={branch} button onClick={() => this.handleBranchClick(branch)}>
                                    {iconToDisplay}
                                    <ListItemText primary={branch}></ListItemText>
                                </ListItem>
                                {branch !== 'master' && !branch.includes('remote') ? <DeleteIcon style={{ color: 'black', cursor: 'pointer' }} onClick={() => this.handleDeleteBranch(branch)}></DeleteIcon> : null}
                            </div>
                        </React.Fragment>
                    }) : this.state.branches.map((branch) => {
                        const iconToDisplay = this.props.currentBranch === branch ? <CheckIcon /> : <SvgIcon viewBox="0 0 10 16">
                            <path d="M10 5c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v.3c-.02.52-.23.98-.63 1.38-.4.4-.86.61-1.38.63-.83.02-1.48.16-2 .45V4.72a1.993 1.993 0 0 0-1-3.72C.88 1 0 1.89 0 3a2 2 0 0 0 1 1.72v6.56c-.59.35-1 .99-1 1.72 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-.53-.2-1-.53-1.36.09-.06.48-.41.59-.47.25-.11.56-.17.94-.17 1.05-.05 1.95-.45 2.75-1.25S8.95 7.77 9 6.73h-.02C9.59 6.37 10 5.73 10 5zM2 1.8c.66 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm0 12.41c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm6-8c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path>
                        </SvgIcon>
                        return <React.Fragment key={branch}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <ListItem key={branch} button onClick={() => this.handleBranchClick(branch)}>
                                    {iconToDisplay}
                                    <ListItemText primary={branch}></ListItemText>
                                </ListItem>
                                <DeleteIcon style={{ color: 'black', cursor: 'pointer' }} onClick={() => this.handleDeleteBranch(branch)}></DeleteIcon>
                            </div>
                        </React.Fragment>
                    })}
                </List>
            </CustomDialog>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentBranchDialog)