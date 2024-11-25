import { Ride } from '../types/types.js';
import { saveNewRide } from '../models/Ride.js';

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
}
