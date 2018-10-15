import path from 'path';
import { app, crashReporter, BrowserWindow, Menu, ipcMain } from 'electron';
import { gitInit, gitLocalRepo, gitClone, gitNewBranch, gitBranch, gitDeleteRepo } from './menu-functions';

const isDevelopment = process.env.NODE_ENV === 'development';


let mainWindow = null;
let forceQuit = false;

ipcMain.on('git-init', (event) => gitInit(event) )

ipcMain.on('git-local-repo',(event) => gitLocalRepo(event))

ipcMain.on('git-clone',(event,arg)=> gitClone(event,arg))

ipcMain.on('git-new-branch',(event,path,newBranch) => gitNewBranch(event,path,newBranch))

ipcMain.on('git-branch',(event,path) => gitBranch(event,path));

ipcMain.on('git-repo-delete',(event) => gitDeleteRepo(event));

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload);
    } catch (e) {
      console.log(`Error installing ${name} extension: ${e.message}`);
    }
  }
};

crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: false,
});

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 640,
    minHeight: 480,
    show: false,
  });
  
  const template=[
    {
      label:'File',
      submenu:[
        {
          label:"New repository",
          accelerator:"CmdorCtrl + N",
          click: (menuItem,mainWindow)=>{
            mainWindow.webContents.send('git-init-appmenu');
          }
        },
        {
          label:"Open local repository",
          accelerator:"CmdorCtrl + O",
          click: (menuItem,mainWindow)=>{
            mainWindow.webContents.send('open-local-repo-appmenu');
          }
        },
        {
          label:"Clone repository",
          accelerator:"CmdorCtrl + C + L",
          click: (menuItem,mainWindow)=>{
            mainWindow.webContents.send('clone-repo-appmenu');
          }
        },
        {
          role:"quit",
        }
      ]
    },
    {
      label:"View",
      submenu:[
        {role:"zoomIn"},
        {role:"zoomOut"},
        {role:'reload'},
        {role:'toggleFullScreen'},
        {role: "toggleDevTools"}
      ]
    },
    {
      label:"Repository",
      submenu:[
        {
          label:"New repository",
          click: (menuItem,mainWindow)=>{
            mainWindow.webContents.send('git-init-appmenu');
          }
        },
        {
          label:"Rename repository",
          click: (menuItem,mainWindow)=>{
            mainWindow.webContents.send('git-repo-rename-appmenu');
          }
        },
        {
          label:"Delete repository",
          click: (menuItem,mainWindow)=>{
            mainWindow.webContents.send('git-repo-delete-appmenu');
          }
        },
      ]
    },
    {
      label:"Branch",
      submenu:[
        {
          label:"New branch",
          click: (menuItem,mainWindow)=>{
            mainWindow.webContents.send('git-new-branch-appmenu');
          }
        },
        {
          label:"Switch branch",
          click: (menuItem,mainWindow)=>{
            mainWindow.webContents.send('git-switch-branch-appmenu');
          }
        },
        {
          label:"Delete branch",
          click: (menuItem,mainWindow)=>{
            mainWindow.webContents.send('git-delete-branch-appmenu');
          }
        },
        {
          label:"Rename branch",
          click: (menuItem,mainWindow)=>{
            mainWindow.webContents.send('git-rename-branch-appmenu');
          }
        },
      ]
    },
    {
      label:"Help",
      submenu:[
        {
          label:"Documentation",
          accelerator:"CmdorCtrl + H",
          click: ()=>{
            const {shell} = require('electron');
            shell.openExternal('https://gitlab.com/mountblue/august-18-js/visual-git-using-electron/blob/master/README.md')
          }
        },
      ]
    }
  ];
// Attaching Menu
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);


  mainWindow.loadFile(path.resolve(path.join(__dirname, '../renderer/index.html')));
  
  // show window once on first load
  mainWindow.webContents.once('did-finish-load', () => {
    // mainWindow.webContents.openDevTools();
    mainWindow.show();
  });

  mainWindow.webContents.on('did-finish-load', () => {
    // Handle window logic properly on macOS:
    // 1. App should not terminate if window has been closed
    // 2. Click on icon in dock should re-open the window
    // 3. ⌘+Q should close the window and quit the app
    mainWindow.webContents.openDevTools();
   
    if (process.platform === 'darwin') {
      mainWindow.on('close', function(e) {
        if (!forceQuit) {
          e.preventDefault();
          mainWindow.hide();
        }
      });

      app.on('activate', () => {
        mainWindow.show();
      });

      app.on('before-quit', () => {
        forceQuit = true;
      });
    } else {
      mainWindow.on('closed', () => {
        mainWindow = null;
      });
    }
  });

  if (isDevelopment) {
    // auto-open dev tools
    // mainWindow.webContents.openDevTools();

    // add inspect element on right click menu
    mainWindow.webContents.on('context-menu', (e, props) => {
      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click() {
            mainWindow.inspectElement(props.x, props.y);
          },
        },
      ]).popup(mainWindow);
    });
  }
});

process.on('uncaughtException',function(exception){
  console.log(exception,"caught an exception in main process check this one out");
})