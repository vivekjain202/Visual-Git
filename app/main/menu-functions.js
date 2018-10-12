import { dialog } from 'electron';
import { exec } from 'child_process';

export const openDialogue = () => {
 return dialog.showOpenDialog({ properties:['openDirectory'] });
}

export const executeCmd = async (cmd) => {
 return new Promise((resolve, reject) => {
   exec(cmd, (err,stdout,stderr) => {
     if(err) {
       console.log(err);
       reject(err);
     } else if(stderr) {
       console.log(stderr);
       reject(stderr);
     } else {
       resolve(stdout);
     }
   })
 })
}