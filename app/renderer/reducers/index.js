import { combineReducers } from 'redux';
import commits from './commits';
import global from './global';
import CurrentRepoDialog from './CurrentRepoDialog'

export default combineReducers({ commits, global, CurrentRepoDialog });
