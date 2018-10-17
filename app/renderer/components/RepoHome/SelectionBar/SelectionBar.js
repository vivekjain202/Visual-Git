import React, { Component, Fragment } from 'react';
import { AppBar, Toolbar, SvgIcon } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AppBarButton } from './CustomComponents'
import CurrentRepoDialog from './CurrentRepoDialog'
import CurrentBranchDialog from './CurrentBranchDialog'
import PublishBranchDialog from './PublishBranchDialog'
import TvIcon from '@material-ui/icons/Tv'
import CloudUpload from '@material-ui/icons/CloudUpload'
import { connect } from 'react-redux'
import { CHANGE_REPOSITORY_BRANCHES, ADD_OTHER_REPO, CHANGE_REPOSITORY, CHANGE_BRANCH_COMMITS, CHANGE_BRANCH, SET_ALL_COMMITS, CURRENT_REPO_PATH } from '../../../constants/actions'
import { ipcRenderer } from 'electron';
import { gitBranch, gitLog } from './renderer-menu-functions'
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
    currentBranchName: this.props.branchName,
    isPublishBranchDialogOpen: false,
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
  handleClickOpenPublishDialog = () => {
    this.setState({
      isPublishBranchDialogOpen: !this.state.isCurrentBranchOpen
    })
  }
  handleClickClosePublishDialog = () => {
    this.setState({
      isPublishBranchDialogOpen: false,
    })
  }
  componentDidMount() {
    ipcRenderer.on('open-local-repo-appmenu', async () => {
      const temp = ipcRenderer.sendSync('git-local-repo');
      const splitTemp = temp.path[0].split('/')
      this.props.updateCurrentRepoPath(temp.path[0])
      this.props.changeRepo(splitTemp[splitTemp.length - 1])
      this.props.setAllCommits(temp.all)
      const branches = await gitBranch(temp.path[0])
      console.log(branches.branches, 'from componentDidMount()/////////////////////////')
      this.props.changeBranches(branches.branches)
      const gitLogs = await gitLog(temp.path[0], 'master')
      this.props.changeBranch('master')
      this.props.changeBranchCommits(gitLogs);
      this.props.addToOtherRepos(temp.path[0])
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.branchName !== this.props.branchName || prevProps.repoName !== this.props.repoName) {
      this.setState({
        currentRepoName: this.props.repoName,
        currentBranchName: this.props.branchName
      })
    }
  }
  displayModel() {
    const message = this.state.currentBranchName ? "" : "No repository selected"
    const obj = {
      message: message,
      type: 'error'
    }
    if (this.state.isCurrentRepoOpen)
      return <CurrentRepoDialog openStatus={this.state.isCurrentRepoOpen} close={this.handleClickCloseCurrentRepo}></CurrentRepoDialog>
    else if (this.state.isCurrentBranchOpen)
      return <CurrentBranchDialog openStatus={this.state.isCurrentBranchOpen} close={this.handleClickCloseCurrentBranch} message={obj}></CurrentBranchDialog>
    else if (this.state.isPublishBranchDialogOpen)
      return <PublishBranchDialog openStatus={this.state.isPublishBranchDialogOpen} close={this.handleClickClosePublishDialog} message={obj}></PublishBranchDialog>
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
                <SvgIcon viewBox="0 0 10 16" style={buttonStyle}>
                  <path d="M10 5c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v.3c-.02.52-.23.98-.63 1.38-.4.4-.86.61-1.38.63-.83.02-1.48.16-2 .45V4.72a1.993 1.993 0 0 0-1-3.72C.88 1 0 1.89 0 3a2 2 0 0 0 1 1.72v6.56c-.59.35-1 .99-1 1.72 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-.53-.2-1-.53-1.36.09-.06.48-.41.59-.47.25-.11.56-.17.94-.17 1.05-.05 1.95-.45 2.75-1.25S8.95 7.77 9 6.73h-.02C9.59 6.37 10 5.73 10 5zM2 1.8c.66 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm0 12.41c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm6-8c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path>
                </SvgIcon>
                Current Branch&nbsp;
                  <span style={{ color: 'white' }}>{this.state.currentBranchName}</span>
              </AppBarButton>
              <AppBarButton color="inherit" onClick={this.handleClickOpenPublishDialog}>
                <CloudUpload style={buttonStyle} />
                <span style={{ color: 'white' }}>Publish {this.state.currentBranchName ? this.state.currentBranchName : "repository"}</span>
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
const mapDispatchToProps = dispatch => {
  return {
    changeRepo: (repoName) => dispatch({ type: CHANGE_REPOSITORY, payload: repoName }),
    changeBranches: (branches) => dispatch({ type: CHANGE_REPOSITORY_BRANCHES, payload: branches }),
    changeBranchCommits: (commits) => dispatch({ type: CHANGE_BRANCH_COMMITS, payload: commits }),
    setAllCommits: (allCommits) => dispatch({ type: SET_ALL_COMMITS, payload: allCommits }),
    updateCurrentRepoPath: (path) => dispatch({ type: CURRENT_REPO_PATH, payload: path }),
    changeBranch: (branchName) => dispatch({ type: CHANGE_BRANCH, payload: branchName }),
    addToOtherRepos: (pathToRepo) => dispatch({ type: ADD_OTHER_REPO, payload: pathToRepo })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectionBar);
//, position: 'absolute', left:'70px', bottom:'0',paddingTop:'3px'