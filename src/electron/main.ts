import { app, BrowserWindow, Menu } from 'electron';
import { getIndexPath, getPreloadPath } from './pathResolver.js';

app.on("ready", () => {
    Menu.setApplicationMenu(null);
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath()
        }
    });

    mainWindow.loadFile(getIndexPath());
});