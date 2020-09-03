export interface ILocationType {
  latitude: number;
  longitude: number;
}

export interface ILocationHistory {
  ID: number;
  locationData: ILocationHistory;
}

export interface ILocationMetrics {
  currentPosition: ILocationType;
  startTime: string;
  endTime: string;
  duration: string;
  miles: string;
}
