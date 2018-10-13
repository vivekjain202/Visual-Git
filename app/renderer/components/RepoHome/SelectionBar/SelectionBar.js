import React, { Component, Fragment } from 'react';
import { AppBar, Toolbar, Icon } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AppBarButton } from './CustomComponents'
import CurrentRepoDialog from './CurrentRepoDialog'
import CurrentBranchDialog from './CurrentBranchDialog'
import TvIcon from '@material-ui/icons/Tv'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import {connect} from 'react-redux'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#000' },
    secondary: { main: '#424242' },
    color: { mainTextColor: 'white' }
  },
});
const buttonStyle = {
  paddingRight: 10, 
  color: 'white'
}
class SelectionBar extends Component {
  state = {
    isCurrentRepoOpen: false,
    isCurrentBranchOpen: false,
    isPushBranch: false,
    currentRepoName: this.props.repoName,
    currentBranchName: this.props.branchName
  }
  handleClickOpenCurrentRepo = () => {
    this.setState({
      isCurrentRepoOpen: !this.state.isCurrentRepoOpen
    })
  }
  handleClickCloseCurrentRepo = () => {
    this.setState({
      isCurrentRepoOpen: false,
    })
  }
  handleClickOpenCurrentBranch = () => {
    this.setState({
      isCurrentBranchOpen: !this.state.isCurrentBranchOpen
    })
  }
  handleClickCloseCurrentBranch = () => {
    this.setState({
      isCurrentBranchOpen: false,
    })
  }
  componentDidMount(){
   this.setState({})
  }
  displayModel() {
    if (this.state.isCurrentRepoOpen)
      return <CurrentRepoDialog openStatus={this.state.isCurrentRepoOpen} close={this.handleClickCloseCurrentRepo}></CurrentRepoDialog>
    else if(this.state.isCurrentBranchOpen) 
      return <CurrentBranchDialog openStatus={this.state.isCurrentBranchOpen} close={this.handleClickCloseCurrentBranch}></CurrentBranchDialog>
    else return null;
  }
  render() {
    const ModelToDisplay = this.displayModel();
    return (
      <Fragment>
        <MuiThemeProvider theme={theme}>
          <AppBar position="static" color="primary">
            <Toolbar variant="dense" disableGutters={true}>
              <AppBarButton color="inherit" onClick={this.handleClickOpenCurrentRepo}>
                <TvIcon style={buttonStyle} />
                Current Repository&nbsp;
                <span style={{ color: 'white' }}>{this.state.currentRepoName}</span>
              </AppBarButton>
              <AppBarButton color="inherit" onClick={this.handleClickOpenCurrentBranch}>
                <Icon style={buttonStyle} className="fa fa-code-branch" />
                Current Branch&nbsp;
                  <span style={{ color: 'white' }}>{this.state.currentBranchName}</span>
              </AppBarButton>
              <AppBarButton color="inherit" onClick={this.handleClickOpenPushBranch} primary="hello" secondary="world">
                <ArrowUpward style={buttonStyle} />
                Publish this repository
              </AppBarButton>
            </Toolbar>
          </AppBar>
          {ModelToDisplay}
        </MuiThemeProvider>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
      repoName: state.global.currentRepo,
      branchName: state.global.currentBranch,
  }
}

export default connect(mapStateToProps)(SelectionBar);
//, position: 'absolute', left:'70px', bottom:'0',paddingTop:'3px'