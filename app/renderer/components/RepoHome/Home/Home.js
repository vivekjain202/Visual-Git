import React from 'react'
import Add from '@material-ui/icons/Add'
import TvIcon from '@material-ui/icons/Tv'
import CloneIcon from '@material-ui/icons/FilterNone'
import { Button, withStyles } from '@material-ui/core'
import CreateRepoDialog from './CreateRepoDialog'
import CloneRepository from './CloneRepository'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { ipcRenderer } from 'electron'
import { CHANGE_REPOSITORY_BRANCHES, ADD_OTHER_REPO, CHANGE_REPOSITORY, CHANGE_BRANCH_COMMITS, CHANGE_BRANCH, SET_ALL_COMMITS, CURRENT_REPO_PATH } from '../../../constants/actions'
import { connect } from 'react-redux'
import { gitBranch, gitLog } from '../SelectionBar/renderer-menu-functions'
import SnackBar from '../SelectionBar/PositionedSnackbar'
const styles = {
    homeActionBlocks: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
        color: 'white',
        borderRight: '1px solid #424242',
        padding: '40px',
    },
    button: {
        color: 'white',
        borderColor: "white",
        '&:hover': {
            borderColor: 'rgb(44, 47, 55)',
            backgroundColor: 'rgba(255,255,255,.3)'
        }
    },
    homeView: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#2C2F37'
    },
    homeInnerView: {
        display: 'flex',
        flexDirection: 'row'
    }
}
const theme = createMuiTheme({
    palette: {
        primary: { main: '#000' },
        secondary: { main: '#424242' },
        color: { mainTextColor: 'white' }
    },
});
class Home extends React.Component {
    state = {
        isCreateNewRepositoryDialogOpen: false,
        isAddLocalRepositoryDialogOpen: false,
        isCloneRepositoryDialogOpen: false,
        isSnackBarOpen:false,
    }
    handleNewRepositoryDialogOpen = () => {
        this.setState({
            isCreateNewRepositoryDialogOpen: !this.state.isCreateNewRepositoryDialogOpen
        })
    }
    handleNewRepositoryDialogClose = () => {
        this.setState({
            isCreateNewRepositoryDialogOpen: false,
        })
    }
    handleLocalRepositoryDialogOpen = () => {
        this.setState({
            isAddLocalRepositoryDialogOpen: !this.state.isAddLocalRepositoryDialogOpen
        })
    }
    handleLocalRepositoryDialogClose = () => {
        this.setState({
            isAddLocalRepositoryDialogOpen: false,
        })
    }
    handleCloneRepositoryDialogOpen = () => {
        this.setState({
            isCloneRepositoryDialogOpen: !this.state.isCloneRepositoryDialogOpen
        })
    }
    handleCloneRepositoryDialogClose = () => {
        this.setState({
            isCloneRepositoryDialogOpen: false,
        })
    }
    handleSnackBarClose = () => {
        this.setState({
            isSnackBarOpen: false,
        })
    }
    homeDialogs = () => {
        if (this.state.isCreateNewRepositoryDialogOpen)
            return <CreateRepoDialog openStatus={this.state.isCreateNewRepositoryDialogOpen} close={this.handleNewRepositoryDialogClose}></CreateRepoDialog>
        else if (this.state.isCloneRepositoryDialogOpen)
            return <CloneRepository openStatus={this.state.isCloneRepositoryDialogOpen} close={this.handleCloneRepositoryDialogClose}></CloneRepository>
        else return null;
    }
    handleError = () => {
        this.setState({
            isSnackBarOpen: !this.state.isSnackBarOpen,
        })
    }
    componentDidMount() {
        ipcRenderer.on('git-init-appmenu', this.handleNewRepositoryDialogOpen)
        ipcRenderer.on('open-local-repo-appmenu', this.initiateLocalRepoDialog)
        ipcRenderer.on('clone-repo-appmenu', this.handleCloneRepositoryDialogOpen)
        ipcRenderer.on('git-new-branch-appmenu', () => this.handleError())
    }
    initiateLocalRepoDialog = async () => {
        const temp = ipcRenderer.sendSync('git-local-repo')
        const splitTemp = temp.path[0].split('/')
        this.props.updateCurrentRepoPath(temp.path[0])
        this.props.changeRepo(splitTemp[splitTemp.length - 1])
        this.props.setAllCommits(temp.all)
        const branches = await gitBranch(temp.path[0])
        this.props.changeBranches(branches.branches)
        const gitLogs = await gitLog(temp.path[0], 'master')
        this.props.changeBranch('master')
        this.props.changeBranchCommits(gitLogs)
        this.props.addToOtherRepos(temp.path[0])
    }
    
    render() {
        const { classes } = this.props;
        const contentToDisplay = this.homeDialogs()
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.homeView}>
                    <div style={{ color: 'white' }}>
                        <p>No Repositories Found</p>
                    </div>
                    <div className={classes.homeInnerView}>
                        <div className={classes.homeActionBlocks}>
                            <Add></Add>
                            <p>create a new project and publish</p>
                            <Button variant="outlined" href="#outlined-buttons" className={classes.button} onClick={this.handleNewRepositoryDialogOpen}>
                                Create New Repository
                        </Button>
                        </div>
                        <div>
                            <div className={classes.homeActionBlocks}>
                                <TvIcon></TvIcon>
                                <p>create a new project and publish</p>
                                <Button variant="outlined" href="#outlined-buttons" className={classes.button} onClick={this.initiateLocalRepoDialog}>
                                    Add a Local Repository
                            </Button>
                            </div>
                        </div>

                        <div style={{ borderRight: '0px' }} className={classes.homeActionBlocks}>
                            <CloneIcon></CloneIcon>
                            <p>clone an existing project to your computer</p>
                            <Button variant="outlined" href="#outlined-buttons" className={classes.button} onClick={this.handleCloneRepositoryDialogOpen}>
                                Clone a respository
                        </Button>
                        </div>
                    </div>
                    {contentToDisplay}
                    {!this.state.isSnackBarOpen ? null : <SnackBar message={{message:'No Repository Selected', type:'error'}} closeComponent={this.handleSnackBarClose}></SnackBar>}
                </div>
            </MuiThemeProvider>
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home))