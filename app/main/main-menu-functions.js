import simpleGit from 'simple-git/promise';
import { dialog } from 'electron';
import { exec } from 'child_process';
import fs from 'fs';

export const showDialog = () => {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog({ properties: ['openDirectory'] }, (path) => {
      if (path)
        resolve(path);
      else
        reject('No path selected');
    })
  })
};

  export const gitInit = async (event,path) => {
    try {
      if(!path){
        const selectedPath = await showDialog();
        if (selectedPath !== undefined) {
          simpleGit(selectedPath.toString()).init().then(() => {
            fs.writeFile(`${selectedPath.toString()}/README.md`,'',(err) => { event.returnValue = err})
            simpleGit(selectedPath).add(['.']).then(()=>{
              simpleGit(selectedPath).commit('Initial Commit').then(()=> {
                gitLocalRepo(event,selectedPath);
              })
            })
          }).catch(err => { return event.returnValue = err })
        }
        else {
          throw ('no path selected');
        }
      }
      else {
        simpleGit(path.toString()).init().then(() => {
          fs.writeFile(`${path.toString()}/README.md`,'',(err) => { event.returnValue = err})
          simpleGit(path).add(['.']).then(()=>{
            simpleGit(path).commit('Initial Commit').then(()=> {
              gitLocalRepo(event,path);
            })
          })
        }).catch(err => { return event.returnValue = err })
      }
    }
    catch (e) {
      event.returnValue = e;
    }
   };

export const gitLocalRepo = async (event, path) => {
  try {
    if (path !== undefined && path !== '') {
      simpleGit(path.toString())
        .log(['--all'])
        .then(data => {
          simpleGit(path.toString())
            .getRemotes(['--verbose'])
            .then(remotes => {
              data['path'] = path;
              data['remotes'] = remotes;
              console.log(data, 'data');
              event.returnValue = data;
            }).catch(err => { console.log(err, 'error'); return event.returnValue = err; })
        })
    }
    else if (path == undefined) {
      const selectedPath = await showDialog();
      if (selectedPath !== undefined) {
        simpleGit(selectedPath.toString())
          .log(['--all'])
          .then(data => {
            simpleGit(selectedPath.toString())
              .getRemotes(true)
              .then(remotes => {
                data['path'] = selectedPath;
                data['remotes'] = remotes;
                console.log(remotes, 'remotes');
                return event.returnValue = data;
              })
          }).catch(err => { console.log(err, 'error'); return event.returnValue = err; })
      }
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
    exec('rm -rf .git ', { cwd: selectedDirPath.toString() }, (error, stdout) => {
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
        .then(() => {
          return event.returnValue = 'true';
        })
        .catch(err => console.error(err));
    }
    catch (error) {
      console.log(error);
      event.returnValue = error;
    }
  }
  else {
    return event.returnValue = 'false';
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
      exec(`git branch -m ${oldName} ${newName}`, { cwd: repo.toString() }, (error, stdout) => {
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

export const gitLog = (event, repo, branch) => {
  try {
    simpleGit(repo.toString())
      .log([branch])
      .then(commits => event.returnValue = commits)
      .catch(error => event.returnValue = error);
  }
  catch (error) {
    event.returnValue = error;
  }
}

export const gitDiff = (event, repoPath, hash) => {
  try {
    if (hash.length === 0 && hash.length !== undefined) {
      simpleGit(repoPath).diff()
        .then(diff => {
          console.log(diff);
          event.returnValue = diff;
        })
        .catch(error => event.returnValue = error);
    }
    else if (hash.length !== undefined) {
      simpleGit(repoPath).diff([hash])
        .then(diff => {
          console.log(diff);
          event.returnValue = diff;
        })
        .catch(error => event.returnValue = error);
    }
  }
  catch (error) {
    event.returnValue = error;
  }
}

export const gitDiffStat = (event, repoPath, hash) => {
  try {
    simpleGit(repoPath)
      .show(['--pretty=oneline', '--color', '--name-only', '--no-notes', '--diff-filter=AM',hash])
      .then(data => {
        event.returnValue = data;
      })
      .catch(error => event.returnValue = error);
  }
  catch (error) {
    event.returnValue = error;
  }
}

export const gitParticularFileDiff = (event, cwd, hash, fileName) => {
  try {
    if (hash == null) {
      console.log(cwd, hash, fileName);
      simpleGit(cwd)
        .diff(['--color', fileName])
        .then(data => { console.log(data); event.returnValue = data })
        .catch(error => event.returnValue = error)
    }
    else {
      simpleGit(cwd)
        .show(['--color', hash, fileName])
        .then(data => event.returnValue = data)
        .catch(error => event.returnValue = error);
    }
  }
  catch (error) {
    event.returnValue = error;
  }
}

export const getChanges = (event, repoPath) => {
  try {
    if (repoPath) {
      simpleGit(repoPath)
        .diff(['--name-only'])
        .then((changedFiles) => {
          event.returnValue = changedFiles.split('\n').filter(fileName => fileName !== '');
        })
        .catch(error => event.returnValue = error);
    }
  }
  catch (error) {
    event.returnValue = error;
  }
}

export const gitCommit = (event, repoPath, message) => {
  try {
    if (message) {
      simpleGit(repoPath)
      .add(['.'])
      .then(()=>{
        simpleGit(repoPath)
        .commit(message)
        .then(() => {
          event.returnValue = 'Successfully committed';
        })
        .catch(error => event.returnValue = error);
      })
      .catch(error => event.returnValue = error);
    } else {
      event.returnValue = 'Invalid Message';
    }
  } catch (error) {
    event.returnValue = error;
  }
}


export const gitPush = (event, repoPath, remote, branch) => {
  try {
    if (repoPath && remote && branch) {
      simpleGit(repoPath)
        .push(remote, branch)
        .then(() => {
          event.returnValue = 'Successfully Published';
        })
        .catch(error => event.returnValue = error);
    }
    else {
      event.returnValue = 'Invalid Arguements to Push';
    }
  }
  catch (error) {
    event.returnValue = error;
  }
}
