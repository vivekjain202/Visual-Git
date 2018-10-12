import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';

class History extends React.Component {
  render() {
    return (
      <React.Fragment>
        <List component="nav">
          <ListItem button>
            <ListItemIcon>
                <ThreeSixtyIcon></ThreeSixtyIcon>
            </ListItemIcon>
            <ListItemText primary="initial commit" />
          </ListItem>
        </List>
      </React.Fragment>
    );
  }
}

export default History;
