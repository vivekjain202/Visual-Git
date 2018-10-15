import path from 'path';
import { app, crashReporter, BrowserWindow, Menu, ipcMain, dialog } from 'electron';
import simpleGit from 'simple-git/promise';
const isDevelopment = process.env.NODE_ENV === 'development';

let mainWindow = null;
let forceQuit = false;

ipcMain.on('git-init', (event) => {
  try {
    const selectedPath = dialog.showOpenDialog({ properties: ['openDirectory'] });
    if (selectedPath !== undefined) {
      simpleGit(selectedPath.toString())
        .init()
        .then((data) => {
          event.returnValue = data;
        })
        .catch((err) => {
          return (event.returnValue = err);
        });
    } else {
      throw 'no path selected';
    }
  } catch (e) {
    event.returnValue = e;
  }
});

ipcMain.on('git-local-repo', (event) => {
  try {
    const selectedPath = dialog.showOpenDialog({ properties: ['openDirectory'] });
    if (selectedPath !== undefined) {
      simpleGit(selectedPath.toString())
        .log()
        .then((data) => {
          console.log(data, 'data');
          return (event.returnValue = data);
        })
        .catch((err) => {
          console.log(err, 'error');
          return (event.returnValue = err);
        });
    } else {
      throw 'no path selected';
    }
  } catch (e) {
    event.returnValue = e;
  }
});

ipcMain.on('git-clone', (event, arg) => {
  console.log(arg[0], arg[1]);
  if (arg[0] !== undefined && arg[1] !== '') {
    const gitUrl = arg[0].toString();
    const destination = arg[1].toString();
    try {
      simpleGit(destination)
        .clone(gitUrl)
        .then((data) => {
          return (event.returnValue = 'error');
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.log(error);
      event.returnValue = error;
    }
  } else {
    return (event.returnValue = 'Select proper url and path');
  }
});

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
  const iconPath = path.join(__dirname, '../icon/visualGit.png');
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 640,
    minHeight: 480,
    show: false,
    center: true,
    icon: iconPath,
  });

  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New repository',
          accelerator: 'CmdorCtrl + N',
          click: (menuItem, mainWindow) => {
            mainWindow.webContents.send('git-init-appmenu');
          },
        },
        {
          label: 'Open local repository',
          accelerator: 'CmdorCtrl + O',
          click: (menuItem, mainWindow) => {
            mainWindow.webContents.send('open-local-repo-appmenu');
          },
        },
        {
          label: 'Clone repository',
          accelerator: 'CmdorCtrl + C + L',
          click: (menuItem, mainWindow) => {
            mainWindow.webContents.send('clone-repo-appmenu');
          },
        },
        {
          role: 'quit',
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { role: 'reload' },
        { role: 'toggleFullScreen' },
        { role: 'toggleDevTools' },
      ],
    },
    {
      label: 'Repository',
      submenu: [
        {
          label: 'New repository',
          click: (menuItem, mainWindow) => {
            mainWindow.webContents.send('git-init-appmenu');
          },
        },
        {
          label: 'Rename repository',
          click: (menuItem, mainWindow) => {
            mainWindow.webContents.send('git-repo-rename-appmenu');
          },
        },
        {
          label: 'Delete repository',
          click: (menuItem, mainWindow) => {
            mainWindow.webContents.send('git-repo-delete-appmenu');
          },
        },
      ],
    },
    {
      label: 'Branch',
      submenu: [
        {
          label: 'New branch',
          click: (menuItem, mainWindow) => {
            mainWindow.webContents.send('git-new-branch-appmenu');
          },
        },
        {
          label: 'Switch branch',
          click: (menuItem, mainWindow) => {
            mainWindow.webContents.send('git-switch-branch-appmenu');
          },
        },
        {
          label: 'Delete branch',
          click: (menuItem, mainWindow) => {
            mainWindow.webContents.send('git-delete-branch-appmenu');
          },
        },
        {
          label: 'Rename branch',
          click: (menuItem, mainWindow) => {
            mainWindow.webContents.send('git-rename-branch-appmenu');
          },
        },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Documentation',
          accelerator: 'CmdorCtrl + H',
          click: () => {
            const { shell } = require('electron');
            shell.openExternal(
              'https://gitlab.com/mountblue/august-18-js/visual-git-using-electron/blob/master/README.md',
            );
          },
        },
      ],
    },
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

process.on('uncaughtException', function(exception) {
  console.log(exception, 'caught an exception in main process check this one out');
});
