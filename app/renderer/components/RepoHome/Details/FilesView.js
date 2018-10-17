import React, { Component, Fragment } from 'react';
import { Paper, List, ListItem, Checkbox, ListItemText, withStyles } from '@material-ui/core';
import { HISTORY_FILE_SELECTED } from '../../../constants/actions';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';

const styles = {
  sidebar: {
    width: 272.17,
    height: 'calc(100vh - 48px)',
  },
  listItem: {
    padding: '0',
  },
  listItemText: {
    padding: '0',
  },
};
class FilesView extends Component {
  constructor() {
    super();
    this.showDiff = this.showDiff.bind(this);
  }

  showDiff(file) {
    console.log(file);
    const diff = ipcRenderer.sendSync('git-diff-particular-file',[this.props.currentRepoPath,this.props.currentCommitHash,file]);
    console.log(diff,"In renderer");
    this.props.onSelectFile(diff);
  }

  render() {
    const { classes, files } = this.props;
    console.log(files);
    return (
      <Fragment>
        <Paper color="primary" classes={{ root: classes.sidebar }}>
          <List component="nav">
            {files && files.length > 0 ? (
              files.map((fileItem) => (
                <ListItem
                  key={fileItem}
                  className={classes.listItem}
                  onClick={() => this.showDiff(fileItem)}
                  button>
                  <Checkbox tabIndex={-1} disableRipple />
                  <ListItemText
                    className={classes.listItemText}
                    primary={
                      fileItem.length > 18
                        ? fileItem.substring(0, 20) + '...'
                        : fileItem
                    }
                    title={fileItem}
                  />
                </ListItem>
              ))
            ) : (
              <ListItem className={classes.listItem}>
                <ListItemText className={classes.listItemText} primary="No files have changes." />
              </ListItem>
            )}
          </List>
        </Paper>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    files: state.diff.files ? state.diff.files : [],
    currentRepoPath: state.global.currentRepoPath,
    currentCommitHash: state.diff.currentCommitHash,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onSelectFile: (diff) => dispatch({ type: HISTORY_FILE_SELECTED, payload: diff }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(FilesView));
