import React, { Component, Fragment } from 'react';
import { Grid, Paper, Icon, withStyles, SvgIcon } from '@material-ui/core';
import DiffView from './DiffView';
import FilesView from './FilesView';
import { connect } from 'react-redux';

const style = {
  root: {
    flexGrow: 1,
    backgroundColor: '#fff',
    border: '1px solid #bbb',
  },
  item: {
    flexGrow: 1,
  },
  header: {
    paddingBottom: 20,
    paddingLeft: 30,
  },
  titleicon: {
    padding: 0,
    fontSize: 20,
    transform: 'translateY(5px)',
  },
  titleItem: {
    marginRight: 20,
  },
};

class Details extends Component {
  render() {
    const { isHistoryView, classes, currentCommitHash, currentCommitMsg, filesCount, currentCommitAuthor } = this.props;
    if (isHistoryView) {
      return (
        <Fragment>
          <div className={classes.root}>
            <Grid container spacing={0}>
              <Grid item xs={12} className={classes.item}>
                <div className={classes.header}>
                  <h2>{currentCommitMsg}h</h2>
                  <div>
                    <span className={classes.titleItem}>
                    <Icon className="fa fa-user" classes={{root:classes.titleicon}}/>
                      {currentCommitAuthor}
                    </span>
                    <span className={classes.titleItem}>
                    <SvgIcon viewBox="0 0 15 15" classes={{ root: classes.titleicon }}>
                    <path d="M10.86 7c-.45-1.72-2-3-3.86-3-1.86 0-3.41 1.28-3.86 3H0v2h3.14c.45 1.72 2 3 3.86 3 1.86 0 3.41-1.28 3.86-3H14V7h-3.14zM7 10.2c-1.22 0-2.2-.98-2.2-2.2 0-1.22.98-2.2 2.2-2.2 1.22 0 2.2.98 2.2 2.2 0 1.22-.98 2.2-2.2 2.2z"></path>
                    </SvgIcon>                     {currentCommitHash}
                    </span>
                    <span className={classes.titleItem}>
                    <SvgIcon classes={{ root: classes.titleicon }} viewBox="0 0 15 15">
                    <path d="M6 7h2v1H6v2H5V8H3V7h2V5h1v2zm-3 6h5v-1H3v1zM7.5 2L11 5.5V15c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h6.5zM10 6L7 3H1v12h9V6zM8.5 0H3v1h5l4 4v8h1V4.5L8.5 0z"></path>
                    </SvgIcon>
                      {filesCount} files
                    </span>
                  </div>
                </div>
              </Grid>
              <Grid item xs={4} className={classes.item}>
                <FilesView />
              </Grid>
              <Grid item xs={8} className={classes.item}>
                <DiffView containerHeight="calc(100vh - 161px)" />
              </Grid>
            </Grid>
          </div>
        </Fragment>
      );
    }
    return <DiffView className={classes.item} containerHeight="calc(100vh - 48px)" />;
  }
}
const mapStateToProps = (state) => ({
  isHistoryView: state.global.isHistoryView,
  currentCommitHash: state.diff && state.diff.currentCommitHash,
  currentCommitMsg: state.diff && state.diff.currentCommitMsg,
  filesCount: state.diff && state.diff.files && state.diff.files.length,
  currentCommitAuthor: state.diff && state.diff.currentCommitAuthor,
});
export default connect(mapStateToProps)(withStyles(style)(Details));
