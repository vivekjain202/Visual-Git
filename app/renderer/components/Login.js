import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';
import dialogs from 'dialogs';
const { dialog } = require('electron').remote;

ipcRenderer.on('git-init-appmenu', () => {
  const temp = ipcRenderer.sendSync('git-init');
  console.log(temp)
})


ipcRenderer.on('open-local-repo-appmenu', async () => {
  const temp = ipcRenderer.sendSync('git-local-repo');
  console.log(temp)
})

ipcRenderer.on('clone-repo-appmenu', async () => {
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

})

ipcRenderer.on('git-repo-rename-appmenu', () => {
  const temp = ipcRenderer.sendSync('git-repo-rename');
  console.log(temp)
})

ipcRenderer.on('git-repo-delete-appmenu', () => {
  const temp = ipcRenderer.sendSync('git-repo-delete');
  console.log(temp)
})

ipcRenderer.on('git-new-branch-appmenu', () => {
  const temp = ipcRenderer.sendSync('git-new-branch');
  console.log(temp)
})

ipcRenderer.on('git-switch-branch-appmenu', () => {
  const temp = ipcRenderer.sendSync('git-switch-branch');
  console.log(temp)
})

ipcRenderer.on('git-delete-branch-appmenu', () => {
  const temp = ipcRenderer.sendSync('git-delete-branch');
  console.log(temp)
})

ipcRenderer.on('git-rename-branch-appmenu', () => {
  const temp = ipcRenderer.sendSync('git-rename-branch');
  console.log(temp)
})


export default class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
  };

  state = {
    username: '',
  };

  handleLogin = () => {
    // const temp =ipcRenderer.sendSync('send');
    // console.log(temp);
  };


  handleChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
      </div>
    );
  }
}
