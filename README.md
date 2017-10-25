
# This app is for  tracking vehicles - Ambulance /Bus / Police Car using a mobile device running android/ ios/ windows/ firefoxos/ blackberry etc.

## Features:
```
1.Save vehicle configuration and send the same to server.
2.Send location and status data to server periodically.
3.Show the location and path followed by vehicle in map(osm).
4.Change status of vehicle(Empty/Occupied for ambulance).
5.Screen won't turn off if till out of power in map page.
```

## How to use this template

*This template does not work on its own*. 
To use this template, follow the instructions

### With the Ionic CLI:

Install npm first,then install ionic and cordova (to uninstall simply replace install with uninstall)

```bash
$ sudo npm install -g ionic cordova
```

Then, to install required modules, cd into `Driver-Application` and run:

```bash
$ npm install
```
Then, to run it, cd into `Driver-Application` and run:

```bash
$ ionic serve --lab
```
and to build for some os(Need to have Cordova 6 for firefoxos- uninstall cordovba 7 then use npm install -g cordova@6)

```bash
$ ionic cordova build android
$ ionic cordova build ios
$ ionic cordova build firefoxos
$ ionic cordova build windows
```
#### modules to be installed automatically!!

storage
geolocation
leaflet
fullscreen(for android)
android-permissions
splashscreen
cordova-plugin-request-location-accuracy
cordova-plugin-insomnia(for keeping screen awake)

### MUST MODIFY THE IP AND PORT NUMBER WITH YOUR APIS IN src/helper/globalvars.ts
### CURRENTLY WORKING MODULES - AMBULANCE
### Some sections have been commented out to make the project runnable w/o apis

files modified
```
home.ts
ambulanceconfig.html
ambulanceconfig.ts
ambulancemain.ts
```


