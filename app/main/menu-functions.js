import { dialog } from 'electron';
import fs from 'fs';
import { GitProcess, GitError, IGitResult } from 'dugite'

export const openDialogue = () => {
 return dialog.showOpenDialog({ properties:['openDirectory'] });
}

export const getFilePath = () => {
  return new Promise ((resolve, reject) => {
    fs.readFile(__dirname+"/.file-name", "utf8", (err,data) => {
      if(err) {
        reject(err);
      }
      resolve(data);
    });
  })
}

export const gitLog =  async function () {
  try {
    let filePath;
    try {
      filePath = await getFilePath();
    } catch(error) {
      return error;
    }
    const res = await GitProcess.exec(['log'],filePath);
    return res.stdout;
  } catch(error) {
    return error;
  }
 }

 export const gitInit = async ()=> {
  const selectedFile = openDialogue();
  let log = '';
  let res = '';
  if(selectedFile !== undefined) {
    try {
     res = await GitProcess.exec(['init'],selectedFile[0]);
    } catch(error){
      log = error;
    }
    log = await gitLog();
    fs.writeFileSync(__dirname+"/.file-name",selectedFile[0]);
    return { repo: res.stdout, log };   
  }
  return { repo: res, log };
 }
