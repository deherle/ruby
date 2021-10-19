const nodeDiskInfo = require('node-disk-info');
const usbDetect = require('usb-detection'); 
const fs = require('fs');
const { clearInterval } = require('timers');

var connectComponent = Vue.component('connect-device', {
    data: function () {
        return { 
            connectStepIsActive: true,
            connectStepSpinnerIsActive: true,
            connectStepIsCompleted: false,
            connectStepIconIsVisible: false,
            connectText: 'Searching for your SmartVault',
            pinStepIsActive: false,
            pinStepIsDisabled: true,
            pinStepSpinnerIsActive: false,
            pinStepIsCompleted: false,
            pinStepIconIsVisible: false,
            pinText: 'Enter your PIN',
            authenticatedStepIsActive: false,
            authenticatedStepIsDisabled: true,
            authenticatedStepSpinnerIsActive: false,
            authenticatedStepIsCompleted: false,
            authenticatedStepIconIsVisible: false,
            readyText: 'Reading secure data'
            }
    },
    watch : {
        
    },
    methods : {
        printResults : function(title, disks) {

            console.log(`============ ${title} ==============\n`);
        
            for (const disk of disks) {
                console.log('Filesystem:', disk.filesystem);
                console.log('Blocks:', disk.blocks);
                console.log('Used:', disk.used);
                console.log('Available:', disk.available);
                console.log('Capacity:', disk.capacity);
                console.log('Mounted:', disk.mounted, '\n');
            }
        
        },
        connectingEvent : function() {
            this.connectStepIsActive = true;
            this.connectStepSpinnerIsActive = true;
            this.connectStepIsCompleted = false;
            this.onnectStepIconIsVisible = false;
            this.connectText = 'Searching for your SmartVault';
        },
        connectedEvent : function() {
            this.connectStepIsActive = false;
            this.connectStepIsCompleted = true;
            this.connectStepSpinnerIsActive = false;
            this.connectStepIconIsVisible = true;
            this.connectText = 'Found your SmartVault!';
            this.pinStepIsActive = true;
            this.pinStepIsDisabled = false;
            this.pinStepSpinnerIsActive = true;
            this.pinStepIsCompleted = false;
            this.pinStepIconIsVisible = true;

            this.lookForUnlockedDevice();
        },
        authenticatedEvent : function() {
            this.connectStepIsActive = false;
            this.connectStepIsCompleted = true;
            this.connectStepSpinnerIsActive = false;
            this.connectStepIconIsVisible = true;
            this.pinStepIsActive = false;
            this.pinStepIsDisabled = false;
            this.pinStepSpinnerIsActive = false;
            this.pinStepIsCompleted = true;
            this.pinText = 'Unlocked your SmartVault';
            this.authenticatedStepIsActive = true;
            this.authenticatedStepIsDisabled = false;
            this.authenticatedStepSpinnerIsActive = true;
            this.authenticatedStepIsCompleted = false;
            this.readyText = 'Reading your SmartVault';

            setTimeout( function() {
                EventBus.$emit('device-ready');
            }, 3000);

        },
        deviceReadyEvent : function() {
            this.authenticatedStepIsActive = true;
            this.authenticatedStepIsDisabled = false;
            this.authenticatedStepSpinnerIsActive = false;
            this.authenticatedStepIsCompleted = true;
            this.readyText = 'Device is ready';
        },
        deviceDisconnectedEvent : function() {
            
        },
        lookForUnlockedDevice : function() {
            deviceCheckIntervalHandler = window.setInterval( function() {

                nodeDiskInfo.getDiskInfo()
                .then(disks => {
                    
                    for(const disk of disks) {
                        if(disk.filesystem === 'Removable Disk') {
                            var path = disk.mounted;
                            path = path + '\\' + 'source-enc.b64.bin';
                            fs.readFile(path, (err,data) => {
                            if(err) {
                                console.log("Could not read file:" + err);
                            } else {
                                window.clearInterval(deviceCheckIntervalHandler);
                                EventBus.$emit('device-authenticated');
                            }
                        });
                    }
                }
                
                
            })
            .catch(reason => {
            console.error(reason);
            
        });

            }, 3000);
        }
    },
    mounted : function() {

        EventBus.$on('device-connecting', this.connectingEvent);
        EventBus.$on('device-authenticated', this.authenticatedEvent);
        EventBus.$on('device-connected', this.connectedEvent);
        EventBus.$on('device-ready', this.deviceReadyEvent);
        EventBus.$on('device-disconnected', this.deviceDisconnectedEvent);

        usbDetect.startMonitoring();

        //
        // Detect when device is plugged in after starting the app
        //
        usbDetect.on('add:261:4660', function(device) {
            console.log(device);
            EventBus.$emit('device-connected');
        });

        //
        // Detect when device is removed
        //
        usbDetect.on('remove:261:4660', function(device) {
            console.log(device);
            EventBus.$emit('device-disconnected');
        });

        //
        // See if we can find the device on app load
        //
        usbDetect.find(261, 4660, function(err, devices) { 
            console.log('find', devices, err);
            for(const device of devices) {
                if(device) {
                    EventBus.$emit('device-connected');
                }
            }
        });



        /*
        nodeDiskInfo.getDiskInfo()
            .then(disks => {
                this.printResults('ASYNC WAY', disks);    
        })
            .catch(reason => {
            console.error(reason);
        }); */

    },
    template: `
        <div class="center aligned column" style="margin-top: 15em;">
            
            <div class="ui container">

                <div class="ui three top attached steps">

                    <div class="step" v-bind:class="{ active: connectStepIsActive, completed: connectStepIsCompleted }">
                        <i class="connect icon" v-bind:class="{ hidden: connectStepIconIsVisible }"></i>    
                        <div class="ui inline loader large" v-bind:class="{ active: connectStepSpinnerIsActive }"style="margin-right: 10px;"></div>
                        <div class="content">
                        <div class="title" style="font-size: 1.5em;">Connect</div>
                        <div class="description" style="font-size: 1.2em; margin-top: 0.5em;">{{connectText}}</div>
                        </div>
                    </div>
                    <div class="step" v-bind:class="{ active: pinStepIsActive, completed: pinStepIsCompleted, disabled: pinStepIsDisabled }">
                        <i class="lock icon" v-bind:class="{ hidden: pinStepIconIsVisible }"></i>
                        <div class="ui inline loader large" v-bind:class="{ active: pinStepSpinnerIsActive }" style="margin-right: 10px;"></div>
                        <div class="content">
                        <div class="title" style="font-size: 1.5em;">Unlock</div>
                        <div class="description" style="font-size: 1.2em; margin-top: 0.5em;">{{pinText}}</div>
                        </div>
                    </div>
                    <div class="step" v-bind:class="{ active: authenticatedStepIsActive, completed: authenticatedStepIsCompleted, disabled: authenticatedStepIsDisabled }">
                        <i class="bolt icon" v-bind:class="{ hidden: authenticatedStepIconIsVisible }"></i>
                        <div class="ui inline loader large" v-bind:class="{ active: authenticatedStepSpinnerIsActive }" style="margin-right: 10px;"></div>
                        <div class="content">
                        <div class="title" style="font-size: 1.5em;">Access</div>
                        <div class="description" style="font-size: 1.2em; margin-top: 0.5em;">{{readyText}}</div>
                        </div>
                    </div>
                </div>

                <div></div>

            </div>

        </div>
    `
});
