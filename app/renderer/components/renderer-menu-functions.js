const { dialog } = require('electron').remote;
import { ipcRenderer } from 'electron';
import dialogs from 'dialogs';

export const gitInit = ()=>{
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
   let d = dialogs({ ok: 'ok', cancel: 'cancel' });
   d.prompt('Enter git url to be cloned', function (ok) {
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

export const renameRepo = () => {
 const temp = ipcRenderer.sendSync('git-repo-rename');
 console.log(temp)
}

export const deleteRepo = () => {
 const temp = ipcRenderer.sendSync('git-repo-delete');
 console.log(temp)
}

export const createNewBranch =  () => {
 const temp = ipcRenderer.sendSync('git-new-branch');
 console.log(temp)
};

export const switchBranch = () => {
 const temp = ipcRenderer.sendSync('git-switch-branch');
 console.log(temp)
};

export const deleteBranch = () => {
 const temp = ipcRenderer.sendSync('git-delete-branch');
 console.log(temp)
};

export const renameBranch =  () => {
 const temp = ipcRenderer.sendSync('git-rename-branch');
 console.log(temp)
};