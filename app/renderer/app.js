import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store/index';
import { ipcRenderer } from 'electron';
import path from 'path';

import {gitInit, cloneRepo, deleteRepo, deleteBranch, renameBranch} from '../renderer/components/RepoHome/SelectionBar/renderer-menu-functions.js';

ipcRenderer.on('git-init-appmenu', gitInit);
ipcRenderer.on('clone-repo-appmenu',cloneRepo);
ipcRenderer.on('git-repo-delete-appmenu',deleteRepo);
ipcRenderer.on('git-delete-branch-appmenu',() => deleteBranch(path.join(__dirname,'../../../../trello-todo-shashank'),'newName'));
ipcRenderer.on('git-rename-branch-appmenu',() => renameBranch(path.join(__dirname,'../../../../trello-todo-shashank'),'temp','newName'));



const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement,
);
