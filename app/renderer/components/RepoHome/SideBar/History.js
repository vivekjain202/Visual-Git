import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Icon, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { COMMIT_SELECTED } from '../../../constants/actions';
import { ipcRenderer } from 'electron';

const styles = {
  listItem: {
    padding: '0',
    paddingLeft: '10px',
  },
  listItemText: {
    padding: '0',
  },
};



class History extends React.Component {
  constructor(){
    super();
    this.getDiffSummary =this.getDiffSummary.bind(this);
  }

  getDiffSummary(hash){
    let filteredFileName = ipcRenderer.sendSync('git-diff-summary',[this.props.currentRepoPath,hash]).split('\n').map((data) => data.split('|')[0].trim());
    filteredFileName = filteredFileName.slice(0,filteredFileName.length - 2);
    this.props.onSelectCommit(filteredFileName);
  }
  render() {
    const { classes, commits } = this.props;
    return (
      <React.Fragment>
        <List component="nav">
          {commits && commits.length > 0 ? (
            commits.map((commit) => (
              <ListItem
                key={commit.hash}
                className={classes.listItem}
                onClick={() => this.getDiffSummary(commit.hash)}
                button>
                <ListItemIcon>
                  <Icon className="fa fa-gitter" />
                </ListItemIcon>
                <ListItemText
                  className={classes.listItemText}
                  primary={commit.message.length > 18 ? commit.message.substring(0,20)+"..." : commit.message}
                  secondary={`on ${new Date(commit.date).toDateString()} by ${commit.author_name}`}
                  title={commit.message}
                />
              </ListItem>
            ))
          ) : (
            <ListItem className={classes.listItem}>
              <ListItemText className={classes.listItemText} primary="No commits yet." />
            </ListItem>
          )}
        </List>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    commits: state.global ? state.global.currentBranchCommits : [],
    currentRepoPath : state.global.currentRepoPath,
    files : state.diff.files,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onSelectCommit: (files) => dispatch({ type: COMMIT_SELECTED, payload: files }),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(History));
