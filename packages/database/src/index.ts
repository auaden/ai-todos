import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// For Next.js edge runtime compatibility
export * from './schema';

// Database client
export const createClient = (connectionString?: string) => {
  const client = postgres(
    connectionString || 
    process.env.DATABASE_URL || 
    'postgres://postgres:postgres@localhost:5432/ai_todos'
  );
  return drizzle(client, { schema });
};

// Types
export type Database = ReturnType<typeof createClient>;
