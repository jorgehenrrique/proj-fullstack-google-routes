import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import rideRoutes from './routes/routes.js';

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/ride', rideRoutes);

app.use((_: Request, res: Response) => {
  res.status(404).send();
});

app.listen(port, () => {
  console.log(`⚡️[servidor]: API rodando em http://localhost:${port}`);
});
