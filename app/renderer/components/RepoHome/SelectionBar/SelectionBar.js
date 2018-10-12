import React, { Component, Fragment } from 'react';
import { AppBar, Toolbar} from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {AppBarButton} from './CustomComponents'
import CurrentRepoDialog from './CurrentRepoDialog'


const theme = createMuiTheme({
  palette: {
    primary: { main: '#000' }, 
    secondary: { main: '#424242' },
    color: { mainTextColor: 'white'} 
  },
});

class SelectionBar extends Component {
  state = {
    isCurrentRepoOpen: false,
    isCurrentBranchOpen: false,
    isPushBranch: false,
  }
  handleClickOpenCurrentRepo=() => {
    this.setState({
      isCurrentRepoOpen: !this.state.isCurrentRepoOpen
    })
  }
  handleClickCloseCurrentRepo = () => {
    this.setState({
      isCurrentRepoOpen: false,
    })
  }
  displayModel(){
    if(this.state.isCurrentRepoOpen) 
      return <CurrentRepoDialog openStatus={this.state.isCurrentRepoOpen} close={this.handleClickCloseCurrentRepo}></CurrentRepoDialog>
    // else if(this.state.isCurrentBranchOpen) return <isCurrentBranchOpen></isCurrentBranchOpen>
    // else if(this.state.isPushBranch) return 
    else return null
  }
  render() {
    const ModelToDisplay = this.displayModel()
    return (
      <Fragment>
        <MuiThemeProvider theme={theme}>
          <AppBar position="static" color="primary">
            <Toolbar variant="dense">
              <AppBarButton color="inherit" onClick={this.handleClickOpenCurrentRepo}>Current Repository</AppBarButton>
              <AppBarButton color="inherit" onClick={this.handleClickOpenCurrentBranch}>Current Branch</AppBarButton>
              <AppBarButton  color="inherit" onClick={this.handleClickOpenPushBranch}>Push Branch</AppBarButton>
            </Toolbar>
          </AppBar>
          {ModelToDisplay}
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default SelectionBar;
