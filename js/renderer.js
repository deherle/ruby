// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.



// REMOVE THIS CODE for production.... don't want a user to refresh the app mistakenly

const {getCurrentWindow, globalShortcut} = require('electron').remote;

var reload = ()=>{
  getCurrentWindow().reload()
}

globalShortcut.register('F5', reload);
globalShortcut.register('CommandOrControl+R', reload);
// here is the fix bug #3778, if you know alternative ways, please write them
window.addEventListener('beforeunload', ()=>{
  globalShortcut.unregister('F5', reload);
  globalShortcut.unregister('CommandOrControl+R', reload);
})