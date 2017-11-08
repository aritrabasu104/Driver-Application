import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import * as GlobalVars from './../../helper/globalvars';
import {AmbulanceConfig } from './../../helper/AmbulanceConfigObject';
import {VehicleDetail } from './../../helper/AmbulanceConfigObject';
import {AmbulancemainPage} from '../ambulancemain/ambulancemain';
import {HttpClient } from '@angular/common/http';
import {HttpHeaders } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
//import 'rxjs/add/operator/map';
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
export class AmbulanceconfigPage  {

  @ViewChild('vehicleNo') vehicleNo;
  @ViewChild('facilityType') facilityType;
  @ViewChild('ownerName') ownername;
  
  @ViewChild('NA') NA;
  @ViewChild('NAP') NAP;
  @ViewChild('NAC') NAC;
  @ViewChild('publicVisible') publicVisible;
  @ViewChild('submit') submit;
  
  private unregisterBackButtonAction: any;
  private nodalAgencies : NodalAgencies=new NodalAgencies();
  private facilityTypeValues = GlobalVars.facility_type_values;
  private ambulanceConfigForm : FormGroup=new FormGroup({controllername:new FormControl()});
  private ambulanceConfig:AmbulanceConfig;
  private selectedIndex:number=-1;
  private selectedNodalAgencyIndex=-1;
  private selectedFacilityIndex=-1;
  //private allFields;
  private facilityMenuOpened=false;
  private nodalAgencyMenuOpened=false;
  private nodalAgencyModel;
  private boundFunction;
  private facilityModel;
  constructor(public navCtrl: NavController,private storage:Storage,
    public navParams: NavParams, private formBuilder: FormBuilder
    ,private httpClient:HttpClient,public loadingCtrl: LoadingController,
    private platform:Platform
    ) {
     
      this.ambulanceConfigForm = this.formBuilder.group({
      vehicleNo:['',Validators.compose([Validators.minLength(8), Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      description:[''],
      facilityType:['',Validators.required],
      ownerName:'',
      nodalAgencyId:['',Validators.required],
      publicVisible:true,
      nodalAgencyContact:'',
      nodalAgencyPerson:''
    });
    
  }
 
  navigationFunc():void{

    if(this.facilityMenuOpened){
      //console.log(JSON.stringify(this.facilityNormal));
      this.facilityModel=GlobalVars.ambulance_facilities[this.selectedFacilityIndex];
       /*NOT WORKING CURRENTLY,PROBLEM WITH IONIC*/ 
      //this.facilityNormal.selected=true;  
    
    }else if(this.nodalAgencyMenuOpened){
      this.nodalAgencyModel = this.nodalAgencies.data[this.selectedNodalAgencyIndex].nodalAgencyId;

    }else{
      switch(this.selectedIndex){
        case 1:
          this.vehicleNo.setFocus();
          break;
        case 2:
          this.facilityType.open();
          this.facilityMenuOpened=true;
          break;
        case 3:
          this.ownername.setFocus();
          break;
        case 4:
          this.NA.open();
          this.nodalAgencyMenuOpened=true;
        case 5:
          this.NAP.setFocus();
          break;
        case 6:
          this.NAC.setFocus();
          break;
        case 7:
          this.publicVisible.checked=!this.publicVisible.checked;
          break;
        default:
          break;  
        
      }
    }
    
  }
  handleKeyBoard(event):void{
    //handling keyboard
    const keyName = event.key;
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
    //console.log('custom',event);
    if(this.facilityMenuOpened){
      switch (event.key) {
        case "ArrowDown":
          this.selectedFacilityIndex=(this.selectedFacilityIndex+1)%3;
          this.navigationFunc();
        break;
        case "ArrowUp":
          if(this.selectedFacilityIndex == 0)
            this.selectedFacilityIndex = 2;
          else
            this.selectedFacilityIndex--;
          this.navigationFunc();
        break;
        case "ArrowLeft":
          
          // Do something for "left arrow" key press.
        break;
        case "ArrowRight":
          // Do something for "right arrow" key press.
        break;
        case "Enter":
          //this.navigationFunc();
          this.facilityMenuOpened=false;
        
    }
   
  }else if(this.nodalAgencyMenuOpened){
    let numberOfnodalAgencies =this.nodalAgencies.data.length;
    switch (event.key) {
      case "ArrowDown":
        this.selectedNodalAgencyIndex=(this.selectedNodalAgencyIndex+1)%numberOfnodalAgencies;
        this.navigationFunc();
      break;
      case "ArrowUp":
        if(this.selectedNodalAgencyIndex == 0)
          this.selectedNodalAgencyIndex = numberOfnodalAgencies-1;
        else
          this.selectedNodalAgencyIndex--;
        this.navigationFunc();
      break;
      case "ArrowLeft":
        
        // Do something for "left arrow" key press.
      break;
      case "ArrowRight":
        // Do something for "right arrow" key press.
      break;
      case "Enter":
        //this.navigationFunc();
        this.nodalAgencyMenuOpened=false;
      
    }
  }
  else{
      switch (event.key) {
        case "ArrowDown":
          this.selectedIndex=(this.selectedIndex+1)%9;
          this.navigationFunc();
        break;
        case "ArrowUp":
          if(this.selectedIndex == 0)
            this.selectedIndex = 8;
          else
            this.selectedIndex--;
          this.navigationFunc();
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
              //this.gotoPublicConfig();
            break;
            case 1:
              //this.gotoAmbulanceConfig();
            break;
            case 8:
              this.saveConfig();
            break;
          }
        
          break;
        case "Escape":
          // Do something for "esc" key press.
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
    }
  
  event.preventDefault();
}

ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
    document.removeEventListener(GlobalVars.EVENT_LISTENER_TYPE_KEYBOARD,this.boundFunction,false);
 }

public initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {}, 10);
}


  ionViewDidLoad(){
    this.storage.get(GlobalVars.vehicle_config_key_ambulance).then(result=>{
      if(result != null){
        this.ambulanceConfig =JSON.parse(result);
        this.gotoMainPage();
      }else{
        this.storage.get(GlobalVars.nodal_agencies_storage_key).then(val=>
        {this.nodalAgencies=JSON.parse(val)});
      }
    });
  }
  ionViewDidEnter(){
  
    this.boundFunction =this.handleKeyBoard.bind(this);
    document.addEventListener(GlobalVars.EVENT_LISTENER_TYPE_KEYBOARD,this.boundFunction,false);
  
    //to disable back button
    this.initializeBackButtonCustomHandler();

    this.storage.get(GlobalVars.vehicle_config_key_ambulance).then(result=>{
      if(result != null){
        this.ambulanceConfig =JSON.parse(result);
        
        //this.gotoMainPage();
        this.storage.get(GlobalVars.nodal_agencies_storage_key).then(val=>
        {this.nodalAgencies=JSON.parse(val)});

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
  onChange(NAValue:number, nodalAgencies:NodalAgencies) {
       //console.log(NAValue);
       nodalAgencies.data.forEach(value=>{
          if(value.nodalAgencyId == NAValue){
            this.NAP.value=value.nodalAgencyPerson;
            this.NAC.value=value.nodalAgencyPhone;
          }
       });
      }

  saveConfig(){
      
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
      
      //console.log('saveconfig');
      this.populateConfigObject();
      loader.present();

      let ambulanceConfigJson:string = JSON.stringify(this.ambulanceConfig);
      this.httpClient.post(GlobalVars.END_POINT_SEND_AMBULANCE_CONFIG_DATA, ambulanceConfigJson,{
        headers: new HttpHeaders().set("Content-type", "application/json"),
        responseType:"text",
      
      })
      .subscribe( data => {
        console.log('config saved');
        this.storage.set(GlobalVars.vehicle_config_key_ambulance,ambulanceConfigJson);
        loader.dismiss();
        this.gotoMainPage();    
      },
        // Errors will call this callback instead:
        err => {
          loader.dismiss();
          console.log(ambulanceConfigJson);
          console.log('could not save config!',err);
        }
      );
      //console.log(JSON.stringify(this.ambulanceConfig));
      this.storage.set(GlobalVars.vehicle_config_key_ambulance,ambulanceConfigJson);
      //this.gotoMainPage();
    }
  populateConfigObject(){
    //console.log('populateConfigObject');
    var facilityType:string;
    facilityType = GlobalVars.facility_type_keys_by_value.get(this.ambulanceConfigForm.value.facilityType);
    var contactList:string[]=[];
    
    this.ambulanceConfigForm.value.nodalAgencyContact.split(',').forEach(element => {
      contactList.push(element);  
    });
    
    this.ambulanceConfig=new AmbulanceConfig();
    this.ambulanceConfig.vehicleNo = this.ambulanceConfigForm.value.vehicleNo;
    this.ambulanceConfig.vehicleType = GlobalVars.vehicle_type_ambulance;
    this.ambulanceConfig.ownerName = this.ambulanceConfigForm.value.ownerName;
    this.ambulanceConfig.vehicleDetail = new VehicleDetail(facilityType);
    this.nodalAgencies.data.forEach(value=>{
      if(value.nodalAgencyId == this.ambulanceConfigForm.value.nodalAgencyId){
        this.ambulanceConfig.nodalAgencyName=value.nodalAgencyName;
        this.ambulanceConfig.nodalAgencyPerson=value.nodalAgencyPerson;
        this.ambulanceConfig.nodalAgencyContact=contactList;
      }
   });
    this.ambulanceConfig.publiclyVisible = this.ambulanceConfigForm.value.publicVisible;
    
  }
  
  gotoMainPage(){
    this.navCtrl.push(AmbulancemainPage);
  }
}
