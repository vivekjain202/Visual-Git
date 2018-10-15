const { dialog } = require('electron').remote;
import { ipcRenderer } from 'electron';
import dialogs from 'dialogs';

export const gitInit = () => {
  console.log("test");
  const temp = ipcRenderer.sendSync('git-init');
  console.log(temp);
};

export const openLocalRepo = async () => {
  const temp = ipcRenderer.sendSync('git-local-repo');
  console.log(temp)
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