import { ObjectId } from 'mongodb';
import { getDatabase } from '../config/database.js';
import { Ride } from '../types/types.js';
import 'dotenv/config';

const { COLLECTION_RIDES } = process.env;

export default async function getAllRides() {
  const db = await getDatabase();
  const collection = db.collection<Ride>(COLLECTION_RIDES!);

  return await collection.find({}).toArray();
}

export async function saveNewRide(ride: Ride) {
  const db = await getDatabase();
  const collection = db.collection<Ride>(COLLECTION_RIDES!);

  return await collection.insertOne(ride);
}

export async function getRideById(id: string) {
  const db = await getDatabase();
  const collection = db.collection<Ride>(COLLECTION_RIDES!);

  return await collection.findOne({ _id: new ObjectId(id) });
}

export async function getRidesByCustomerId(
  customer_id: string,
  driver_id?: number
) {
  const db = await getDatabase();
  const collection = db.collection<Ride>(COLLECTION_RIDES!);

  const query = driver_id
    ? { customer_id, 'driver.id': driver_id }
    : { customer_id };

  return await collection.find(query).sort({ createdAt: -1 }).toArray();
}

export async function updateRideById(id: string, ride: Ride) {
  const db = await getDatabase();
  const collection = db.collection<Ride>(COLLECTION_RIDES!);

  return await collection.updateOne({ _id: new ObjectId(id) }, { $set: ride });
}

export async function deleteRideById(id: string) {
  const db = await getDatabase();
  const collection = db.collection<Ride>(COLLECTION_RIDES!);

  return await collection.deleteOne({ _id: new ObjectId(id) });
}
