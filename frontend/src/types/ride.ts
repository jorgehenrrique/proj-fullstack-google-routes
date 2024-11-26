export interface RideRequest {
  customer_id: string;
  origin: string;
  destination: string;
}

export interface RideEstimate {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  duration: string;
  options: Driver[];
  routeResponse: object | null;
}

export interface Driver {
  id: number;
  name: string;
  vehicle: string;
  description?: string;
  review?: {
    rating: number;
    comment: string;
  }[];
  value: number;
}

export interface RideConfirmation extends RideRequest {
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

export interface Ride {
  id: number;
  date: string | Date;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

export interface RideHistoryResponse {
  customer_id: string;
  rides: Ride[];
}
