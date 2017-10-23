import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import {HttpClientModule} from '@angular/common/http';
import { HomePage } from '../pages/home/home';
import {AmbulanceconfigPage} from '../pages/ambulanceconfig/ambulanceconfig';
import {AmbulancemainPage} from '../pages/ambulancemain/ambulancemain';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { Insomnia } from '@ionic-native/insomnia';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AmbulanceconfigPage,
    AmbulancemainPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AmbulanceconfigPage,
    AmbulancemainPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    LocationAccuracy,
    AndroidFullScreen,
    Insomnia,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    
  ]
})
export class AppModule {}
