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
      simpleGit(selectedPath.toString()).init().then(() => {
        event.returnValue = selectedPath;
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
  try {
    const selectedPath = await showDialog();
    if (selectedPath !== undefined) {
      simpleGit(selectedPath.toString())
        .log()
        .then(data => {
          console.log(data, 'data');
          data['path'] = selectedPath;
          return event.returnValue = data;
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

export const gitNewBranch = (event, repo, newBranch) => {
  if (repo !== undefined && repo !== '') {
    try {
      simpleGit(repo)
        .checkoutLocalBranch(newBranch)
        .then(() => {
          simpleGit(repo).branch().then(branches => event.returnValue = branches)
        })
        .catch(error => event.returnValue = error);
    }
    catch (error) {
      event.returnValue = error;
    }
  }
};

export const gitCheckout = (event, repo, branch) => {
  if (repo !== undefined && repo !== '') {
    try {
      simpleGit(repo).checkout(branch)
        .then(() => {
          event.returnValue = 'Switched branch';
        })
        .catch(error => event.returnValue = error);
    }
    catch (error) {
      event.returnValue = error;
    }
  }
};
export const gitDeleteLocalBranch = (event, repo, branch) => {
  if (repo !== undefined && repo !== '') {
    try {
      simpleGit(repo).checkout('master').then(
        simpleGit(repo).deleteLocalBranch(branch)
          .then(() => {
            simpleGit(repo).branch().then(branches => event.returnValue = branches)
          })
      )
        .catch(error => event.returnValue = error);
    }
    catch (error) {
      event.returnValue = error;
    }
  }
};

export const gitRenameBranch = (event, repo, oldName, newName) => {
  if (repo !== undefined && repo !== '' && newName !== undefined && newName !== '') {
    try {
      exec(`git branch -m ${oldName} ${newName}`, { cwd: repo.toString() }, (error, stdout, stderr) => {
        if (error) {
          throw error;
        }
        else {
          console.log(stdout);
          event.returnValue = stdout;
        }
      })
    }
    catch (error) {
      event.returnValue = error;
    }
  }
};

export const gitLog = (event,repo,branch) => {
  try {
    console.log(repo,"gitLog")
    exec(`git log ${branch} --oneline`, { cwd: repo.toString() }, (error, stdout, stderr) => {
      if (error) {
        throw error;
      }
      else {
        event.returnValue = puts(stdout);
      }
    })
  }
  catch (error) {
    event.returnValue = error;
  }
}
//helper function

function puts(stdout) {
  return  stdout.split(/\n/).map(e=>e.split(' ')[0]);
}