import React from 'react';
import { List, ListItem, ListItemText, Checkbox, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { FILE_SELECTED } from '../../../constants/actions';

const styles = {
  listItem: {
    padding: '0',
  },
  listItemText: {
    padding: '0',
  },
};

class Changes extends React.Component {
  render() {
    const { classes, files, onSelectFile } = this.props;
    console.log('files', files);
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    files: state.global ? state.global.files : [],
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onSelectFile: (file) => dispatch({ type: FILE_SELECTED, payload: { file } }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Changes));
