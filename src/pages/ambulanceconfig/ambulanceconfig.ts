import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import * as GlobalVars from './../../helper/globalvars';
import {AmbulanceConfig } from './../../helper/AmbulanceConfigObject';
import {VehicleDetail } from './../../helper/AmbulanceConfigObject';
import {AmbulancemainPage} from '../ambulancemain/ambulancemain';
import {HttpClient } from '@angular/common/http';
import {HttpHeaders } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {NodalAgencies} from './../../helper/NodalAgencies';


/**
 * Generated class for the AmbulanceconfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ambulanceconfig',
  templateUrl: 'ambulanceconfig.html',
})
export class AmbulanceconfigPage {

  @ViewChild('NAP') NAP;
  @ViewChild('NAC') NAC;
  private nodadalAgencies : NodalAgencies=new NodalAgencies();
  private facilityTypeValues = GlobalVars.facility_type_values;
  private ambulanceConfigForm : FormGroup=new FormGroup({controllername:new FormControl()});
  private ambulanceConfig:AmbulanceConfig;

  constructor(public navCtrl: NavController,private storage:Storage,
    public navParams: NavParams, private formBuilder: FormBuilder
    ,private httpClient:HttpClient,public loadingCtrl: LoadingController) {
      
      this.ambulanceConfigForm = this.formBuilder.group({
      vehicleNo:['',Validators.compose([Validators.minLength(8), Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      description:[''],
      facilityType:['',Validators.required],
      ownerName:'',
      nodalAgencyId:['',Validators.required],
      publicVisible:true,
      nodalAgencyContact:[],
      nodalAgencyPerson:''
    });
    
  }
  ionViewDidLoad(){
    this.storage.get(GlobalVars.vehicle_config_key_ambulance).then(result=>{
      if(result != null){
        this.ambulanceConfig =JSON.parse(result);
        this.gotoMainPage();
      }else{
        this.storage.get(GlobalVars.nodal_agencies_storage_key).then(val=>
        {this.nodadalAgencies=JSON.parse(val)});
      }
    });
  }
  
  ionViewDidEnter(){
    this.storage.get(GlobalVars.vehicle_config_key_ambulance).then(result=>{
      if(result != null){
        this.ambulanceConfig =JSON.parse(result);
        
        //this.gotoMainPage();
        this.storage.get(GlobalVars.nodal_agencies_storage_key).then(val=>
        {this.nodadalAgencies=JSON.parse(val)});

        this.ambulanceConfigForm.value.vehicleNo =this.ambulanceConfig.vehicleNo;
        this.ambulanceConfigForm.value.ownerName = this.ambulanceConfig.ownerName;
        this.ambulanceConfigForm.value.facilityType = 
        GlobalVars.facility_type_keys_by_value.get(this.ambulanceConfig.vehicleDetail.facilityType);
        
        this.ambulanceConfigForm.value.nodalAgencyName = this.ambulanceConfig.nodalAgencyName ;
        this.ambulanceConfigForm.value.nodalAgencyPerson = this.ambulanceConfig.nodalAgencyPerson;
        
        this.ambulanceConfigForm.value.nodalAgencyContact=[];
        this.ambulanceConfig.nodalAgencyContact.forEach(contact=>{
          this.ambulanceConfigForm.value.nodalAgencyContact.push(contact);
        });
        this.ambulanceConfigForm.value.publicVisible = this.ambulanceConfig.publiclyVisible ;
        
      }
    });
    
  }
  onChange(NAValue:string, nodalAgencies:NodalAgencies) {
       console.log(NAValue);
       this.NAP.value=nodalAgencies.data[NAValue].nodalAgencyPerson;
       this.NAC.value=nodalAgencies.data[NAValue].nodalAgencyPhone;
      }

  saveConfig(){
      console.log(this.ambulanceConfigForm.value);
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
      
      /*UNCOMMENT THIS WHEN U HAVE UR API ENDPOINTS */
      /*
      this.populateConfigObject();
      loader.present();

      this.httpClient.post(GlobalVars.END_POINT_SEND_AMBULANCE_CONFIG_DATA, JSON.stringify(this.ambulanceConfig), {
        headers: new HttpHeaders().set("Content-type", "application/json"),
      })
      .subscribe( data => {
        console.log('config saved');
        this.storage.set(GlobalVars.vehicle_config_key_ambulance,JSON.stringify(this.ambulanceConfig));
        loader.dismiss();
        this.gotoMainPage();    
      },
        // Errors will call this callback instead:
        err => {
          loader.dismiss();
          console.log('could not save config!'+err);
        }
      );*/
      //console.log(JSON.stringify(this.ambulanceConfig));
      this.storage.set(GlobalVars.vehicle_config_key_ambulance,JSON.stringify(this.ambulanceConfig));
      this.gotoMainPage();
    }
  populateConfigObject(){
    var facilityType:string;
    facilityType = GlobalVars.facility_type_values.get(this.ambulanceConfigForm.value.facilityType);
    var contactList:string[]=[];
    /*
    this.ambulanceConfigForm.value.nodalAgencyContact.forEach(element => {
      contactList.push(element);  
    });
    */
    contactList.push(this.ambulanceConfigForm.value.nodalAgencyContact);
    this.ambulanceConfig=new AmbulanceConfig();
    this.ambulanceConfig.vehicleNo = this.ambulanceConfigForm.value.vehicleNo;
    this.ambulanceConfig.vehicleType = GlobalVars.vehicle_type_ambulance;
    this.ambulanceConfig.ownerName = this.ambulanceConfigForm.value.ownerName;
    this.ambulanceConfig.vehicleDetail = new VehicleDetail(facilityType);
    this.ambulanceConfig.nodalAgencyName = this.nodadalAgencies.
                data[this.ambulanceConfigForm.value.nodalAgencyId].nodalAgencyName;
    this.ambulanceConfig.nodalAgencyPerson =this.ambulanceConfigForm.value.nodalAgencyPerson;
    this.ambulanceConfig.nodalAgencyContact =contactList;
    this.ambulanceConfig.publiclyVisible = this.ambulanceConfigForm.value.publicVisible;
    
  }
  
  gotoMainPage(){
    this.navCtrl.push(AmbulancemainPage);
  }
}
