import path from 'path';
import { app, crashReporter, BrowserWindow, Menu } from 'electron';

const isDevelopment = process.env.NODE_ENV === 'development';

let mainWindow = null;
let forceQuit = false;

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

  mainWindow.loadFile(path.resolve(path.join(__dirname, '../renderer/index.html')));

  // show window once on first load
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.show();
  });

  mainWindow.webContents.on('did-finish-load', () => {
    // Handle window logic properly on macOS:
    // 1. App should not terminate if window has been closed
    // 2. Click on icon in dock should re-open the window
    // 3. ⌘+Q should close the window and quit the app
    const template=[
      {
        label:'File',
        submenu:[
          {
            label:"New repository",
            accelerator:"CmdorCtrl + N",
            click: ()=>{
              console.log('git init');
            },
          },
          {
            label:"New local repository",
            accelerator:"CmdorCtrl + O",
            click: ()=>{
              console.log('git init');
            },
          },
          {
            label:"Clone repository",
            accelerator:"CmdorCtrl + C + L",
            click: function () {
              console.log('Clone repo clicked');
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
            click: ()=>{
              console.log('git init');
            },
          },
          {
            label:"Rename repository",
            click: function () {
              console.log('Rename clicked');
              }
          },
          {
            label:"Delete repository",
            click: function () {
              console.log('Delete repo clicked');
              }
          },
        ]
      },
      {
        label:"Branch",
        submenu:[
          {
            label:"New branch",
            click: function () {
              console.log('Create new branch clicked');
              }
          },
          {
            label:"Switch branch",
            click: function () {
              console.log('Switch branch clicked');
              }
          },
          {
            label:"Delete branch",
            click: function () {
              console.log('Delete branch clicked');
              }
          },
          {
            label:"Rename branch",
            click: function () {
              console.log('Rename branch clicked');
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
            click: function () {
              console.log('Documentation me clicked');
              }
          },
        ]
      }
    ];
 // Attaching Menu
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
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
    mainWindow.webContents.openDevTools();

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
