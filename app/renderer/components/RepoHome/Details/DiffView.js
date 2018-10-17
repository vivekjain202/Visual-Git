import React, { Component, Fragment } from 'react';
import { Paper, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

const styles = {
  root:{
    borderRadius: 'none'
  }
};

class DiffView extends Component {
  render() {
    const { containerHeight, classes } = this.props;
    return (
      <Fragment>
        <Paper
          color="primary"
          classes={{root:classes.root}}
          style={{
            height: containerHeight,
          }}
        />
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
