import React, { Component } from 'react';
import path from 'path';
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';
import {gitInit, openLocalRepo, cloneRepo, deleteRepo, createNewBranch, switchBranch, deleteBranch, renameBranch} from './renderer-menu-functions.js';


ipcRenderer.on('git-init-appmenu', gitInit);
ipcRenderer.on('open-local-repo-appmenu',openLocalRepo);
ipcRenderer.on('clone-repo-appmenu',cloneRepo);
ipcRenderer.on('git-repo-delete-appmenu',deleteRepo);
ipcRenderer.on('git-new-branch-appmenu',() => createNewBranch(path.join(__dirname,'../../../../trello-todo-shashank')));
ipcRenderer.on('git-switch-branch-appmenu',() => switchBranch(path.join(__dirname,'../../../../trello-todo-shashank'),'temp'));
ipcRenderer.on('git-delete-branch-appmenu',() => deleteBranch(path.join(__dirname,'../../../../trello-todo-shashank'),'newName'));
ipcRenderer.on('git-rename-branch-appmenu',() => renameBranch(path.join(__dirname,'../../../../trello-todo-shashank'),'temp','newName'));


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
       <button onClick={gitInit}>Button</button>
     </div>
   );
 }
}