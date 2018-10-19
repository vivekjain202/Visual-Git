import React from 'react'
import { TextField, DialogContent, DialogContentText, Button } from '@material-ui/core'
import { CustomDialog } from './CustomComponents'
import CloudUpload from '@material-ui/icons/CloudUpload'
import { connect } from 'react-redux'
import PositionedSnackbar from './PositionedSnackbar'

const buttonStyle = {
    paddingRight: 10,
    color: 'white',
    disabled: true,
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
        remoteOrigin: this.props.remoteOrigin,
        userName: '',
        password: '',
        disabled: true,
        buttonValue: 'Push'
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
    handleUsername = (e) => {
        this.setState({
           userName: e.target.value,
        },()=>this.validateInput())
    }
    handlePassword = (e) => {
        this.setState({
            password: e.target.value,
        }, ()=>this.validateInput())
    }
    handleURL = (e) => {
        this.setState({
            remoteOrigin: e.target.value,
        }, ()=> this.validateInput())
    }
    noBranchSelected = () => {
        return <PositionedSnackbar message={this.props.message} closeComponent= {this.props.close}></PositionedSnackbar>
    }
    validateInput = () => {
        if(this.state.userName.length >= 4 && this.state.password.length >=4 && this.state.remoteOrigin){
            this.setState({
                disabled: false,
            })
        }
        else{
            this.setState({
                disabled: true,
            })
        }
    }

    handlePush = () => {
        
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
                        value={this.state.userName}
                        onChange={this.handleUsername}
                    />
                    <TextField
                        margin="normal"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        required
                        value={this.state.password}
                        onChange = {this.handlePassword}
                    />
                    {this.props.remoteOrigin ? null : <TextField
                        margin="normal"
                        id="originPath"
                        label="Remote Repository Link"
                        type="text"
                        fullWidth
                        onChange={this.handleURL}
                        required
                    />}
                    <Button disabled = {this.state.disabled} variant="contained" onClick={this.handlePush}color="secondary" style={{ width: '200px', textAlign: 'center', margin: '0 auto', marginLeft: 'auto', marginRight: 'auto' }}>
                        <span style={{ paddingRight: '23px' }}> {this.state.buttonValue}</span>
                        <CloudUpload style={buttonStyle} />
                    </Button>
                </DialogContent>

            </CustomDialog>
        )
    }
}

export default connect(mapStateToProps)(PublishBranchDialog)