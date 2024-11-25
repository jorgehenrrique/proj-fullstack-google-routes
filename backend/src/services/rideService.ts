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
    return await getRidesByCustomerId(customer_id, driver_id);
  }
}
