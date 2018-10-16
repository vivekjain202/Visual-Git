import React, { Component, Fragment } from 'react';
import {Paper,withStyles} from '@material-ui/core'

const styles = {
  container:{
    height: 'calc(100vh - 150px)',
  }
};

class DiffView extends Component {
  render() {
    const { classes} = this.props;
    return <Fragment>
       <Paper color="primary" classes={{ root: classes.container }}>
          
        </Paper>
    </Fragment>;
  }
}

export default withStyles(styles)(DiffView);
