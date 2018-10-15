import { ipcRenderer } from 'electron';
const { dialog } = require('electron').remote;
import dialogs from 'dialogs';
import {store} from './store/index';
import { COMMITS_LOADED } from './constants/actions';

export const gitInit = () => {
  const temp = ipcRenderer.sendSync('git-init');
  return temp;
};

export const openLocalRepo = async () => {
  const repo = ipcRenderer.sendSync('git-local-repo');
  console.log(repo, 'in temp')
  store.dispatch({ type: COMMITS_LOADED, payload: { commits: repo.all } });
  const branch = ipcRenderer.sendSync('git-branch');
  console.log("current branch",branch)
};

export const cloneRepo = async () => {
  try {
    let gitUrl = '';
    const d = dialogs({ ok: 'ok', cancel: 'cancel' });
    d.prompt('Enter git url to be cloned', function(ok) {
      console.log(ok);
      gitUrl = ok;
      try {
        if (gitUrl != undefined) {
          const destination = dialog.showOpenDialog({ properties: ['openDirectory'] });
          if (destination !== undefined) {
            const temp = ipcRenderer.sendSync('git-clone', [gitUrl, destination]);
          } else {
            throw 'Select Proper Destinantion Path';
          }
        } else {
          throw 'Select Proper Git Url';
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const renameRepo = () => {
  const temp = ipcRenderer.sendSync('git-repo-rename');
  return temp;
};

export const deleteRepo = () => {
  const temp = ipcRenderer.sendSync('git-repo-delete');
  return temp;
};

export const createNewBranch = () => {
  const temp = ipcRenderer.sendSync('git-new-branch');
  return temp;
};

export const switchBranch = () => {
  const temp = ipcRenderer.sendSync('git-switch-branch');
  return temp;
};

export const deleteBranch = () => {
  const temp = ipcRenderer.sendSync('git-delete-branch');
  return temp;
};

export const renameBranch = () => {
  const temp = ipcRenderer.sendSync('git-rename-branch');
  return temp;
};

export const agent = {
  gitInit,
  openLocalRepo,
  cloneRepo,
  renameRepo,
  deleteRepo,
  createNewBranch,
  switchBranch,
  deleteBranch,
  renameBranch,
};
