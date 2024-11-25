import { MongoClient } from 'mongodb';
import 'dotenv/config';

const { MONGO_URI, MONGO_DB } = process.env;

if (!MONGO_URI || !MONGO_DB) {
  throw new Error(
    'MONGO_URI ou MONGO_DB não definida nas variáveis de ambiente'
  );
}

let mongoClient: MongoClient | null = null;

export async function connectToDatabase() {
  try {
    if (mongoClient) return mongoClient;

    mongoClient = new MongoClient(MONGO_URI!);
    await mongoClient.connect();

    console.log('Conectado ao MongoDB com sucesso');
    return mongoClient;
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
}

export async function getDatabase() {
  if (!mongoClient) mongoClient = await connectToDatabase();

  return mongoClient.db(MONGO_DB);
}

export async function closeConnection() {
  if (mongoClient) {
    await mongoClient.close();
    mongoClient = null;
  }
}
