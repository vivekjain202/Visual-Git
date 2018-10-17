import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class PositionedSnackbar extends React.Component {
    state = {
        open: false,
        vertical: 'bottom',
        horizontal: 'right',
        message: ''
    };

    handleClick = () => () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
        this.props.closeComponent()
    };
    componentDidMount() {
        this.setState({
            message:this.props.message.message,
            open: true,
        })
    }
    render() {
        const { vertical, horizontal, open } = this.state;
        const notificationColor = this.props.message.type === "error" ? "white" : "#007EF5"
        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id" style={{color: notificationColor}}>{this.state.message}</span>}
                />
            </div>
        );
    }
}

export default PositionedSnackbar