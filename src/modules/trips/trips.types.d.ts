import { LatLng } from "leaflet";

interface TripBase {
  start_location: string;
  pickup_location: string;
  dropoff_location: string;
  current_cycle_hours_used: number;
}

export interface TripFormData extends TripBase {}

export interface Trip extends TripBase {
  id: string;
  distance_miles: number;
  start_time: string;
  route_data: Route;
}

export interface Route {
  coordinates: LatLng[];
}

enum LogStatus {
  OFF_DUTY = "OFF DUTY",
  SLEEPER_BERTH = "SLEEPER BERTH",
  DRIVING = "DRIVING",
  ON_DUTY = "ON DUTY",
}
enum LogAction {
  PRE_CHECK = "PRE CHECK",
  DRIVING = "DRIVING",
  PICKUP = "PICKUP",
  BREAK = "BREAK",
  FUEL_STOP = "FUEL STOP",
  OFF_DAYS = "OFF DAYS",
  DROP_OFF = "DROP OFF",
  DONE = "DONE",
}

export interface EldLog {
  id: string;
  trip: string;
  status: LogStatus;
  action: LogAction;
  coordinates: LatLng;
  timestamp: Date;
}

interface GroupedLog {
  [x: string]: EldLog[];
}
