import React from 'react';
import { List, ListItem, ListItemText, Checkbox, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { CHANGED_FILE_SELECTED } from '../../../constants/actions';
import { ipcRenderer } from 'electron';

const styles = {
  listItem: {
    padding: '0',
  },
  listItemText: {
    padding: '0',
  },
};

class Changes extends React.Component {
  constructor() {
    super();
  }

  onFileClick(file) {
    const diff = ipcRenderer.sendSync('git-diff-perticular-file',this.props.currentRepoPath,null,file);
    this.props.onSelectFile(diff)
  }

  render() {
    const { classes, files } = this.props;
    console.log('files', files);
    return (
      <React.Fragment>
        <List component="nav">
          {files && files.length > 0 ? (
            files.map((fileItem) => (
              <ListItem
                key={fileItem.file}
                className={classes.listItem}
                onClick={() => this.onFileClick(fileItem.file)}
                button>
                <Checkbox tabIndex={-1} disableRipple />
                <ListItemText
                  className={classes.listItemText}
                  primary={
                    fileItem.file.length > 18
                      ? fileItem.file.substring(0, 20) + '...'
                      : fileItem.file
                  }
                  title={fileItem.file}
                />
              </ListItem>
            ))
          ) : (
            <ListItem className={classes.listItem}>
              <ListItemText className={classes.listItemText} primary="No files have changes." />
            </ListItem>
          )}
        </List>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    files: state.global ? state.global.changedFiles : [],
    currentRepoPath: state.global.currentRepoPath,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onSelectFile: (diff) => dispatch({ type: CHANGED_FILE_SELECTED, payload: { diff } }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Changes));
