import React, { Component, Fragment } from 'react';
import { List, ListItem, ListItemText, Divider, SvgIcon, withStyles } from '@material-ui/core';
import { HISTORY_FILE_SELECTED } from '../../../constants/actions';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';

const styles = {
  root: {
    height: '100%',
    backgroundColor: 'white',
    borderTop: '1px solid #bbb',
    borderRadius: '0px',
    boxShadow: 'none',
    boxSizing: 'border-box',
    overflow: 'auto',
  },
  listItem: {
    padding: 0,
    paddingLeft: 10,
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
  listIcon: {
    paddingLeft: 10,
    paddingRight: 10,
    color: '#000055',
  },
};
class FilesView extends Component {
  constructor(props) {
    super(props);
    this.showDiff = this.showDiff.bind(this);
    this.state = { currentFile: props.files ? props.files[0] : '' };
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
    this.setState({ currentFile: file });
  }
  componentDidUpdate(prevProps) {
    const { files, onSelectFile } = this.props;
    if (this.state.currentFile === '' || files !== prevProps.files) {
      const file = files ? files[0] : '';
      if (file !== '') {
        this.showDiff(file);
      } else {
        onSelectFile('');
      }
    }
  }
  render() {
    const { classes, files } = this.props;
    const { currentFile } = this.state;
    console.log('files', files);
    return (
      <Fragment>
        <div color="primary" className={classes.root}>
          <List component="nav">
            {files && files.length > 0 ? (
              files.map((fileItem) => (
                <Fragment key={fileItem}>
                  <ListItem
                    className={classes.listItem}
                    selected={currentFile === fileItem}
                    onClick={() => this.showDiff(fileItem)}
                    button>
                    <ListItemText
                      classes={{
                        root: classes.listItemText,
                        primary: classes.listItemTextPrimary,
                        secondary: classes.listItemTextSecondary,
                      }}
                      primary={fileItem.length > 30 ? fileItem.substring(0, 30) + '...' : fileItem}
                      title={fileItem}
                    />
                    <SvgIcon classes={{ root: classes.listIcon }} viewBox="0 0 14 16">
                      <path d="M13 1H1c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 13H1V2h12v12zM4 8c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z">
                        <title>Modified</title>
                      </path>
                    </SvgIcon>
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
    onSelectFile: (diff) => dispatch({ type: HISTORY_FILE_SELECTED, payload: diff }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(FilesView));
