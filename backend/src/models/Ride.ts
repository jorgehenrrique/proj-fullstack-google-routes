import { ObjectId } from 'mongodb';
import { getDatabase } from '../config/database';
import { Ride } from '../types/types';
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

// export async function updateRideById(id: string, ride: Ride) {
//   const db = await getDatabase();
//   const collection = db.collection<Ride>(COLLECTION_RIDES!);

//   return await collection.updateOne({ _id: new ObjectId(id) }, { $set: ride });
// }

// export async function deleteRideById(id: string) {
//   const db = await getDatabase();
//   const collection = db.collection<Ride>(COLLECTION_RIDES!);

//   return await collection.deleteOne({ _id: new ObjectId(id) });
// }
