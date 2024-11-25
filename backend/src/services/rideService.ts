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

    return {
      customer_id,
      rides: rides.map((ride) => ({
        id: ride._id,
        date: ride.createdAt,
        origin: ride.origin,
        destination: ride.destination,
        distance: ride.distance,
        duration: ride.duration,
        driver: {
          id: ride.driver.id,
          name: ride.driver.name,
        },
        value: ride.value,
      })),
    };
  }
}
