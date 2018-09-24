# drumApp
A Hybrid Mobile Web App built using the Cordova framework for use with the [BLE DrumPad](https://github.com/nrossetti/BLE_drumPad).

## Getting Started

These instructions help you build a copy of the current hybrid mobile app to use with my [BLE DrumPad](https://github.com/nrossetti/BLE_drumPad) project.

### Prerequisites

To build the mobile application you need to have Apache Cordova, which runs on Node.js enviroment and is available via NPM.

Apache Cordova can be found [here](https://cordova.apache.org/).
Cordova is Open Source and has fantastic documentation... so use it!

Additionally you need the [Bluetooth Low Energy (BLE) Central Plugin for Apache Cordova](https://github.com/don/cordova-plugin-ble-central) 

### Installing

The current hybrid mobile app can be built easily by creating a blank Cordova project, Adding the required plugins, and then copying over core app files in the root directory (.../www/) 

* Follow the instructions [Here](https://cordova.apache.org/docs/en/latest/guide/cli/index.html) to create a Cordova project.
* Navigate to your Cordova project root and install the BLE Central Plugin...
  ```
  $ cordova plugin add Cordova-plugin-ble-central
  ```
* Copy the HTML, JS, and CSS files to the WWW directory in your Cordova project

The application should be ready to build and test!

### Building

To build the project for android you must have Android Studio installed as well as the device or emulator you plan to target.
The [Cordova Documentation](https://cordova.apache.org/docs/en/latest/guide/cli/index.html) linked above contains all the necessary information regarding building for different platforms and using Cordova in general.

* Navigate to your project directory and add your desired platform(s) (android/ios/browser)
  ```
  $ cd projectFolder
  $ cordova platform add android
  ```
* Build all platforms or a specific one (remove '-android' to build for all configured platforms)
  ```
  $ cordova build -android 
  ```
* Then run your application on the device or with an emulator
  ```
  $ cordova run android
  $ cordova emulate android
  ```
  
If you encounter issues because of your build platform try using browser instead of android or ios as regular web apps do not require additional dependencies like their mobile counterparts.

### Testing 

If running the application on a USB connected device and using googles Chrome browser

You can inspect the live version of your application by entering the address ```chrome://inspect/``` in your chrome browser and selecting the instance of your app.
This grants access the JavaScript console as well as the DOM elements and other features great for testing!

## Authors

* **Nicholas Rossetti** - *Initial work* - [nrossetti](https://github.com/nrossetti)

See also the list of [contributors](https://github.com/nrossetti/drumApp/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
<!--
* Hat tip to anyone whose code was used
* Inspiration
* etc
--!>
