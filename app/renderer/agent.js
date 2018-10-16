import {ipcRenderer} from 'electron'
import store from './store'
import { COMMITS_LOADED } from './constants/actions';

function changeBranch(branchname){
    console.log('branch changing called')
}


export const agent = {
    changeBranch
}