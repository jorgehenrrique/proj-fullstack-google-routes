import { getDatabase } from '../config/database.js';
import { Driver } from '../types/types.js';
import 'dotenv/config';

const { COLLECTION_DRIVERS } = process.env;

export default async function getAllDrives() {
  const db = await getDatabase();
  const collection = db.collection<Driver>(COLLECTION_DRIVERS!);

  return await collection.find({}).toArray();
}

export async function getDriverById(driverId: number): Promise<Driver | null> {
  const db = await getDatabase();
  const collection = db.collection<Driver>(COLLECTION_DRIVERS!);

  return await collection.findOne({ id: driverId });
}
