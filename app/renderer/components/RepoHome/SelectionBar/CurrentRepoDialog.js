import React, { Fragment } from 'react'
import { Dialog, TextField, DialogActions, DialogContentText, Button, DialogContent, ListItemText, Divider, List, ListItem } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import { connect } from 'react-redux'
import { CHANGE_REPOSITORY_BRANCHES, CHANGE_REPOSITORY } from '../../../constants/actions'
class CurrentRepoDialog extends React.Component {
    state = {
        open: this.props.openStatus,
        filterText: "",
        repos: [{ id: 1, name: 'master', selected: true }, { id: 2, name: 'UI-1', selected: false }, { id: 3, name: 'UI-2', selected: false }]
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
        console.log(this.props)
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
                            const iconDisplay = repo.selected ? <CheckIcon></CheckIcon> : <span></span>
                            return <ListItem key={repo.id} button onClick={() => this.handleRepoClick(name)}>
                                {iconDisplay}
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
        changeRepo: (repoName) => dispatch({ type: CHANGE_REPOSITORY, payload: repoName }),
        changeBranches: () => dispatch({ type: CHANGE_REPOSITORY_BRANCHES })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CurrentRepoDialog)