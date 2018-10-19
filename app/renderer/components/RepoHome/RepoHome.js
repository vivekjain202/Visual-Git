import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import SelectionBar from './SelectionBar/SelectionBar';
import SideBar from './SideBar/SideBar';
import { Grid } from '@material-ui/core';
import Details from './Details/Details';
import NewBranchDialog from './NewBranch';
import RenameBranchDialog from './RenameBranch';
import { ipcRenderer } from 'electron';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#000' },
    secondary: { main: '#424242' },
    color: { mainTextColor: 'white' },
  },
});
class RepoHome extends React.Component {
  state = {
    isNewBranchDialogOpen: false,
    isRenameBranchDialogOpen: false,
  }
  handleBranchDialogClose = () => {
    this.setState({
      isNewBranchDialogOpen: false,
    })
  }

  handleRenameBranchDialogClose = () => {
    this.setState({
      isRenameBranchDialogOpen: false,
    })
  }

  handleBranchDialogOpen = () => {
    console.log('im called ////////////////////////////////////')
    this.setState({
      isNewBranchDialogOpen: !this.state.isNewBranchDialogOpen,
    })
  }
  handleRenameBranch = () => {
    console.log(this.props.currentBranch);
    if(this.props.currentBranch !== '' && this.props.currentBranch !== 'master') {
      console.log('hello');
      this.setState({
        isRenameBranchDialogOpen: !this.state.isRenameBranchDialogOpen,
      })
    }
  } 
  componentDidMount() {
    ipcRenderer.on('git-new-branch-appmenu', () => this.handleBranchDialogOpen())
    ipcRenderer.on('git-rename-branch-appmenu',() => this.handleRenameBranch())
    console.log(this.props.branches);
  }
  render() {
    const contentToDisplay = ((this.state.isNewBranchDialogOpen) ? <NewBranchDialog openStatus={this.state.isNewBranchDialogOpen} close={this.handleBranchDialogClose}></NewBranchDialog> : null
    || (this.state.isRenameBranchDialogOpen) ? <RenameBranchDialog openStatus={this.state.isRenameBranchDialogOpen} close={this.handleBranchDialogClose}></RenameBranchDialog> : null )
    return (
      <Fragment>
        <MuiThemeProvider theme={theme}>
          <SelectionBar />
          <Grid container>
            <Grid item xs={3}>
              <SideBar />
            </Grid>
            <Grid item xs={9}>
              <Details />
            </Grid>
          </Grid>
          {contentToDisplay}
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
      currentBranch: state.global.currentBranch,
      branches: state.global.branches,
  }
}
const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoHome)
