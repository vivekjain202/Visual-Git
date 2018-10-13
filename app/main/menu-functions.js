import { dialog } from 'electron';
import fs from 'fs';
import simpleGit from 'simple-git/promise';

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
    const res = await simpleGit(filePath).log();
    return res.all;
  } catch(error) {
    return error;
  }
 }

export const gitBranch =  async function () {
  try {
    let filePath;
    try {
      filePath = await getFilePath();
    } catch(error) {
      return error;
    }
    const res = await simpleGit(filePath).branchLocal();
    return res;
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
      await simpleGit(selectedFile[0]).init(0);
    } catch(error){
      log = error;
    }
    log = await gitLog();
    fs.writeFileSync(__dirname+"/.file-name",selectedFile[0]);
    return { repo: res, log };   
  }
  return { repo: res, log };
 }

 export const gitClone = () => {
  const remote = `https://github.com/theia-ide/dugite-extra.git`;
  return new Promise((resolve,reject) => {
    simpleGit('/home/dev/Desktop/temp')
  .clone(remote)
  .then(() => {  console.log('finished clone'); resolve('finished'); })
  .catch((err) => { reject(err); console.error('failed: ', err)})
  });
 }