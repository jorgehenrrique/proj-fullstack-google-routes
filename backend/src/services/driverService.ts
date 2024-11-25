import getAllDrivers, { getDriverById } from '../models/Drivers.js';
import { Driver } from '../types/types.js';

export class DriverService {
  static async findAvailableDrivers(
    distance: number
  ): Promise<Partial<Driver>[]> {
    const drivers = await getAllDrivers();

    return drivers
      .filter((driver) => distance >= driver.minKm)
      .map((driver) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: driver.review,
        value: this.calculateDriverPrice(driver, distance),
      }))
      .sort((a, b) => a.value - b.value);
  }

  private static calculateDriverPrice(
    driver: Driver,
    distance: number
  ): number {
    return distance * driver.ratePerKm;
  }

  static async validateDriverAndDistance(
    driverId: number,
    distance: number
  ): Promise<{ valid: boolean; driver?: Driver }> {
    const driver = await this.validateDriver(driverId);

    if (!driver) return { valid: false };

    const isDistanceValid = distance >= driver.minKm;

    return {
      valid: isDistanceValid,
      driver: driver,
    };
  }

  static async validateDriver(driverId: number): Promise<Driver | null> {
    return await getDriverById(driverId);
  }
}
