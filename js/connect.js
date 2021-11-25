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
            connectStepIconIsHidden: true,
            connectText: 'Searching for your SmartVault',
            /*pinStepIsActive: false,
            pinStepIsDisabled: true,
            pinStepSpinnerIsActive: false,
            pinStepIsCompleted: false,
            pinStepIconIsHidden: false,
            pinText: 'Enter your PIN',*/
            authenticatedStepIsActive: false,
            authenticatedStepIsDisabled: true,
            authenticatedStepSpinnerIsActive: false,
            authenticatedStepIsCompleted: false,
            authenticatedStepIconIsHidden: false,
            readyText: 'Reading secure data',
            nextButtonIsDisabled: true,
            lowerStatusText1: 'The SmartVault app is looking for your vault...',
            lowerStatusText2: ''
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
            this.connectStepIconIsHidden = true;
            this.connectText = 'Searching for your SmartVault';
        },
        connectedEvent : function() {
            this.connectStepIsActive = false;
            this.connectStepIsCompleted = true;
            this.connectStepSpinnerIsActive = false;
            this.connectStepIconIsHidden = false;
            this.connectText = 'Found your SmartVault!';
            /*this.pinStepIsActive = true;
            this.pinStepIsDisabled = false;
            this.pinStepSpinnerIsActive = true;
            this.pinStepIsCompleted = false;
            this.pinStepIconIsHidden = true; */

            this.lookForUnlockedDevice();
        },
        authenticatedEvent : function() {
            this.connectStepIsActive = false;
            this.connectStepIsCompleted = true;
            this.connectStepSpinnerIsActive = false;
            this.connectStepIconIsHidden = false;
            /*this.pinStepIsActive = false;
            this.pinStepIsDisabled = false;
            this.pinStepSpinnerIsActive = false;
            this.pinStepIsCompleted = true;
            this.pinStepIconIsHidden = false;
            this.pinText = 'Unlocked your SmartVault';*/
            this.authenticatedStepIsActive = true;
            this.authenticatedStepIsDisabled = false;
            this.authenticatedStepSpinnerIsActive = true;
            this.authenticatedStepIsCompleted = false;
            this.authenticatedStepIconIsHidden = true;
            this.readyText = 'Reading your SmartVault';

            setTimeout( function() {
                EventBus.$emit('device-ready');
            }, 1000);

        },
        deviceReadyEvent : function() {
            this.authenticatedStepIsActive = false;
            this.authenticatedStepIsDisabled = false;
            this.authenticatedStepSpinnerIsActive = false;
            this.authenticatedStepIsCompleted = true;
            this.authenticatedStepIconIsHidden = false;
            this.readyText = 'Device is ready';
            gDeviceConectionStatus = 'Connected';
            this.nextButtonIsDisabled = false;
            this.lowerStatusText1 = 'Found your SmartVault! Your device is ready to use.';
            this.lowerStatusText2 = 'Click next, or navigate directly to a category in the menu to the left.';
        },
        deviceDisconnectedEvent : function() {
            
        },
        lookForUnlockedDevice : function() {

            nodeDiskInfo.getDiskInfo()
                .then(disks => {
                    
                    disks.forEach(function(disk) {
                        if(disk.filesystem === 'Removable Disk') {
                            var path = disk.mounted;
                            path = path + '\\' + gDeviceBlobFileName;
                            fs.readFile(path, 'utf8', (err,data) => {
                            if(err) {
                                console.log("Could not read file:" + err);
                            } else {
                                console.log(data);
                                if(data === '') {
                                    gVaultBlob = emptyBlob;
                                } else {
                                    gVaultBlob = JSON.parse(data);
                                }
                                gMountedDrive = disk.mounted;
                                EventBus.$emit('device-authenticated');
                            }
                        });
                    }
                });
                
                
            })
            .catch(reason => {
            console.error(reason);
            
        });

        },
        deviceSave : function() {
            var path = gMountedDrive;
            path = path + '\\' + gDeviceBlobFileName;
            fs.writeFile(path, JSON.stringify(gVaultBlob), 'utf8', (err) => {
                if(err) {
                    console.log(err);
                }
            });
        },
        Next : function() {
            gRouter.push('intro1');
        }
    },
    mounted : function() {

        if(gDeviceConectionStatus != 'Connected') {

            EventBus.$on('device-connecting', this.connectingEvent);
            EventBus.$on('device-authenticated', this.authenticatedEvent);
            EventBus.$on('device-connected', this.connectedEvent);
            EventBus.$on('device-ready', this.deviceReadyEvent);
            EventBus.$on('device-disconnected', this.deviceDisconnectedEvent);
            EventBus.$on('save-to-device', this.deviceSave);

            usbDetect.startMonitoring();

            //
            // Detect when device is plugged in after starting the app
            //
            //usbDetect.on('add:261:4660', function(device) {
            //    console.log(device);
            //    EventBus.$emit('device-connected');
            //});

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

        } else {
            this.connectStepIsActive = false;
            this.connectStepIsCompleted = true;
            this.connectStepSpinnerIsActive = false;
            this.connectStepIconIsHidden = false;
            this.connectText = 'Found your SmartVault!';
            this.authenticatedStepIsActive = false;
            this.authenticatedStepIsDisabled = false;
            this.authenticatedStepSpinnerIsActive = false;
            this.authenticatedStepIsCompleted = true;
            this.authenticatedStepIconIsHidden = false;
            this.readyText = 'Device is ready';
            this.lowerStatusText1 = 'Found your SmartVault! Your device is ready to use.';
            this.lowerStatusText2 = 'Click next, or navigate directly to a category in the menu to the left.';
            this.nextButtonIsDisabled = false;
        }

    },
    template: `
        <div>
        <div class="center aligned column" style="margin-top: 15em;">
            
            <div class="ui container">

                <div class="ui two top attached steps">

                    <div class="step" v-bind:class="{ active: connectStepIsActive, completed: connectStepIsCompleted }">
                        <i class="connect icon" v-bind:class="{ hidden: connectStepIconIsHidden }"></i>    
                        <div class="ui inline loader large" v-bind:class="{ active: connectStepSpinnerIsActive }"style="margin-right: 10px;"></div>
                        <div class="content">
                        <div class="title" style="font-size: 1.5em;">Connect</div>
                        <div class="description" style="font-size: 1.2em; margin-top: 0.5em;">{{connectText}}</div>
                        </div>
                    </div>
                    <!-- <div class="step" v-bind:class="{ active: pinStepIsActive, completed: pinStepIsCompleted, disabled: pinStepIsDisabled }">
                        <i class="lock icon" v-bind:class="{ hidden: pinStepIconIsHidden }"></i>
                        <div class="ui inline loader large" v-bind:class="{ active: pinStepSpinnerIsActive }" style="margin-right: 10px;"></div>
                        <div class="content">
                        <div class="title" style="font-size: 1.5em;">Unlock</div>
                        <div class="description" style="font-size: 1.2em; margin-top: 0.5em;">{{pinText}}</div>
                        </div>
                    </div> -->
                    <div class="step" v-bind:class="{ active: authenticatedStepIsActive, completed: authenticatedStepIsCompleted, disabled: authenticatedStepIsDisabled }">
                        <i class="bolt icon" v-bind:class="{ hidden: authenticatedStepIconIsHidden }"></i>
                        <div class="ui inline loader large" v-bind:class="{ active: authenticatedStepSpinnerIsActive }" style="margin-right: 10px;"></div>
                        <div class="content">
                        <div class="title" style="font-size: 1.5em;">Access</div>
                        <div class="description" style="font-size: 1.2em; margin-top: 0.5em;">{{readyText}}</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

            <div style="margin-top: 5em;" class="left aligned column">
            <h2>{{lowerStatusText1}}</h2>
            <h3>{{lowerStatusText2}}</h3>
            </div>

            <div class="row center aligned column" style="margin-top: 8em;">
                <div class="column four wide"></div>
                <div class="column four wide">
                    <a href="#" class="ui huge blue right labeled icon button" v-bind:class="{ disabled: nextButtonIsDisabled }" @click="Next();">
                        <i class="right arrow icon"></i>
                        Next
                    </a>
                </div>
            </div>

        </div>

    `
});
