import { Request, Response } from 'express';
import { RideService } from '../services/rideService.js';
import { Ride } from '../types/types.js';
import { GoogleMapsService } from '../services/googleMapsService.js';
import { UserService } from '../services/userService.js';
import { DriverService } from '../services/driverService.js';

export async function estimateRide(req: Request, res: Response) {
  try {
    const { customer_id, origin, destination } = req.body;

    const user = await UserService.validateUser(customer_id);
    if (!user) {
      res.status(404).json({
        error_code: 'USER_NOT_FOUND',
        error_description: 'Usuário não encontrado',
      });
      return;
    }

    const estimate = await GoogleMapsService.estimateRideRoute(
      origin,
      destination
    );

    res.json(estimate);
  } catch (error) {
    const err =
      error instanceof Error
        ? error.message
        : 'Erro ao calcular estimativa de corrida';
    res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: err,
    });
  }
}

export async function confirmRide(req: Request, res: Response) {
  try {
    const rideData: Ride = req.body;

    const user = await UserService.validateUser(rideData.customer_id);
    if (!user) {
      res.status(404).json({
        error_code: 'USER_NOT_FOUND',
        error_description: 'Usuário não encontrado',
      });
      return;
    }

    const { valid, driver } = await DriverService.validateDriverAndDistance(
      rideData.driver.id,
      rideData.distance
    );
    if (!driver) {
      res.status(404).json({
        error_code: 'DRIVER_NOT_FOUND',
        error_description: 'Motorista não encontrado',
      });
      return;
    }
    if (!valid) {
      res.status(406).json({
        error_code: 'INVALID_DISTANCE',
        error_description: 'Quilometragem inválida para o motorista',
      });
      return;
    }

    const savedRideId = await RideService.saveRide(rideData);

    // status(201)
    res.json({ success: true });
  } catch (error) {
    const err =
      error instanceof Error ? error.message : 'Erro ao confirmar corrida';
    res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: err,
    });
  }
}

export async function getRide(req: Request, res: Response) {
  try {
    const { customer_id } = req.params;
    const { driver_id } = req.query;

    const user = await UserService.validateUser(customer_id);
    if (!user) {
      res.status(404).json({
        error_code: 'USER_NOT_FOUND',
        error_description: 'Usuário não encontrado',
      });
      return;
    }

    if (driver_id) {
      const driver = await DriverService.validateDriver(Number(driver_id));
      if (!driver) {
        res.status(400).json({
          error_code: 'INVALID_DRIVER',
          error_description: 'Motorista inválido',
        });
        return;
      }
    }

    const rides = await RideService.findRides(
      customer_id,
      driver_id ? Number(driver_id) : undefined
    );
    if (!rides || rides.length === 0) {
      res.status(404).json({
        error_code: 'NO_RIDES_FOUND',
        error_description: 'Nenhum registro encontrado',
      });
      return;
    }

    res.json(rides);
  } catch (error) {
    const err =
      error instanceof Error ? error.message : 'Erro ao listar corridas';
    res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: err,
    });
  }
}
