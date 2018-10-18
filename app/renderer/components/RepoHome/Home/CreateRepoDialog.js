import React, { Fragment } from 'react'
import { DialogContent, TextField, DialogContentText, Button, withStyles } from '@material-ui/core'
import classNames from 'classnames'
import { CustomDialog } from '../SelectionBar/CustomComponents'
import SelectPath from '@material-ui/icons/Create'
const { dialog } = require('electron').remote;

const styles = {
    inputField: {
        marginBottom: '0px'
    },
    inputFieldPartialWidth: {
        width: '330px',
    },
    displayflex: {
        display: 'flex',
    },
    flexDirectionRow: {
        flexDirection: 'row'
    },
    button: {
        margin: 'dense',
        color: 'black',
        padding: '0px',
    },
    flexSpaceBetween: {
        justifyContent: 'space-between'
    },
    createButtonMargin: {
        marginTop: '10px',
        textTransform: 'capitalize'
    },
    inputFieldPaddingRight: {
        paddingRight: '10px'
    }
}
class NewRepoDialog extends React.Component {
    state = {
        open: this.props.openStatus,
        directoryPath: "",
        name: "",
        description: ""
    }
    handleClose = () => {
        this.setState({
            open: false,
            name: "",
            description: "",
            directoryPath: ""
        });
        this.props.close()
    };
    handlePath = () => {
        const path = dialog.showOpenDialog({
            properties: ['openDirectory']
        })
        this.setState({
            directoryPath: path,
        })
    }
    componentDidMount() {
        this.setState({
            open: this.props.openStatus
        })
    }
    componentWillUnmount() {
        this.handleClose()
    }
    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    handleDescriptionChange = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    handleRepositoryPathChange = (e) => {
        this.setState({
            directoryPath: e.target.value
        })
    }
    handleCreate = () => {

    }
    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <CustomDialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogContent>
                        <DialogContentText style={{ fontSize: '24px' }}>Create Repository</DialogContentText>
                        <TextField
                            margin="dense"
                            id="repoName"
                            label="Name"
                            type="text"
                            fullWidth
                            className={classes.inputField}
                            onChange={this.handleNameChange}
                            value={this.state.name}
                        />
                        <TextField
                            margin="dense"
                            id="repoDescription"
                            label="Description"
                            type="text"
                            fullWidth
                            className={classes.inputField}
                            onChange={this.handleDescriptionChange}
                            value={this.state.description}
                        />
                        <div className={classNames(classes.displayflex, classes.flexDirectionRow, classes.flexSpaceBetween)}>
                            <TextField
                                margin="dense"
                                id="repoPath"
                                label="Repository path"
                                type="text"
                                value={this.state.directoryPath}
                                fullWidth
                                className={classNames(classes.inputField, classes.inputFieldPartialWidth, classes.inputFieldPaddingRight)}
                                onChange={this.handleRepositoryPathChange}
                            />
                            <Button onClick={this.handlePath} className={classes.button}><SelectPath></SelectPath></Button>
                        </div>
                        <Button variant="contained" color="secondary" className={classes.createButtonMargin} onClick={this.handleCreate}>
                            Create
                    </Button>
                    </DialogContent>
                </CustomDialog>
            </Fragment>
        )
    }
}
export default withStyles(styles)(NewRepoDialog)
// style={{ width: '200px', textAlign: 'center', margin: '0 auto', marginLeft: 'auto', marginRight: 'auto' }}