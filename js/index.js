/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License") you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var UUID = {
SERVICE_UUID: "6E400001-B5A3-F393-E0A9-E50E24DCCA9E", // UART service UUID
CHARACTERISTIC_UUID_RX: "6E400003-B5A3-F393-E0A9-E50E24DCCA9E", // receive is from the phone's perspective swapped
CHARACTERISTIC_UUID_TX: "6E400002-B5A3-F393-E0A9-E50E24DCCA9E" // receive is from the phone's perspective swapped
} 
var app = {
    // Application Constructor
    initialize: function() {
        console.log("initializing App.");
        this.bindEvents();
    },
    
    bindEvents: function() {
        console.log("binding Events.");
        document.addEventListener('deviceready', this.onDeviceReady, false);
        refresh.addEventListener('touchstart', this.refreshDeviceList, false);
        //sendButton.addEventListener('click', this.sendData, false);
        disconnectButton.addEventListener('touchstart', this.disconnect, false);
        deviceList.addEventListener('touchstart', this.connect, false); // assume not scrolling
    },
    
    onDeviceReady: function() {
        console.log("Device Ready!");
        app.refreshDeviceList();
    },
    
    refreshDeviceList: function() {
        console.log("Refreshing Device List.");
        deviceList.innerHTML = ''; // empties the list
        ble.scan([UUID.SERVICE_UUID], 5, app.onDiscoverDevice, app.onError);
        // if Android can't find your device try scanning for all devices
        // ble.scan([], 5, app.onDiscoverDevice, app.onError);
    },    
    
    onDiscoverDevice: function(device) {
        console.log("Device Discovered!");
        console.log(device.name+" "+device.id+" " +device.rssi)
        var listItem = document.createElement('li'),
            html = '<b>' + device.name + '</b><br/>' +
                'RSSI: ' + device.rssi + '&nbsp;|&nbsp;' +
                device.id;

        listItem.dataset.deviceId = device.id;
        listItem.innerHTML = html;
        deviceList.appendChild(listItem);
    },

    connect: function(e) {
        console.log("Connnecting to device...");
        var deviceId = e.target.dataset.deviceId,

            onConnect = function(peripheral) {

                console.log("Peripheral is connected!")

                app.determineWriteType(peripheral);
                
                // subscribe for incoming data
                ble.startNotification(deviceId, UUID.SERVICE_UUID, UUID.CHARACTERISTIC_UUID_RX, app.onData, app.onError);
                sendButton.dataset.deviceId = deviceId;
                disconnectButton.dataset.deviceId = deviceId;
                resultDiv.innerHTML = "";

            };

        ble.connect(deviceId, onConnect, app.onError);

    },

    disconnect: function(event) {
        
        console.log("Peripheral is disconnected!")

        var deviceId = event.target.dataset.deviceId;
        ble.disconnect(deviceId, true, app.onError);

    },

    onError: function(reason) {

        alert("ERROR: " + JSON.stringify(reason)); // real apps should use notification.alert
        console.log("ERROR" + JSON.stringify(reason));
    }
};

function updateTable(tableID)
{
    var table = document.getElementById(tableID)
    
    var rowCount = table.rows.length   
    
    var markup = "<tr><td>"+rowCount+"</td><td>"+Math.floor(performance.now())+"</td><td>"+Math.floor(Math.random()*4096)+"</td></tr>"
    
    table.innerHTML = markup + table.innerHTML
};

function clearTable(tableID)
{
    var table = document.getElementById(tableID)
    
    while(table.rows.length) {
        table.deleteRow(1) // use 1 as to leave the header row
    }
    rowCount=0
};

app.initialize();