import React, { Component, Fragment } from 'react';
import { Paper, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
var AU = require('ansi_up');
var ansi_up = new AU.default();

const styles = {
  root: {
    height: '100%',
    maxHeight: 'calc(100vh - 48px)',
    borderRadius: '0px',
    boxShadow: 'none',
    boxSizing: 'border-box',
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor: '#000011',
  },
  view: {
    width: '100%',
    padding: 20,
    boxSizing: 'border-box',
    color: 'white',
    whiteSpace: 'pre-wrap',
  },
};

class DiffView extends Component {
  render() {
    const { classes } = this.props;
    let display;
    if (this.props.diffDetails) {
      display = ansi_up.ansi_to_html(this.props.diffDetails);
      display = display.split('\n').join('<br /><br />');
    }
    return (
      <Paper color="primary" classes={{ root: classes.root }}>
        <pre className={classes.view} dangerouslySetInnerHTML={{ __html: display }} />
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    diffDetails: state.diff.diffDetails,
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(DiffView));
