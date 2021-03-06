import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store/index';
import { ipcRenderer } from 'electron';

import { deleteRepo } from '../renderer/components/RepoHome/SelectionBar/renderer-menu-functions.js';

// ipcRenderer.on('git-init-appmenu', gitInit);
ipcRenderer.on('git-repo-delete-appmenu',deleteRepo);

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement,
);
