'use strict';
import {GPSEvent} from './GpsEvent';

export class AmbulanceSeverCallObject {
    public IMEINumber:string;
    public crowdStatus:string;
    public dataSource:string;
    public vehicleType:string;
    //private List<String> phoneNumber;
    public registrationNumber:string;
    public gpsEvent:GPSEvent;
    public direction:number;
    public constructor(IMEINumber:string,crowdStatus:string,dataSource:string,
    vehicleType:string,registrationNumber:string,gpsEvent:GPSEvent,
    direction:number){
        this.IMEINumber=IMEINumber;
        this.crowdStatus=crowdStatus;
        this.dataSource = dataSource;
        this.vehicleType=vehicleType;
        this.registrationNumber=registrationNumber;
        this.gpsEvent=gpsEvent;
        this.direction=direction;
    }
    
}