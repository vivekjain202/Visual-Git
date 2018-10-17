import React, {Fragment} from 'react';
import { List,
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
    height: "calc(100% - 172px)",
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
    padding:20
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

  // render() {
  //   const { classes, files } = this.props;
  //   console.log('files', files);
  //   return (
  //     <React.Fragment>
  //       <List component="nav">
  //         {files && files.length > 0 ? (
  //           files.map((fileItem) => (
  //             <ListItem
  //               key={fileItem.file}
  //               className={classes.listItem}
  //               onClick={() => this.onFileClick(fileItem.file)}
  //               button>
  //               <Checkbox tabIndex={-1} disableRipple />
  //               <ListItemText
  //                 className={classes.listItemText}
  //                 primary={
  //                   fileItem.file.length > 18
  //                     ? fileItem.file.substring(0, 20) + '...'
  //                     : fileItem.file
  //                 }
  //                 title={fileItem.file}
  //               />
  //             </ListItem>
  //           ))
  //         ) : (
  //           <ListItem className={classes.listItem}>
  //             <ListItemText className={classes.listItemText} primary="No files have changes." />
  //           </ListItem>
  //         )}
  //       </List>
  //     </React.Fragment>
  //   );
  // }
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
