import React, {Fragment} from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Icon, withStyles,Divider} from '@material-ui/core';
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
  constructor(){
    super();
    this.getDiffSummary =this.getDiffSummary.bind(this);
  }

  getDiffSummary(hash){
    let filteredFileName = ipcRenderer.sendSync('git-diff-summary',[this.props.currentRepoPath,hash]).split('\n').map((data) => data.split('|')[0].trim());
    filteredFileName = filteredFileName.slice(0,filteredFileName.length - 1);
    this.props.onSelectCommit(filteredFileName,hash);
  }
  render() {
    const { classes, commits} = this.props;
    return (
      <React.Fragment>
        <List component="nav">
          {commits && commits.length > 0 ? (
            commits.map((commit) => (
              <Fragment key={commit.hash}>
              <ListItem
                className={classes.listItem}
                onClick={() => this.getDiffSummary(commit.hash)}
                button>
                <ListItemIcon>
                  <Icon className="fa fa-gitter" />
                </ListItemIcon>
                <ListItemText
                  classes={{
                    root: classes.listItemText,
                    primary: classes.listItemTextPrimary,
                    secondary: classes.listItemTextSecondary,
                  }}
                  primary={commit.message.length > 35 ? commit.message.substring(0,35)+"..." : commit.message}
                  secondary={`on ${new Date(commit.date).toDateString()} by ${commit.author_name}`}
                  title={commit.message}
                />
              </ListItem>
              <Divider></Divider>
              </Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No commits yet." />
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
    onSelectCommit: (files,hash) => dispatch({ type: COMMIT_SELECTED, payload: [files,hash] }),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(History));
