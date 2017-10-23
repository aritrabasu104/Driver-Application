'use strict';
export class GPSEvent {
    public bus_number:string;
    public route_code:string;
    public timestamp:string;
    public latitude:number;
    public longitude:number;
    public speed:number;
    public serial_number:number;

    public constructor(bus_number:string,route_code:string,timestamp:string,latitude:number,
        longitude:number,speed:number,serial_number:number){
            this.bus_number=bus_number;
            this.route_code=route_code;
            this.timestamp=timestamp;
            this.latitude=latitude;
            this.longitude=longitude;
            this.speed=speed;
            this.serial_number=serial_number;
    }
    
}
