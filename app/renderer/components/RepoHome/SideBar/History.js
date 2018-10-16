import React,{Fragment} from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Icon,Divider, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { COMMIT_SELECTED } from '../../../constants/actions';

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
  render() {
    const { classes, commits, onSelectCommit } = this.props;
    return (
      <React.Fragment>
        <List component="nav">
          {commits && commits.length > 0 ? (
            commits.map((commit) => (
              <Fragment key={commit.hash}>
              <ListItem
                className={classes.listItem}
                onClick={() => onSelectCommit(commit.hash)}
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
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onSelectCommit: (hash) => dispatch({ type: COMMIT_SELECTED, payload: { hash } }),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(History));
