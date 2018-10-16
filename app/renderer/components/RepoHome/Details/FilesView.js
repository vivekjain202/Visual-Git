import React, { Component, Fragment } from 'react';
import { Paper, List, ListItem, Checkbox, ListItemText, withStyles } from '@material-ui/core';
import { HISTORY_FILE_SELECTED } from '../../../constants/actions';
import { connect } from 'react-redux';

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
  render() {
    const { classes, onSelectFile, files } = this.props;
    return (
      <Fragment>
        <Paper color="primary" classes={{ root: classes.sidebar }}>
          <List component="nav">
            {files && files.length > 0 ? (
              files.map((fileItem) => (
                <ListItem
                  key={fileItem.file}
                  className={classes.listItem}
                  onClick={() => onSelectFile(fileItem.file)}
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
        </Paper>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    files: state.files ? state.files.files : [],
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onSelectFile: (diff) => dispatch({ type: HISTORY_FILE_SELECTED, payload: { diff } }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(FilesView));
