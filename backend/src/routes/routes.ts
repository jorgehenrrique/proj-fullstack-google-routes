import express, { Request, Response, Router } from 'express';
import {
  confirmRide,
  estimateRide,
  getRide,
} from '../controllers/rideController.js';
import {
  validateConfirmRide,
  validateEstimateRide,
  validateGetRide,
} from '../middlewares/rideValidation.js';

const router: Router = express.Router();

router.post('/estimate', validateEstimateRide, estimateRide);
// Responsável por receber a origem e o destino da viagem e realizar os cálculos dos valores da viagem.

router.patch(
  '/confirm',
  validateEstimateRide,
  validateConfirmRide,
  confirmRide
);
// Responsável por confirmar a viagem e gravá-la no histórico.

router.get('/:customer_id', validateGetRide, getRide);
// Responsável por listar as viagens realizadas por um determinado usuário

export default router;
