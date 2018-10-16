import React, { Fragment } from 'react'
import { Dialog, TextField, DialogActions, DialogContentText, Button, DialogContent, ListItemText, Divider, List, ListItem } from '@material-ui/core'
// import CheckIcon from '@material-ui/icons/Check'
import { connect } from 'react-redux'
import TvIcon from '@material-ui/icons/Tv'
import { CHANGE_REPOSITORY_BRANCHES, CHANGE_REPOSITORY } from '../../../constants/actions'
// import { gitInit, cloneRepo, renameRepo, deleteRepo, createNewBranch, switchBranch, deleteBranch, renameBranch } from './renderer-menu-functions.js';


const buttonStyle = {
    paddingRight: 10,
    color: 'black'
  }
class CurrentRepoDialog extends React.Component {
    state = {
        open: this.props.openStatus,
        filterText: "",
        repos: [],
    }
    handleClose = () => {
        this.setState({ open: false });
        this.props.close()
    };
    handleRepo = () => {

    }
    handleRepoClick = (name) => {
        console.log(name, 'repository name')
        console.log(this.props)
        this.props.changeRepo(name)
        this.props.changeBranches()

    }
    componentDidMount() {
        
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
                            fullWidth
                        />
                    </DialogContent>
                    <DialogContentText>Other</DialogContentText>
                    <Divider />
                    <List style={{ maxHeight: 200, overflow: 'auto' }}>
                        {this.state.repos.map((repo) => {
                            // const iconDisplay = repo.selected ? <CheckIcon></CheckIcon> : <span></span>
                            return <ListItem key={repo.id} button onClick={() => this.handleRepoClick(name)}>
                                 <TvIcon style={buttonStyle} />
                                <ListItemText primary={repo.name}></ListItemText>
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
const mapStateToProps = () => {
    return {
    }
}
const mapDispatchToProps = dispatch => {
    return {
        changeRepo: (repoName) => {
            console.log(repoName, 'from mapDispatchtoProps');
            dispatch({ type: CHANGE_REPOSITORY, payload: repoName })
        },
        changeBranches: () => dispatch({ type: CHANGE_REPOSITORY_BRANCHES })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CurrentRepoDialog)