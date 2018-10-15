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
  store.dispatch({ type: COMMITS_LOADED, payload: { commits: repo.all } })
};

export const cloneRepo = async () => {
  try {
    let gitUrl = '';
    const dialogBox = dialogs({ ok: 'ok', cancel: 'cancel' });
    dialogBox.prompt('Enter git url to be cloned', function (ok) {
      console.log(ok);
      gitUrl = ok;
      try {
        if (gitUrl != undefined) {
          const destination = dialog.showOpenDialog({ properties: ['openDirectory'] });
          if (destination !== undefined) { const temp = ipcRenderer.sendSync('git-clone', [gitUrl, destination]); }
          else {
            throw "Select Proper Destinantion Path";
          }
        }
        else {
          throw 'Select Proper Git Url';
        }
      }
      catch (error) {
        console.log(error);
        return error;
      }
    })
  }
  catch (error) {
    console.log(error);
    return error;
  }
}

export const deleteRepo = () => {
  const temp = ipcRenderer.sendSync('git-repo-delete');
  console.log(temp)
}

export const createNewBranch = (repo) => {
  try {
    let newBranch = '';
    const dialogBox = dialogs({ ok: 'ok', cancel: 'cancel' });
    dialogBox.prompt('Enter new Branch name', function (ok) {
      console.log(ok);
      newBranch = ok;
      try {
        if (newBranch != undefined) {
          const temp = ipcRenderer.sendSync('git-new-branch', repo, newBranch);
          console.log(temp)
        }
        else {
          throw 'Invalid name for branch';
        }
      }
      catch (error) {
        console.log(error);
        return error;
      }
    })
  }
  catch (error) {
    console.log(error);
    return error;
  }
}

export const gitBranch = (repo) => {
  const temp = ipcRenderer.sendSync('git-branch',repo);
  console.log(temp);
}

export const switchBranch = (repo, branch) => {
  const temp = ipcRenderer.sendSync('git-switch-branch', repo, branch);
  console.log(temp)
};

export const deleteBranch = (repo, branch) => {
  const temp = ipcRenderer.sendSync('git-delete-branch', repo, branch);
  console.log(temp)
};

export const renameBranch = (repo, oldName, newName) => {
  const temp = ipcRenderer.sendSync('git-rename-branch', repo, oldName, newName);
  console.log(temp)
};

export const agent = {
  gitInit,
  openLocalRepo,
  cloneRepo,
  deleteRepo,
  createNewBranch,
  switchBranch,
  deleteBranch,
  renameBranch,
};
