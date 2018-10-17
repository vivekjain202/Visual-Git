import React, { Component, Fragment } from 'react';
import { List, ListItem, ListItemText, Divider, withStyles } from '@material-ui/core';
import { HISTORY_FILE_SELECTED } from '../../../constants/actions';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';

const styles = {
  root: {
    height: 'calc(100vh - 157px)',
    backgroundColor: '#efefef',
    borderTop: '1px solid #bbb',
    borderRadius: '0px',
    boxShadow: 'none',
    boxSizing: 'border-box'
  },
  listItemText: {
    padding: '0',
    paddingTop: 5,
    paddingBottom: 5,
  },
  listItemTextPrimary: {
    fontSize: 13,
  },
  listItemTextSecondary: {
    fontSize: 13,
  },
};
class FilesView extends Component {
  constructor() {
    super();
    this.showDiff = this.showDiff.bind(this);
  }

  showDiff(file) {
    console.log(file);
    const diff = ipcRenderer.sendSync('git-diff-particular-file', [
      this.props.currentRepoPath,
      this.props.currentCommitHash,
      file,
    ]);
    console.log(diff, 'In renderer');
    this.props.onSelectFile(diff);
  }
  render() {
    const { classes, files } = this.props;
    return (
      <Fragment>
        <div color="primary" className={classes.root}>
          <List component="nav">
            {files && files.length > 0 ? (
              files.map((fileItem) => (
                <Fragment key={fileItem.file}>
                  <ListItem
                    className={classes.listItem}
                    onClick={() => this.showDiff(fileItem.file)}
                    button>
                    <ListItemText
                      classes={{
                        root: classes.listItemText,
                        primary: classes.listItemTextPrimary,
                        secondary: classes.listItemTextSecondary,
                      }}
                      primary={
                        fileItem.file.length > 35
                          ? fileItem.file.substring(0, 35) + '...'
                          : fileItem.file
                      }
                      title={fileItem.file}
                    />
                  </ListItem>
                  <Divider />
                </Fragment>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No changes." />
              </ListItem>
            )}
          </List>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    files: state.diff ? state.diff.files : [],
    currentRepoPath: state.global.currentRepoPath,
    currentCommitHash: state.diff && state.diff.currentCommitHash,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onSelectFile: (file) => dispatch({ type: HISTORY_FILE_SELECTED, payload: { file } }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(FilesView));
