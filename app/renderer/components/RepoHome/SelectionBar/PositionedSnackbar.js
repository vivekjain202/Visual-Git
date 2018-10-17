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
            message:this.props.message,
            open: true,
        })
    }
    render() {
        const { vertical, horizontal, open } = this.state;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.message}</span>}
                />
            </div>
        );
    }
}

export default PositionedSnackbar