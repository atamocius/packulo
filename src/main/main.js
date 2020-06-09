'use strict';

const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

main().catch(err => {
  console.log(err);
  process.exit(1);
});

async function main() {
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  await app.whenReady();

  // Add React devtools extension for development
  if (isDev) {
    await installReactDevTools();
  }

  await createWindow();
}

async function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  await win.loadURL(
    isDev
      ? 'http://localhost:1234'
      : `file://${path.join(__dirname, '../../dist/index.html')}`
  );

  // Don't show the app window until it is ready and loaded
  await new Promise(resolve => win.once('ready-to-show', resolve));

  win.show();

  // Open the DevTools automatically if developing
  if (isDev) {
    win.webContents.openDevTools();
  }

  return win;
}

async function installReactDevTools() {
  try {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
    } = require('electron-devtools-installer');

    const ext = await installExtension(REACT_DEVELOPER_TOOLS);
    console.log(`Added Extension:  ${ext.name}`);
  } catch (err) {
    console.log('An error occurred during extension installation: ', err);
  }
}
