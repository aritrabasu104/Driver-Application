import { Component,ViewChild } from '@angular/core';
import { NavController,Button } from 'ionic-angular';
import { AmbulanceconfigPage } from '../ambulanceconfig/ambulanceconfig';
import { PublictransportconfigPage } from '../publictransportconfig/publictransportconfig';
import {BusconfigPage} from '../busconfig/busconfig';
import {TramconfigPage} from '../tramconfig/tramconfig';
import { Storage } from '@ionic/storage';
import * as GlobalVars from '../../helper/globalvars';
import { LoadingController } from 'ionic-angular';
import {HttpClient } from '@angular/common/http';
import {NodalAgencies} from './../../helper/NodalAgencies';
import {AmbulanceConfig} from './../../helper/AmbulanceConfigObject'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  @ViewChild('busTram') busTram:Button;
  @ViewChild('police') police:Button;
  @ViewChild('ambulance') ambulance:Button;
  private selectedIndex=-1;
  private boundFunction;
  //private selectedType = this.allTypes[this.selectedIndex];

  constructor(public navCtrl: NavController,private storage:Storage,
    private httpClient:HttpClient,public loadingCtrl: LoadingController) {
    
      
    storage.get(GlobalVars.vehicle_type_key).then(val=>
    {
     
      console.log(val);
      if(val==GlobalVars.vehicle_type_ambulance)
        this.gotoAmbulanceConfig();
      else if(val==GlobalVars.vehicle_type_public)
      {
        console.log("Public Flow");
        this.gotoPublicConfig();
      }
      else if(val==GlobalVars.vehicle_type_bus)
      {
        console.log("Bus Flow");
        this.gotoBusConfig();
      }
      else if(val==GlobalVars.vehicle_type_tram)
      {
        console.log("Tram Flow");
        this.gotoTramConfig();
      }
    });
    
  }
  
  ionViewWillEnter(){
    this.boundFunction =this.handleKeyBoard.bind(this);
    document.addEventListener(GlobalVars.EVENT_LISTENER_TYPE_KEYBOARD,this.boundFunction,true);
  }
  ionViewWillLeave(){
    console.log('removing event');
    document.removeEventListener(GlobalVars.EVENT_LISTENER_TYPE_KEYBOARD,this.boundFunction,true);
    
  }
  handleKeyBoard(event:KeyboardEvent):void{
    
    const keyName = event.key;
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
    console.log(event.key);
    switch (event.key) {
      case "ArrowDown":
        this.selectedIndex=(this.selectedIndex+1)%3;
        console.log(this.selectedIndex);
        break;
      case "ArrowUp":
        if(this.selectedIndex== 0)
          this.selectedIndex = 2
        else
          this.selectedIndex--;
        break;
      case "ArrowLeft":
        // Do something for "left arrow" key press.
        break;
      case "ArrowRight":
        // Do something for "right arrow" key press.
        break;
      case "Enter":
        switch(this.selectedIndex){
          case 0:
            this.gotoPublicConfig();
          case 1:
            this.gotoAmbulanceConfig();
          break;
          default:
            break;
        }
        break;
      case "Escape":
        // Do something for "esc" key press.
        break;
      default:
        return; // Quit when this doesn't handle the key event.

    }
    switch(this.selectedIndex){
      case 0:
        this.ambulance._attr('button','outline',false);
        this.police._attr('button','outline',false);
        this.busTram._attr('button','outline',true);
        break;
      case 1:
        this.busTram._attr('button','outline',false);
        this.police._attr('button','outline',false);
        this.ambulance._attr('button','outline',true);
        break;
      case 2:
        this.ambulance._attr('button','outline',false);
        this.busTram._attr('button','outline',false);
        this.police._attr('button','outline',true);
        break;
      default:
        break;
    }
    //alert(this.allTypes[this.selectedIndex] + " selected");
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }
  
  gotoAmbulanceConfig(){
    this.storage.set(GlobalVars.vehicle_type_key,GlobalVars.vehicle_type_ambulance);

    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    
    this.storage.get(GlobalVars.nodal_agencies_storage_key).then(val=>
      {
        //console.log('storage',val);
        if(val==null){
            loader.present();
            this.httpClient.get(GlobalVars.END_POINT_GET_ALL_NODAL_AGENCIES).subscribe(data => {
          
            let jsonData:string=JSON.stringify(data);
            this.storage.set(GlobalVars.nodal_agencies_storage_key,jsonData);  
            //console.log("nodadalAgencies",jsonData);
            loader.dismiss();
            this.navCtrl.push(AmbulanceconfigPage);
        });
      }else
      {
       // this.navCtrl.push(AmbulanceconfigPage);
      }
     
    });

    
  }
  gotoPublicConfig(){
    this.storage.set(GlobalVars.vehicle_type_key,GlobalVars.vehicle_type_public);

    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    
    this.storage.get(GlobalVars.nodal_agencies_storage_key).then(val=>
      {
        //console.log('storage',val);
        if(val==null){
            loader.present();
            this.httpClient.get(GlobalVars.END_POINT_GET_ALL_ROUTE).subscribe(data => {
          
            let jsonData:string=JSON.stringify(data);
            this.storage.set(GlobalVars.public_transport_storage_key,jsonData);  
            //console.log("publicRoutes",jsonData);
            loader.dismiss();
           // this.navCtrl.push(PublictransportconfigPage);
        });
      }else
      {
        //this.navCtrl.push(PublictransportconfigPage);
      }
     
    });
  }
  gotoBusConfig(){
    this.storage.set(GlobalVars.vehicle_type_key,GlobalVars.vehicle_type_bus);

    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    
    this.storage.get(GlobalVars.nodal_agencies_storage_key).then(val=>
      {
        //console.log('storage',val);
        if(val==null){
            loader.present();
            this.httpClient.get(GlobalVars.END_POINT_GET_ALL_ROUTE).subscribe(data => {
          
            let jsonData:string=JSON.stringify(data);
            this.storage.set(GlobalVars.public_transport_storage_key,jsonData);  
            //console.log("publicRoutes",jsonData);
            loader.dismiss();
            //this.navCtrl.push(BusconfigPage);
        });
      }else
      {
       // this.navCtrl.push(BusconfigPage);
      }
     
    });
  }
  gotoTramConfig(){
    this.storage.set(GlobalVars.vehicle_type_key,GlobalVars.vehicle_type_tram);

    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    
    this.storage.get(GlobalVars.nodal_agencies_storage_key).then(val=>
      {
        //console.log('storage',val);
        if(val==null){
            loader.present();
            this.httpClient.get(GlobalVars.END_POINT_GET_ALL_ROUTE).subscribe(data => {
          
            let jsonData:string=JSON.stringify(data);
            this.storage.set(GlobalVars.public_transport_storage_key,jsonData);  
            //console.log("publicRoutes",jsonData);
            loader.dismiss();
            //this.navCtrl.push(TramconfigPage);
        });
      }else
      {
        //this.navCtrl.push(TramconfigPage);
      }
     
    });
  }
}
