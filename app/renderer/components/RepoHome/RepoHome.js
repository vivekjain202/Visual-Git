import React, { Fragment } from 'react';
import SelectionBar from './SelectionBar/SelectionBar';
import SideBar from './SideBar/SideBar';
import { Grid } from '@material-ui/core';
import Details from './Details/Details';
import NewBranchDialog from './NewBranch'
import { ipcRenderer } from 'electron'
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
  }
  handleBranchDialogClose = () => {
    this.setState({
      isNewBranchDialogOpen: false,
    })
  }
  handleBranchDialogOpen = () => {
    console.log('im called ////////////////////////////////////')
    this.setState({
      isNewBranchDialogOpen: !this.state.isNewBranchDialogOpen,
    })
  }
  componentDidMount() {
    ipcRenderer.on('git-new-branch-appmenu', () => this.handleBranchDialogOpen())
  }
  render() {
    const contentToDisplay = (this.state.isNewBranchDialogOpen) ? <NewBranchDialog openStatus={this.state.isNewBranchDialogOpen} close={this.handleBranchDialogClose}></NewBranchDialog> : null
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
export default RepoHome

