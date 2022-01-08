import { connect, Mongoose, set } from 'mongoose';
import { MONGO_CONNECTION_URL } from '../config';
import { isDev } from '../utils';
import logger from './logger';

async function connectToDatabase(): Promise<Mongoose> {
  try {
    if (!MONGO_CONNECTION_URL) {
      throw new Error('MONGO_CONNECTION_URL is not defined');
    }
    const db = await connect(MONGO_CONNECTION_URL);
    if (isDev()) {
      set('debug', true);
    }
    return db;
  } catch (err) {
    logger.error(err);
  }
}

export { connectToDatabase };
