import React, { Component, Fragment } from 'react';
import { Paper, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

const styles = {
  root: {
    height: "100%",
    border: '1px solid #bbb',
    borderRadius: '0px',
    boxShadow: 'none',
    boxSizing: 'border-box'
  },
};

class DiffView extends Component {
  render() {
    const { containerHeight, classes } = this.props;
    return (
      <Fragment>
        <Paper
          color="primary"
          classes={{root:classes.root}}
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
function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(DiffView));
