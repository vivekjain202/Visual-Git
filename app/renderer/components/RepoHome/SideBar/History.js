import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Icon, withStyles } from '@material-ui/core';
import {connect} from 'react-redux'

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
    const { classes } = this.props;
    return (
      <React.Fragment>
        <List component="nav">
          <ListItem className={classes.listItem} button>
            <ListItemIcon>
              <Icon className="fa fa-gitter" />
            </ListItemIcon>
            <ListItemText
              className={classes.listItemText}
              primary="initial commit"
              secondary="Jan 9, 2014"
              title="src/components/mycomponent/app.js"
            />
          </ListItem>
        </List>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state){
  return{
    commits: state.commits.commits
  }
}
function mapDispatchToProps(dispatch){
  return{
    onSelectCommit:(id)=> dispatch({type:"COMMIT_SELECTED", payload: {commitId:id}})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(History));
