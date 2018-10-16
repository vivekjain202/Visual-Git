import React, { Component, Fragment } from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  withStyles,
} from '@material-ui/core';
import { HISTORY_FILE_SELECTED } from '../../../constants/actions';
import { connect } from 'react-redux';

const styles = {
  root: {
    height: 'calc(100vh - 150px)',
    backgroundColor:'#efefef'
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
  render() {
    const { classes, onSelectFile, files } = this.props;
    return (
      <Fragment>
        <Paper color="primary" classes={{ root: classes.root }}>
          <List component="nav">
            {files && files.length > 0 ? (
              files.map((fileItem) => (
                <Fragment key={fileItem.file}>
                  <ListItem
                    className={classes.listItem}
                    onClick={() => onSelectFile(fileItem.file)}
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
    onSelectFile: (file) => dispatch({ type: HISTORY_FILE_SELECTED, payload: { file } }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(FilesView));
