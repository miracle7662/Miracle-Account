const path = require("path");
const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");
const { spawn } = require("child_process");

let backendProcess;

function startBackend() {
  const isDev = !app.isPackaged;

  const backendPath = isDev
    ? path.join(__dirname, "backend", "server.js")
    : path.join(process.resourcesPath, "backend", "server.js");

   // Pass userData path to backend for uploads
  const env = { ...process.env };
  if (!isDev) {
    env.ELECTRON_USER_DATA_PATH = app.getPath("userData");
  }

  backendProcess = spawn('node', [backendPath], {
    cwd: path.dirname(backendPath),
    stdio: "inherit",
    windowsHide: true,
    env: env,
  });

  backendProcess.on("close", (code) => {
    console.log(`Backend exited with code ${code}`);
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1300,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    win.loadURL("http://localhost:5173");
  } else {
    const indexPath = path.join(__dirname, "dist", "index.html");
    win.loadFile(indexPath);
  }
}

app.whenReady().then(() => {
  startBackend();
  createWindow();
  Menu.setApplicationMenu(null);

  // IPC handlers
  ipcMain.handle('show-save-dialog', async (event, options) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    const result = await dialog.showSaveDialog(win, options);
    return result;
  });
});

// Clear auth data on app close (before quit)
app.on("before-quit", () => {
  // Clear localStorage and sessionStorage to logout user
  const { session } = require("electron");
  session.defaultSession.clearStorageData({
    storages: ["localStorage", "sessionStorage"],
  });
});

app.on("window-all-closed", () => {
  if (backendProcess) backendProcess.kill();
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
