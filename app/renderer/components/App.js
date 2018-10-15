import React from 'react';
import RepoHome from './RepoHome/RepoHome';
import { loadCSS } from 'fg-loadcss';
import { ipcRenderer } from 'electron';
import {
  gitInit,
  openLocalRepo,
  cloneRepo,
  renameRepo,
  deleteRepo,
  createNewBranch,
  switchBranch,
  deleteBranch,
  renameBranch,
} from '../agent';

class App extends React.Component {
  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );
    //assigning listeners to windown menus
    ipcRenderer.on('git-init-appmenu', gitInit);
    ipcRenderer.on('open-local-repo-appmenu', openLocalRepo);
    ipcRenderer.on('clone-repo-appmenu', cloneRepo);
    ipcRenderer.on('git-repo-rename-appmenu', renameRepo);
    ipcRenderer.on('git-repo-delete-appmenu', deleteRepo);
    ipcRenderer.on('git-new-branch-appmenu', createNewBranch);
    ipcRenderer.on('git-switch-branch-appmenu', switchBranch);
    ipcRenderer.on('git-delete-branch-appmenu', deleteBranch);
    ipcRenderer.on('git-rename-branch-appmenu', renameBranch);
    
  }
  render() {
    return (
      <React.Fragment>
        <RepoHome />
      </React.Fragment>
    );
  }
}

export default App;
