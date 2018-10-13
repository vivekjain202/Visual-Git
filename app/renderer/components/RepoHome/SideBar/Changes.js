import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Icon } from '@material-ui/core';

class Changes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <List component="nav">
          <ListItem button>
            <ListItemIcon>
              <Icon className="fa fa-file-code" />
            </ListItemIcon>
            <ListItemText primary="app.js" />
            <ListItemText secondary="~/home/balaji/own/..." />
          </ListItem>
        </List>
      </React.Fragment>
    );
  }
}

export default Changes;
