import React, { Fragment } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Divider,
  withStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { COMMIT_SELECTED } from '../../../constants/actions';
import { ipcRenderer } from 'electron';
import moment from 'moment';

const styles = {
  listItem: {
    padding: '0',
    paddingLeft: '10px',
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


class History extends React.Component {
  constructor(props) {
    super(props);
    this.getDiffSummary = this.getDiffSummary.bind(this);
  }

  getDiffSummary(commit) {
    let filteredFileName = ipcRenderer
      .sendSync('git-diff-summary', [this.props.currentRepoPath, commit.hash])
      .split('\n')
      .map((data) => data.split('|')[0].trim());
    filteredFileName = filteredFileName.slice(1, filteredFileName.length - 1);
    filteredFileName = filteredFileName.filter(filename=> filename!='');
    console.log(filteredFileName);
    this.props.onSelectCommit(filteredFileName, commit);
  }
  componentDidMount(){
    const {latestBranchCommit, currentCommitHash, commits} = this.props
    if(currentCommitHash && currentCommitHash.length > 0){
      this.getDiffSummary(commits.find((item)=>item.hash === currentCommitHash))
    }
    else if(latestBranchCommit && latestBranchCommit.hash)
    {
      this.getDiffSummary(latestBranchCommit) 
    }
  }
  componentDidUpdate(prevProps){
    const {latestBranchCommit} = this.props
    if(latestBranchCommit !== prevProps.latestBranchCommit)
    {
      this.getDiffSummary(latestBranchCommit) 
    }
  }
  render() {
    const { classes, commits, currentCommitHash } = this.props;
    return (
      <Fragment>
        <List component="nav">
          {commits && commits.length > 0 ? (
            commits.map((commit) => (
              <Fragment key={commit.hash}>
                <ListItem
                  className={classes.listItem}
                  selected={currentCommitHash === commit.hash}
                  onClick={() => this.getDiffSummary(commit)}
                  button>
                  <ListItemIcon>
                    <SvgIcon viewBox="0 0 15 15">
                      <path d="M10.86 7c-.45-1.72-2-3-3.86-3-1.86 0-3.41 1.28-3.86 3H0v2h3.14c.45 1.72 2 3 3.86 3 1.86 0 3.41-1.28 3.86-3H14V7h-3.14zM7 10.2c-1.22 0-2.2-.98-2.2-2.2 0-1.22.98-2.2 2.2-2.2 1.22 0 2.2.98 2.2 2.2 0 1.22-.98 2.2-2.2 2.2z" />
                    </SvgIcon>
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      root: classes.listItemText,
                      primary: classes.listItemTextPrimary,
                      secondary: classes.listItemTextSecondary,
                    }}
                    primary={
                      commit.message.length > 30
                        ? commit.message.substring(0, 30) + '...'
                        : commit.message
                    }
                    secondary={`${moment(commit.date).fromNow()} by ${commit.author_name}`}
                    title={commit.message}
                  />
                </ListItem>
                <Divider />
              </Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No commits yet." />
            </ListItem>
          )}
        </List>
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    commits: state.global ? state.global.currentBranchCommits : [],
    currentRepoPath: state.global && state.global.currentRepoPath,
    files: state.diff && state.diff.files,
    currentCommitHash: state.diff && state.diff.currentCommitHash,
    latestBranchCommit: state.global && state.global.latestBranchCommit
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onSelectCommit: (files, commit) =>
      dispatch({ type: COMMIT_SELECTED, payload: { files, commit } }),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(History));
