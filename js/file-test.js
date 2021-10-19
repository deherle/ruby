const ipc = require('electron').ipcRenderer;
const Store = require('electron-store');
const app = require('electron') ;
const nodeDiskInfo = require('node-disk-info');

window.onload = function() {

    var data = { stuff : "blah" };

    // The object is added to a Vue instance
    var vm = new Vue({
        el: '#vue-wrapper',
        data: data
    });

    const store = new Store({ name: "super-blah-blah", cwd: "E:\\data", encryptionKey: "$uper7urn3onkey8last" });

    store.set('unicorn', '🦄'); 

    /*try {
        const disks = nodeDiskInfo.getDiskInfoSync();
        //printResults('SYNC WAY', disks);
    } catch (e) {
        console.error(e);
    }*/

    // ipc.send('invokeAction');

};

function printResults(title, disks) {

    console.log(`============ ${title} ==============\n`);

    for (const disk of disks) {
        console.log('Filesystem:', disk.filesystem);
        console.log('Blocks:', disk.blocks);
        console.log('Used:', disk.used);
        console.log('Available:', disk.available);
        console.log('Capacity:', disk.capacity);
        console.log('Mounted:', disk.mounted);
        console.log('Mounted:', disk.description);
        console.log('Mounted:', disk.caption, '\n');
    }

}