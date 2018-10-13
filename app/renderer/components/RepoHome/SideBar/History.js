import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Icon, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { COMMIT_SELECTED } from '../../../constants/actions';

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
  render() {
    const { classes, commits, onSelectCommit } = this.props;
    return (
      <React.Fragment>
        <List component="nav">
          {commits && commits.length > 0
            ? commits.map((commit) => (
                <ListItem
                  key={commit.hash}
                  className={classes.listItem}
                  onClick={onSelectCommit}
                  button>
                  <ListItemIcon>
                    <Icon className="fa fa-gitter" />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.listItemText}
                    primary={commit.message}
                    secondary={`on ${new Date(commit.date).toDateString()} by ${
                      commit.author_name
                    }`}
                    title={commit.message}
                  />
                </ListItem>
              ))
            : null}
        </List>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    commits: state.commits.commits,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onSelectCommit: (id) => dispatch({ type: COMMIT_SELECTED, payload: { commitId: id } }),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(History));
