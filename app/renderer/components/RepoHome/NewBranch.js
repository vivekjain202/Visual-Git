import React from 'react'
import { CustomDialog } from './SelectionBar/CustomComponents'
import { DialogContent, DialogContentText, TextField, withStyles, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { ADD_BRANCH } from '../../constants/actions'
const styles = {
    inputField: {
        marginBottom: '0px'
    },
    cloneButtonMargin: {
        marginTop: '20px',
        textTransform: 'capitalize'
    },
    displayflex: {
        display: 'flex',
    },
    flexDirectionRow: {
        flexDirection: 'row'
    },
    inputFieldPartialWidth: {
        width: '330px',
    },
    inputFieldPaddingRight: {
        paddingRight: '10px'
    }
}
class NewBranch extends React.Component {
    state = {
        open: false,
        isCreateButtonDisabled: false,
        branchName:''
    }
    handleCreate = () => {

    }
    componentDidMount() {
        this.setState({
            open: this.props.openStatus
        })
    }
    handleClose = () => {
        this.setState({
            open: false,
        })
        this.props.close()
    }
    handleBranchInputChange = (e) => {
        this.setState({
            branchName: e.targer.value
        })
    }
    render() {
        const { classes } = this.props
        return (
            <CustomDialog
                open={this.state.open}
                onClose={this.handleClose}
            >
                <DialogContent>
                    <DialogContentText style={{ fontSize: '24px' }}>Create branch</DialogContentText>
                    <TextField
                        margin="dense"
                        id="repoName"
                        label="branch name"
                        type="text"
                        fullWidth
                        className={classes.inputField}
                        onChange={this.handleBranchInputChange}
                        value={this.state.url}
                    />
                    <Button variant="contained" color="secondary" disabled={this.state.isCreateButtonDisabled} className={classes.cloneButtonMargin} onClick={this.handleCreate}>
                        Create Branch
                    </Button>
                </DialogContent>
            </CustomDialog>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateBranches: (branch) => dispatch({ type: ADD_BRANCH, payload: branch })
    }
}
const mapStateToProps = () => { return {} }
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(NewBranch))