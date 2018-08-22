import { app as ElectronApp, BrowserWindow } from 'electron';

let mainWindow: Electron.BrowserWindow;

ElectronApp.on('ready', () => {
	mainWindow = new BrowserWindow({ width: 536, height: 536, resizable: false, useContentSize: true, webPreferences: { devTools: false } });
	mainWindow.setMenu(null);
	mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

ElectronApp.on('window-all-closed', () => {
	ElectronApp.quit();
});
