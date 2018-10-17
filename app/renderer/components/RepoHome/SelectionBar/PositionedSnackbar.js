import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class PositionedSnackbar extends React.Component {
    state = {
        open: false,
        vertical: 'bottom',
        horizontal: 'left',
        message: ''
    };

    handleClick = () => () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    componentDidMount() {
        console.log(this.props,' from positionSnackbar //////////////////////////////////////////////////')
        this.setState({
            message:this.props.message,
            open: true,
        })
    }
    componentWillMount(){
        console.log('component is unmounting....')
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