import React, { Fragment } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Divider,
  Button,
  TextField,
  withStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { FILE_SELECTED } from '../../../constants/actions';

const styles = {
  list: {
    height: 450,
  },
  listItem: {
    padding: '0',
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
  commitContainer:{
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#efefef'
  }
};

class Changes extends React.Component {
  render() {
    const { classes, files, onSelectFile } = this.props;
    console.log('files', files);
    return (
      <React.Fragment>
        <List component="nav" className={classes.list}>
          {files && files.length > 0 ? (
            files.map((fileItem) => (
              <Fragment key={fileItem.file}>
                <ListItem
                  className={classes.listItem}
                  onClick={() => onSelectFile(fileItem.file)}
                  button>
                  <Checkbox tabIndex={-1} disableRipple />
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
              <ListItemText primary="No files have changes." />
            </ListItem>
          )}
        </List>
        <form className={classes.commitContainer} noValidate autoComplete="off">
          <TextField
            id="outlined-with-placeholder"
            label="Commit message"
            placeholder="Write a message.."
            margin="normal"
            variant="outlined"
            fullWidth
            disabled={!(files && files.length > 0)}
          />
          <Button variant="contained" color="primary" fullWidth disabled={!(files && files.length > 0)}>
            Commit
          </Button>
        </form>
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
