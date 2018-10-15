import React from 'react';
import RepoHome from './RepoHome/RepoHome';
import { loadCSS } from 'fg-loadcss';
import { ipcRenderer } from 'electron';
import path from 'path'
import {
  gitInit,
  openLocalRepo,
  cloneRepo,
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
    ipcRenderer.on('open-local-repo-appmenu',openLocalRepo);
    ipcRenderer.on('clone-repo-appmenu',cloneRepo);
    ipcRenderer.on('git-repo-delete-appmenu',deleteRepo);
    ipcRenderer.on('git-new-branch-appmenu',() => createNewBranch(path.join(__dirname,'../../../')));
    ipcRenderer.on('git-switch-branch-appmenu',() => switchBranch(path.join(__dirname,'../../../'),'temp'));
    ipcRenderer.on('git-delete-branch-appmenu',() => deleteBranch(path.join(__dirname,'../../../'),'newName'));
    ipcRenderer.on('git-rename-branch-appmenu',() => renameBranch(path.join(__dirname,'../../../'),'temp','newName'));
    
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
