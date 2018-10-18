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
import { CHANGED_FILE_SELECTED } from '../../../constants/actions';
import { ipcRenderer } from 'electron';

const styles = {
  list: {
    height: 'calc(100% - 172px)',
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
  commitContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#efefef',
    // position: 'fixed',
    bottom: 0,
    padding: 20,
  },
};

class Changes extends React.Component {
  constructor() {
    super();
    this.onFileClick = this.onFileClick.bind(this);
    this.onCommitButtonClick = this.onCommitButtonClick.bind(this)
  }

  onFileClick(file) {
    const diff = ipcRenderer.sendSync(
      'git-diff-perticular-file',
      this.props.currentRepoPath,
      null,
      file,
    );
    this.props.onSelectFile(diff);
  }
  onCommitButtonClick(){

  }
  render() {
    const { classes, files } = this.props;
    console.log('files', files);
    return (
      <React.Fragment>
        <List component="nav" className={classes.list}>
          {files && files.length > 0 ? (
            files.map((fileItem) => (
              <Fragment key={fileItem}>
                <ListItem
                  className={classes.listItem}
                  onClick={() => this.onFileClick(fileItem)}
                  button>
                  <Checkbox tabIndex={-1} disableRipple />
                  <ListItemText
                    classes={{
                      root: classes.listItemText,
                      primary: classes.listItemTextPrimary,
                      secondary: classes.listItemTextSecondary,
                    }}
                    primary={fileItem.length > 30 ? fileItem.substring(0, 30) + '...' : fileItem}
                    title={fileItem}
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={this.onCommitButtonClick}
            disabled={!(files && files.length > 0)}>
            Commit
          </Button>
        </form>
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
