import { Ride } from '../types/types.js';
import { getRidesByCustomerId, saveNewRide } from '../models/Ride.js';

export class RideService {
  static async saveRide(rideData: Ride) {
    const rideWithMetadata = {
      ...rideData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await saveNewRide(rideWithMetadata);

    if (!result.insertedId) throw new Error('Erro ao salvar corrida');

    return result.insertedId;
  }

  static async findRides(customer_id: string, driver_id?: number) {
    const rides = await getRidesByCustomerId(customer_id, driver_id);

    // {
    //   "customer_id": string,
    //   "rides": [
    //    {
    //      "id": number,
    //      "date": datetime,
    //      "origin": string,
    //      "destination": string,
    //      "distance": number,
    //      "duration": string,
    //      "driver": {
    //      "id": number,
    //      "name": string
    //    },
    //    "value": number
    //    }
    //  ]
    // }

    return { customer_id, rides };
  }
}
