import { ObjectId } from 'mongodb';

// Modelo de Corrida (Ride)
interface Ride {
  _id?: ObjectId;
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Modelo de Usuário (User)
interface User {
  _id?: ObjectId;
  id: string;
  name: string;
  email: string;
  hashedPassword: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Modelo de Motorista (Driver)
interface Driver {
  _id?: ObjectId;
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  }[];
  ratePerKm: number;
  minKm: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export { Ride, User, Driver };
