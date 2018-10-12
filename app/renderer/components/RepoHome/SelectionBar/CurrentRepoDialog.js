import React, { Fragment } from 'react'
import { Dialog, TextField, DialogActions, DialogContentText, Button, DialogContent, ListItemText, Divider, List, ListItem } from '@material-ui/core'

class CurrentRepoDialog extends React.Component {
    state = {
        open: this.props.openStatus,
        filterText: ""

    }
    // handleClickOpen = () => {
    //     this.setState({ open: true });
    // };
    // handleChange(e){
    //   console.log(e.target.value)
    //   this.setState({
    //       filterText: e.target.value
    //   })
    // }
    handleClose = () => {
        this.setState({ open: false });
        this.props.close()
    };
    handleRepo = () => {

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
                        <ListItem button>
                            <ListItemText onClick={this.handleRepo} primary="Trash" />
                        </ListItem>
                        <ListItem button component="a" href="#simple-list">
                            <ListItemText primary="Spam" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Trash" />
                        </ListItem>
                        <ListItem button component="a" href="#simple-list">
                            <ListItemText primary="Spam" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Trash" />
                        </ListItem>
                        <ListItem button component="a" href="#simple-list">
                            <ListItemText primary="Spam" />
                        </ListItem>
                        <ListItem button component="a" href="#simple-list">
                            <ListItemText primary="Spam" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Trash" />
                        </ListItem>
                        <ListItem button component="a" href="#simple-list">
                            <ListItemText primary="Spam" />
                        </ListItem>
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
export default CurrentRepoDialog