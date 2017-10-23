'use strict';

export class AmbulanceConfig{
    public vehicleNo:string;
    public vehicleType:string;
    public ownerName:string;
    public  vehicleDetail:VehicleDetail;
    public nodalAgencyName:string;
    public publiclyVisible:boolean;
    public nodalAgencyPerson:string;
    //private String primaryAgencyPhoneNumber;
    public nodalAgencyContact:string[];
  /*
    public constructor(vehicleNo:string,vehicleType:string, ownerName:string,
         vehicleDetail:VehicleDetail,nodalAgencyName:string,publiclyVisible:boolean,
        nodalAgencyPerson:string,nodalAgencyContact:[string]){
            this.vehicleNo=vehicleNo;
            this.vehicleType=vehicleType;
            this.vehicleDetail=vehicleDetail;
            this.nodalAgencyName=nodalAgencyName;
            this.publiclyVisible=publiclyVisible;
            this.nodalAgencyPerson=nodalAgencyPerson;
            this.nodalAgencyContact=nodalAgencyContact;
    }
    
*/

    public isEquivalent(ambulanceConfigObject:AmbulanceConfig):boolean {
        let isEqual:boolean = false;
        let isSameContact:boolean = false;
        var count:number=0;

        ambulanceConfigObject.nodalAgencyContact.forEach(value=>{
            if(this.nodalAgencyContact.indexOf(value)>=0)
                count++;
        });
        
        if(count == ambulanceConfigObject.nodalAgencyContact.length)
            isSameContact=true;
        if (ambulanceConfigObject.vehicleNo===this.vehicleNo
                &&ambulanceConfigObject.vehicleType===this.vehicleType
                && isSameContact
                && ambulanceConfigObject.ownerName===this.ownerName
                && ambulanceConfigObject.vehicleDetail===this.vehicleDetail
                && ambulanceConfigObject.nodalAgencyName===this.nodalAgencyName
                && ambulanceConfigObject.publiclyVisible===this.publiclyVisible)
                    isEqual=true;

        return isEqual;
    }
}
export class VehicleDetail{
    constructor(facilityType:string){
        this.facilityType=facilityType;
    }
    public facilityType:string;
    
}