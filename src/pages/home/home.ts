import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AmbulanceconfigPage } from '../ambulanceconfig/ambulanceconfig';
import { Storage } from '@ionic/storage';
import * as GlobalVars from '../../helper/globalvars';
import { LoadingController } from 'ionic-angular';
import {HttpClient } from '@angular/common/http';
import {NodalAgencies} from './../../helper/NodalAgencies';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    
  constructor(public navCtrl: NavController,private storage:Storage,
    private httpClient:HttpClient,public loadingCtrl: LoadingController) {
      
    storage.get(GlobalVars.vehicle_type_key).then(val=>
    {
     
      console.log(val);
      if(val==GlobalVars.vehicle_type_ambulance)
        this.gotoAmbulanceConfig();
    });
    
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
            this.httpClient.get(GlobalVars.END_POINT_GET_ALL_NODAL_AGENCIES).map((res: Response) => res).subscribe(data => {
          
            let jsonData:string=JSON.stringify(data);
            this.storage.set(GlobalVars.nodal_agencies_storage_key,jsonData);  
            //console.log("nodadalAgencies",jsonData);
            loader.dismiss();
            this.navCtrl.push(AmbulanceconfigPage);
        });
      }else
      {
        this.navCtrl.push(AmbulanceconfigPage);
      }
     
    });

    
  }
}
