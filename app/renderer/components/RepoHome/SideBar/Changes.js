import React from 'react';
import { List, ListItem, ListItemText, Checkbox, withStyles } from '@material-ui/core';

const styles = {
  listItem: {
    padding: '0',
  },
  listItemText: {
    padding: '0',
  },
};

class Changes extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <List component="nav">
          <ListItem className={classes.listItem} button>
            <Checkbox tabIndex={-1} disableRipple />
            <ListItemText
              className={classes.listItemText}
              primary="src/components..."
              title="src/components/mycomponent/app.js"
            />
          </ListItem>
        </List>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Changes);
