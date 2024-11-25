import { Client } from '@googlemaps/google-maps-services-js';
import { DriverService } from './driverService.js';
import 'dotenv/config';

const client = new Client({});

export class GoogleMapsService {
  static async calculateRouteDetails(origin: string, destination: string) {
    if (!process.env.GOOGLE_API_KEY)
      throw new Error('Chave de API do Google não configurada');

    const response = await client.directions({
      params: {
        origin,
        destination,
        key: process.env.GOOGLE_API_KEY!,
      },
    });

    if (response.data.routes.length === 0)
      throw new Error('Nenhuma rota encontrada');

    const route = response.data.routes[0];
    const leg = route.legs[0];

    return {
      origin: {
        latitude: leg.start_location.lat,
        longitude: leg.start_location.lng,
      },
      destination: {
        latitude: leg.end_location.lat,
        longitude: leg.end_location.lng,
      },
      distance: leg.distance.value / 1000, // Converter p km
      duration: leg.duration.text,
      originalRoute: response.data,
    };
  }

  static async estimateRideRoute(origin: string, destination: string) {
    const routeDetails = await this.calculateRouteDetails(origin, destination);
    const drivers = await DriverService.findAvailableDrivers(
      routeDetails.distance
    );

    return {
      origin: routeDetails.origin,
      destination: routeDetails.destination,
      distance: routeDetails.distance,
      duration: routeDetails.duration,
      options: drivers,
      routeResponse: routeDetails.originalRoute,
    };
    // {
    //   ...routeDetails,
    //   options: drivers,
    // };
  }
}
