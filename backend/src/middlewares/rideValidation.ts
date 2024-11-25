import { Request, Response, NextFunction } from 'express';

export function validateEstimateRide(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // {
  //   "customer_id": string,
  //   "origin": string,
  //   "destination": string
  // }
  const { customer_id, origin, destination } = req.body;

  const errors: string[] = [];

  if (!customer_id) errors.push('ID do usuário não pode estar em branco');

  if (!origin) errors.push('Endereço de origem é obrigatório');

  if (!destination) errors.push('Endereço de destino é obrigatório');

  if (
    origin &&
    destination &&
    origin.trim().toLowerCase() === destination.trim().toLowerCase()
  ) {
    errors.push('Endereços de origem e destino não podem ser iguais');
  }

  if (
    typeof customer_id !== 'string' ||
    typeof origin !== 'string' ||
    typeof destination !== 'string'
  ) {
    errors.push('Usuário, endereço de origem e destino devem ser strings');
  }

  if (errors.length > 0) {
    res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: errors.join(', '),
    });
    return;
  }

  next();
}

export function validateConfirmRide(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // {
  //   "customer_id": string,
  //   "origin": string,
  //   "destination": string,
  //   "distance": number,
  //   "duration": string,
  //   "driver": {
  //   "id": number,
  //   "name": string
  //   },
  //   "value": number
  // }
  const { distance, duration, driver, value } = req.body;

  const errors: string[] = [];

  if (!driver || !driver.id || !driver.name)
    errors.push('Motorista é obrigatório');

  if (!distance || distance <= 0)
    errors.push('Distância da viagem é obrigatória e deve ser maior que 0');

  if (!duration) errors.push('Duração da viagem é obrigatória');

  if (!value) errors.push('Valor da viagem é obrigatório');

  if (
    typeof distance !== 'number' ||
    typeof driver.id !== 'number' ||
    typeof value !== 'number'
  ) {
    errors.push(
      'Distância, ID do motorista e valor da viagem devem ser números'
    );
  }

  if (typeof duration !== 'string' || typeof driver.name !== 'string') {
    errors.push('Duração e nome do motorista devem ser strings');
  }

  if (errors.length > 0) {
    res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: errors.join(', '),
    });
    return;
  }

  next();
}

export function validateGetRide(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // GET /ride/{customer_id}?driver_id={id do motorista}
  const { customer_id } = req.params;
  const { driver_id } = req.query;

  const errors: string[] = [];

  if (!customer_id) errors.push('ID do usuário não pode estar em branco');

  if (driver_id) {
    const driverIdNumber = Number(driver_id);
    if (isNaN(driverIdNumber) || driverIdNumber <= 0) {
      errors.push('ID do motorista deve ser um número válido');
    }
  }

  if (errors.length > 0) {
    res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: errors.join(', '),
    });
    return;
  }

  next();
}
