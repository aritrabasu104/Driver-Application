'use strict';

export const vehicle_type_key='vehicle_type';
export const vehicle_type_ambulance='AMBULANCE';
export const vehicle_config_key_ambulance='ambulance_config';
export const vehicle_detail_map_key = 'facilityType';
export const data_source = 'IDEATION';
export const vehicle_call_interval_ambulance=15000;
export const nodal_agencies_storage_key="nodalAgencies";

export const facility_type_key_normal="A";
export const facility_type_key_contagious = "B";
export const facility_type_key_lifesupport = "C";
export const facility_type_value_normal="normal";
export const facility_type_value_contagious = "contagious";
export const facility_type_value_lifesupport = "lifesupport";

export const facility_type_values : Map<string,string> = new Map();
facility_type_values.set(facility_type_key_normal,facility_type_value_normal);
facility_type_values.set(facility_type_key_contagious,facility_type_value_contagious);
facility_type_values.set(facility_type_key_lifesupport,facility_type_value_lifesupport);

export const facility_type_keys_by_value: Map<string,string> = new Map();
facility_type_keys_by_value.set(facility_type_value_normal,facility_type_key_normal);
facility_type_keys_by_value.set(facility_type_value_contagious,facility_type_key_contagious);
facility_type_keys_by_value.set(facility_type_value_lifesupport,facility_type_key_lifesupport);


//uat server in i
//must provide proper ip and port
export const END_POINT_SEND_VEHICLE_DATA = "http://YOUR_IP:YOUR_PORT/app/dataPusher";
export const  END_POINT_SEND_AMBULANCE_DATA = "http://YOUR_IP:YOUR_PORT/app/dataPusher/special";
export const END_POINT_SEND_POLICE_VEHICLE_DATA = "http://YOUR_IP:YOUR_PORT/app/dataPusher/special";
export const END_POINT_SEND_POLICE_VEHICLE_CONFIG_DATA = "http://YOUR_IP:YOUR_PORT/app/dataPusher/police/configure";
export const END_POINT_GET_ALL_ROUTE = "http://YOUR_IP:YOUR_PORT/app/routes/getAllRoutes.json";
export const END_POINT_CHECK_APP_VERSION = "http://YOUR_IP:YOUR_PORT/app/checkVersion.json";
export const GET_VEHICLE_BY_ROUTE_SERVICE_URL = "http://YOUR_IP:YOUR_PORT/app/vehicles/getVehicleByRoute.json";
export const END_POINT_SEND_AMBULANCE_CONFIG_DATA = "http://YOUR_IP:YOUR_PORT/app/dataPusher/special/configure";
export const END_POINT_GET_ALL_NODAL_AGENCIES = "http://YOUR_IP:YOUR_PORT/app/agencies/getAllNodalAgencies.json";
export const END_POINT_GET_ALL_NODAL_AGENCIES_FOR_POLICE = "http://YOUR_IP:YOUR_PORT/app/vehicles/getVehicleAttributeValue/policeStation.json";
export const END_POINT_GET_VEHICLE_FOR_NODAL_AGENCY_POLICE="http://YOUR_IP:YOUR_PORT/app/vehicles/getMatchingVehicles.json";
