import { dialog } from 'electron';
import fs from 'fs';
import simpleGit from 'simple-git/promise';

export const openDialogue = () => {
 return new Promise((resolve, reject) => dialog.showOpenDialog({ properties:['openDirectory'] },(path) => {
  if(path !== undefined)
      resolve(path);
  reject('error');
}));
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

 export const gitDiff =  async function () {
  try {
    let filePath;
    try {
      filePath = await getFilePath();
    } catch(error) {
      return error;
    }
    const res = await simpleGit(filePath).diff();
    return res;
  } catch(error) {
    return error;
  }
 }

 export const gitDiffSummary =  async function () {
  try {
    let filePath;
    try {
      filePath = await getFilePath();
    } catch(error) {
      return error;
    }
    const res = await simpleGit(filePath).diffSummary();
    return res;
  } catch(error) {
    return error;
  }
 }

 export const gitInit = async (mainWindow)=> {
  let selectedFile;
  let log = '';
  let res = '';
  try{
    selectedFile = await openDialogue(mainWindow);
      try {
        await simpleGit(selectedFile[0]).init(0);
      } catch(error){
        log = error;
      }
      log = await gitLog();
      fs.writeFileSync(__dirname+"/.file-name",selectedFile[0]);
      return { repo: res, log };
  } catch(e) {
    return { repo: res, log };
  }
 }

 export const gitClone = (remote) => {
  return new Promise((resolve,reject) => {
    simpleGit('/home/dev/Desktop/temp')
  .clone(remote)
  .then(() => {  console.log('finished clone'); resolve('finished'); })
  .catch((err) => { reject(err); console.error('failed: ', err)})
  });
 }