import React, { Fragment } from 'react';
import { Paper, Tabs, Tab, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Changes from './Changes';
import History from './History';

const styles = (theme) => ({
  sidebar: {
    width: 250,
    height: 'calc(100vh - 48px)',
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
    backgroundColor: '#212121',
    padding: 0,
    minWidth: 100,
  },
  tabsIndicator: {
    backgroundColor: '#fff',
  },
  tabRoot: {
    color: '#fff',
    textTransform: 'initial',
    minWidth: 0,
    '&:hover': {
      backgroundColor: '#222',
    },
    '&$tabSelected': {
      color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      borderBottom: '3px solid #fff',
    },
    '&:focus': {
      color: '#fff',
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
});

class SideBar extends React.Component {
  state = {
    tabNumber: 0,
  };

  handleChange = (event, value) => {
    this.setState({ tabNumber: value });
  };
  render() {
    const { classes } = this.props;
    const { tabNumber } = this.state;
    return (
      <Fragment>
        <Paper color="primary" classes={{ root: classes.sidebar }}>
          <Tabs
            value={tabNumber}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
            classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
            fullWidth>
            <Tab
              label="Changes"
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            />
            <Tab
              label="History"
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            />
          </Tabs>
          {tabNumber === 0 ? <Changes /> : <History />}
        </Paper>
      </Fragment>
    );
  }
}
SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBar);
