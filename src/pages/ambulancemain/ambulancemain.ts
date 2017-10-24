import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import L from "leaflet";
import * as GlobalVars from './../../helper/globalvars';
import {AmbulanceSeverCallObject } from './../../helper/AmbulanceServerCallObject';
import {GPSEvent } from './../../helper/GpsEvent';
import { Storage } from '@ionic/storage';
import {AmbulanceConfig } from './../../helper/AmbulanceConfigObject';
import {HttpClient } from '@angular/common/http';
import {HttpHeaders } from '@angular/common/http';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { Insomnia } from '@ionic-native/insomnia';

//import * as osm from './../../../node_modules/osm';
/**
 * Generated class for the AmbulancemainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ambulancemain',
  templateUrl: 'ambulancemain.html',
})
export class AmbulancemainPage {
  //private OpenLayers;
  private watch;
  
  map: L.Map;
  center: L.PointTuple;
  private lat:number=0;
  private lon:number=0;
  private marker=null;
  private gpsEvent:GPSEvent;
  private regNo:string=null;
  private ambulanceConfig:AmbulanceConfig;
  private isSetCenter:boolean=false;
  private intervalObj;
  private path;
  private occupiedButtonDanger:boolean=false;
  private crowdStatus:string = "E";
  private  polyline=null;
  private polylinePoints = [];
  private polylineOptions = {
    color: 'blue',
    weight: 4,
    opacity: 0.45
  };
  
  private ambulanceServerCallObject:AmbulanceSeverCallObject;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation:Geolocation,private storage:Storage,private httpClient:HttpClient,
          private locationAccuracy:LocationAccuracy,private platform:Platform,
            private androidFullScreen:AndroidFullScreen,private insomnia: Insomnia) {
              this.center = [22.9868,87.8550]; //WB
              
           

            if (this.platform.is('cordova')) {
              this.androidFullScreen.isImmersiveModeSupported()
              .then(() => this.androidFullScreen.immersiveMode())
              .catch((error: any) => console.log(error));
              this.locationAccuracy.canRequest().then((canRequest: boolean) => {
                if(canRequest) {
                  // the accuracy option will be ignored by iOS
                  this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                    () => console.log('Request successful'),
                    error => console.log('Error requesting location permissions', error)
                  );
                }
              
              });
            }
      
      this.insomnia.keepAwake()
      .then(
        () => console.log('success'),
        () => console.log('error')
      );
    
  } 
   
    
  ionViewDidLoad() {
    //setup leaflet map
    this.initMap();
    
    this.map.setMaxZoom(18);
    this.map.setMinZoom(10);
    
    //this.sendLocationData();
  }
  
  ionViewDidEnter(){
    

    this.watch = this.geolocation.watchPosition();
    this.watch.subscribe(pos => {
      //console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      if(this.lat != pos.coords.latitude || this.lon != pos.coords.longitude){ 
        this.lat=pos.coords.latitude;
        this.lon=pos.coords.longitude;
        
      }
      this.manageDrawnPath();
      this.center=[this.lat,this.lon];
      if(!this.isSetCenter){
        this.map.setView(this.center,this.map.getZoom());
        this.isSetCenter=true;
         
      }

      if(this.marker!=null)
        this.marker.removeFrom(this.map);
      this.marker=L.marker(this.center)
      this.marker.addTo(this.map);
     
      this.marker.setLatLng(this.center);      
    });
    //new L.Polyline(polylinePoints, polylineOptions);
    /*UNCOMMENT THIS WHEN U HAVE UR API ENDPOINTS */
    //this.sendLocationData();
  }
  manageDrawnPath(){
    if(this.polyline!=null)
      this.map.removeLayer(this.polyline);
    this.polylinePoints.push(L.latLng(this.lat,this.lon));
    this.polyline = new L.Polyline(this.polylinePoints, this.polylineOptions);

    this.map.addLayer(this.polyline);
  }
  sendLocationData(){
    
    
    this.storage.get(GlobalVars.vehicle_config_key_ambulance).then(result=>{
      this.ambulanceConfig =JSON.parse(result);
      this.gpsEvent = new GPSEvent(this.ambulanceConfig.vehicleNo,"","0",this.lat,this.lon,0,0);
      console.log('vehicle no',this.ambulanceConfig.vehicleNo);
      this.ambulanceServerCallObject = new AmbulanceSeverCallObject("351898080889456",
      this.crowdStatus,
      GlobalVars.data_source,
      GlobalVars.vehicle_type_ambulance,
      this.ambulanceConfig.vehicleNo,
      this.gpsEvent,
      0);
      this.intervalObj = setInterval(()=>this.periodicDataPush(),GlobalVars.vehicle_call_interval_ambulance);
    }).catch(err=>{
      console.log(err);
      this.navCtrl.pop();
   });
  }
  periodicDataPush(){
    console.log('periodicDataPush');
    
    this.gpsEvent.latitude = this.lat;
    this.gpsEvent.longitude = this.lon;
    this.gpsEvent.timestamp = ""+new Date().getTime();
    this.ambulanceServerCallObject.gpsEvent =this.gpsEvent ;
    this.ambulanceServerCallObject.crowdStatus = this.crowdStatus;
    
    console.log('ambulanceServerCallObject json'+ JSON.stringify(this.ambulanceServerCallObject));
    
    if(this.lat!=0 || this.lon!=0){
      this.httpClient.post(GlobalVars.END_POINT_SEND_AMBULANCE_DATA, this.ambulanceServerCallObject, {
        headers: new HttpHeaders().set("Content-type", "application/json"),
      })
      .subscribe( data => {
        console.log('location data sent');
        },
        // Errors will call this callback instead:
        err => {
          console.log(err);
          console.log('could not send location data!');
          
        }
      );
    }
  } 
  ionViewDidLeave(){
    clearInterval(this.intervalObj);
    this.crowdStatus = "E";
    this.occupiedButtonDanger = false;
    this.isSetCenter=false;
    this.polylinePoints=[];
    this.insomnia.allowSleepAgain()
    .then(
      () => console.log('success'),
      () => console.log('error')
    );
  }
  changeCrowdStatus(){
      if(this.crowdStatus === "E")
      {  
        this.crowdStatus = "O";
        this.occupiedButtonDanger=true;
      }
      else{
        this.crowdStatus = "E";
        this.occupiedButtonDanger=false;
      }
        
  }
  initMap() {
    this.map = L.map('map', {
      center: this.center,
      zoom: 13,
      zoomControl:false,
      zoomAnimation:true
    });

    //Add OSM Layer
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(this.map);
  }

  moveToCenter(){
    this.map.flyTo(this.center,this.map.getZoom());
  }
  goToConfigPage(){
    this.navCtrl.pop();
  }
}
