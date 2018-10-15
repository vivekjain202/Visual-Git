import { combineReducers } from 'redux';
import commits from './commits';
import global from './global';
import CurrentRepoDialog from './CurrentRepoDialog';
import files from './files';

export default combineReducers({ commits, files, global, CurrentRepoDialog });
