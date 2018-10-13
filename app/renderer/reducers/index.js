import { combineReducers } from 'redux';
import commits from './commits';
import branches from './branches';
import global from './global';
import CurrentRepoDialog from './CurrentRepoDialog'

export default combineReducers({ commits, branches, global, CurrentRepoDialog });
