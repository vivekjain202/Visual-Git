import React, { Fragment } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Icon,
  Button,
  TextField,
  withStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';
import CommitDialog from './CommitDialog';
import { CHANGED_FILE_SELECTED, CHANGED_FILES_LOADED } from '../../../constants/actions';
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
  listIcon: {
    paddingLeft: 10,
    paddingRight: 10,
    color: '#000055',
  },
};

class Changes extends React.Component {
  constructor() {
    super();
    this.onFileClick = this.onFileClick.bind(this);
    this.onCommitButtonClick = this.onCommitButtonClick.bind(this);
    this.state = {
      commitMessage: '',
      showCommitDialog: false,
      commitResult: '',
    };
  }

  onFileClick(file) {
    const diff = ipcRenderer.sendSync('git-diff-particular-file', [
      this.props.currentRepoPath,
      null,
      file,
    ]);
    this.props.onSelectFile(diff, file);
  }
  onCommitButtonClick() {
    const { commitMessage } = this.state;
    if (commitMessage.length !== '') {
      const temp = ipcRenderer.sendSync(
        'git-commit',
        this.props.currentRepoPath,
        this.state.commitMessage,
      );
      this.setState({ showCommitDialog: true, commitResult: temp });
      console.log('commit done', temp);
      if (temp === 'Successfully committed') {
        const changes = ipcRenderer.sendSync('get-changes', this.props.currentRepoPath);
        this.props.dispatchChanges(changes);
      }
    }
  }
  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleCloseCommitDialog = (value) => {
    this.setState({ commitResult: value, showCommitDialog: false });
  };
  componentDidUpdate(prevProps) {
    console.log('currentfile', this.props.currentFile, prevProps.currentFile);
    if (this.props.currentFile !== prevProps.currentFile) {
      this.onFileClick(this.props.currentFile);
    }
  }
  render() {
    const { classes, files, currentFile } = this.props;
    console.log('files', files);
    if (!currentFile && currentFile === '' && files) {
      const file = this.props.files[0];
      this.onFileClick(file);
    } else {
      this.onFileClick(currentFile);
    }
    return (
      <React.Fragment>
        <List component="nav" className={classes.list}>
          {files && files.length > 0 ? (
            files.map((fileItem) => (
              <Fragment key={fileItem}>
                <ListItem
                  className={classes.listItem}
                  selected={fileItem === currentFile}
                  onClick={() => this.onFileClick(fileItem)}
                  button>
                  <Icon className="fa fa-file" classes={{ root: classes.listIcon }} />
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
            value={this.state.commitMessage}
            onChange={this.handleChange('commitMessage')}
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
        <CommitDialog
          classes={{
            paper: classes.paper,
          }}
          open={this.state.showCommitDialog}
          onClose={this.handleCloseCommitDialog}
          value={this.state.commitResult}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    files: state.global ? state.global.changedFiles : [],
    currentRepoPath: state.global.currentRepoPath,
    currentFile: state.diff.currentFile,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onSelectFile: (diff, currentFile) =>
      dispatch({ type: CHANGED_FILE_SELECTED, payload: { diff, currentFile } }),
    dispatchChanges: (changedFiles) =>
      dispatch({ type: CHANGED_FILES_LOADED, payload: changedFiles }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Changes));
