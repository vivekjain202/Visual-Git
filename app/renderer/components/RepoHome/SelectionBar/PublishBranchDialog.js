import React from 'react'
import { TextField, DialogContent, DialogContentText, Button } from '@material-ui/core'
import { CustomDialog } from './CustomComponents'
import CloudUpload from '@material-ui/icons/CloudUpload'
import { connect } from 'react-redux'
import PositionedSnackbar from './PositionedSnackbar'

const buttonStyle = {
    paddingRight: 10,
    color: 'white'
}
const mapStateToProps = state => {
    return {
        remoteOrigin: state.global.remoteOrigin,
        currentBranch: state.global.currentBranch
    }
}
class PublishBranchDialog extends React.Component {
    state = {
        open: this.props.openStatus,
        remoteOrigin: this.props.remoteOrigin
    }
    handleClose = () => {
        this.setState({ open: false });
        this.props.close()
    };
    componentDidMount = () => {
        // console.log(this.props, ' remote origin...........................................')
    }
    componentWillMount = () => {
        // console.log('unmounting publish branch dialog')
    }
    noBranchSelected = () => {
        return <PositionedSnackbar message={this.props.message} closeComponent= {this.props.close}></PositionedSnackbar>
    }
    render() {
        return (
            !this.props.currentBranch ? this.noBranchSelected() : <CustomDialog
                open={this.state.open}
                onClose={this.handleClose}
            >
                <DialogContent>
                    <DialogContentText style={{ fontSize: '24px' }}>Publish<CloudUpload style={buttonStyle} /></DialogContentText>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="name"
                        label="Username"
                        type="text"
                        fullWidth
                        required
                    />
                    <TextField
                        margin="normal"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        required
                    />
                    {this.props.remoteOrigin ? null : <TextField
                        margin="normal"
                        id="originPath"
                        label="Remote Repository Link"
                        type="text"
                        fullWidth
                        required
                    />}
                    <Button variant="contained" color="secondary" style={{ width: '200px', textAlign: 'center', margin: '0 auto', marginLeft: 'auto', marginRight: 'auto' }}>
                        <span style={{ paddingRight: '23px' }}> Push</span>
                        <CloudUpload style={buttonStyle} />
                    </Button>
                </DialogContent>

            </CustomDialog>
        )
    }
}

export default connect(mapStateToProps)(PublishBranchDialog)