import pkg from 'pg';
const { Client } = pkg;
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { config } from 'dotenv';

config({ path: '.env' });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL is not set in .env file');
  process.exit(1);
}

console.log('🔌 Connecting to database...');
const client = new Client({ connectionString });

try {
  await client.connect();
  console.log('✅ Connected to database');

  const migrationsPath = './drizzle/migrations';
  const files = await readdir(migrationsPath);
  const sqlFiles = files.filter((f) => f.endsWith('.sql')).sort();

  console.log(`📝 Found ${sqlFiles.length} migration files`);

  for (const file of sqlFiles) {
    console.log(`⏳ Running ${file}...`);
    const filePath = join(migrationsPath, file);
    const sql = await readFile(filePath, 'utf-8');

    try {
      await client.query(sql);
      console.log(`✅ ${file} completed`);
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log(`⚠️  ${file} - tables already exist, skipping`);
      } else {
        throw error;
      }
    }
  }

  console.log('✅ All migrations completed successfully!');
} catch (error) {
  console.error('❌ Migration failed:', error);
  process.exit(1);
} finally {
  await client.end();
}
