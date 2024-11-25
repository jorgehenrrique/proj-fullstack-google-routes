import { getDatabase } from '../config/database.js';
import { User } from '../types/types.js';
import 'dotenv/config';

const { COLLECTION_USERS } = process.env;

export default async function getAllUsers() {
  const db = await getDatabase();
  const collection = db.collection<User>(COLLECTION_USERS!);

  return await collection.find({}).toArray();
}

export async function getUserById(userId: string): Promise<User | null> {
  const db = await getDatabase();
  const collection = db.collection<User>(COLLECTION_USERS!);

  return await collection.findOne({ id: userId });
}
