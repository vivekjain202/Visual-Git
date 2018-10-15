import simpleGit from 'simple-git/promise';
import { dialog } from 'electron';
import { exec } from 'child_process';

export const showDialog = () => {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog({ properties: ['openDirectory'] }, (path) => {
      resolve(path);
    })
  })
};

export const gitInit = async (event) => {
  try {
    const selectedPath = await showDialog();
    if (selectedPath !== undefined) {
      simpleGit(selectedPath.toString()).init().then(data => {
        event.returnValue = data;
      }).catch(err => { return event.returnValue = err })
    }
    else {
      throw ('no path selected');
    }
  }
  catch (e) {
    event.returnValue = e;
  }
};

export const gitLocalRepo = async (event) => {
    console.log('gitLocalRepo called.//////////////////////////////////')
  try {
    const selectedPath = await showDialog();
    const temp =selectedPath[0].split('/')
    if (selectedPath !== undefined) {
      simpleGit(selectedPath.toString())
        .log()
        .then(data => {
          console.log(data, 'data');
          return event.returnValue = {name: temp[temp.length -1], data};
        }).catch(err => { console.log(err, 'error'); return event.returnValue = err; })
    }
    else {
      throw ('no path selected');
    }
  }
  catch (e) {
    event.returnValue = e;
  }
};

export const gitDeleteRepo = async (event) => {
  console.log('here in main');
  const selectedDirPath = await showDialog();
  console.log('selected path', selectedDirPath);
  if (selectedDirPath !== undefined) {
    exec('rm -rf .git ', { cwd: selectedDirPath.toString() }, (error, stdout, stderr) => {
      if (error) {
        throw error;
      }
      else {
        console.log(stdout);
        event.returnValue = stdout;
      }
    })
  }
  event.returnValue = 'from main';
};

export const gitClone = (event, arg) => {
  console.log(arg[0], arg[1]);
  if (arg[0] !== undefined && arg[1] !== '') {

    const gitUrl = arg[0].toString();
    const destination = arg[1].toString();
    try {
      simpleGit(destination)
        .clone(gitUrl)
        .then((data) => {
          return event.returnValue = 'error';
        })
        .catch(err => console.error(err));
    }
    catch (error) {
      console.log(error);
      event.returnValue = error;
    }
  }
  else {
    return event.returnValue = 'Select proper url and path';
  }
};

export const gitBranch = (event, path) => {
  if (path !== undefined && path !== '') {
    try {
      console.log(path);
      simpleGit(path).branch().then(branch => event.returnValue = branch);
    }
    catch (error) {
      event.returnValue = error;
    }
  }
};

export const gitNewBranch = (event, path, newBranch) => {
  if (path !== undefined && path !== '') {
    try {
      simpleGit(path)
        .checkoutLocalBranch(newBranch)
        .then(() => {
          simpleGit(path).branch().then(branches => event.returnValue = branches)
        })
        .catch(error => event.returnValue = error);
    }
    catch (error) {
      event.returnValue = error;
    }
  }
};