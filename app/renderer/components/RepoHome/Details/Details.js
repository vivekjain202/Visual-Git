import React, { Component, Fragment } from 'react';
import { Grid, Paper, Icon, withStyles } from '@material-ui/core';
import DiffView from './DiffView';
import FilesView from './FilesView';
import { connect } from 'react-redux';

const style = {
  root: {
    flexGrow: 1,
  },
  item: {
    flexGrow: 1,
  },
  header: {
    padding: 10,
    paddingLeft: 30
  },
};

class Details extends Component {
  render() {
    const { isHistoryView, classes } = this.props;
    if (isHistoryView) {
      return (
        <Fragment>
          <div className={classes.root}>
            <Grid container spacing={0}>
              <Grid item xs={12} className={classes.item}>
                <Paper className={classes.header}>
                  <h2>commit message</h2>
                  <div>
                    <Icon className="fa fa-gitter" />
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={4} className={classes.item}>
                <FilesView />
              </Grid>
              <Grid item xs={8} className={classes.item}>
                <DiffView />
              </Grid>
            </Grid>
          </div>
        </Fragment>
      );
    }
    return <DiffView className={classes.item}/>;
  }
}
const mapStateToProps = (state) => ({ isHistoryView: state.global.isHistoryView });
export default connect(mapStateToProps)(withStyles(style)(Details));
