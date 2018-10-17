import React, { Component, Fragment } from 'react';
import { Paper, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

const styles = {
  container: {
    height: 'calc(100vh - 165px)',
  },
};

class DiffView extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Paper color="primary" classes={{ root: classes.container }} />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    diffDetails: state.diff && state.diff.diffDetails,
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(DiffView));
