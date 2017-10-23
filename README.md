
## JUST USE "npm install" FROM PROJECT ROOT DIRECTORY AND RUN THE APPLICATION!!##
## MUST MODIFY THE IP AND PORT NUMBER WITH YOUR ONES IN src/helper/globalvars.ts
##CURRENTLY WORKING MODULES - AMBULANCE

/* modules to be installed automatically!!

storage
geolocation
leaflet
fullscreen(for android)
android-permissions
splashscreen
cordova-plugin-request-location-accuracy
cordova-plugin-insomnia(for keeping screen awake)


ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic/storage

ionic cordova plugin add cordova-plugin-geolocation
npm install --save @ionic-native/geolocation

npm install leaflet --save
npm install @types/leaflet --save

*/



## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myBlank blank
```

Then, to run it, cd into `myBlank` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.

