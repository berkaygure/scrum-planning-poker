import { connectToDatabase } from '../../lib/database';
import userSeeder from './userSeeder';

async function seederRun() {
  const db = await connectToDatabase();
  await userSeeder();
  db.connection.close();
}

seederRun();
