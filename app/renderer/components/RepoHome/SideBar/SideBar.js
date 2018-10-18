import React, { Fragment } from 'react';
import { Paper, Tabs, Tab, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Changes from './Changes';
import History from './History';
import { CHANGE_TO_HISTORY_VIEW, CHANGED_FILES_LOADED } from '../../../constants/actions';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';

const styles = (theme) => ({
  sidebar: {
    height: 'calc(100vh - 48px)',
  },
  childPage: {
    overflow: 'auto',
    height: `calc(100vh - 97px)`,
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
    backgroundColor: '#fff',
    padding: 0,
    minWidth: 100,
  },
  tabsIndicator: {
    backgroundColor: '#000',
  },
  tabRoot: {
    color: '#000',
    textTransform: 'initial',
    minWidth: 0,
    '&:hover': {
      backgroundColor: '#eee',
    },
    '&$tabSelected': {
      color: '#000',
      fontWeight: 'bold',
    },
    '&:focus': {
      color: '#000',
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
    this.props.toggleTabs(value);
  };
  render() {
    const { classes } = this.props;
    const { tabNumber } = this.state;
    if (this.props.currentRepoPath) {
      const changes = ipcRenderer.sendSync('get-changes', this.props.currentRepoPath);
      this.props.dispatchChanges(changes);
    }
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
          <Paper classes={{ root: classes.childPage }}>
            {tabNumber === 0 ? <Changes /> : <History />}
          </Paper>
        </Paper>
      </Fragment>
    );
  }
}
SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ currentRepoPath: state.global.currentRepoPath });

const mapDispatchToProps = (dispatch) => ({
  toggleTabs: (tabNumber) => dispatch({ type: CHANGE_TO_HISTORY_VIEW, payload: tabNumber === 1 }),
  dispatchChanges: (changedFiles) =>
    dispatch({ type: CHANGED_FILES_LOADED, payload: changedFiles }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SideBar));
