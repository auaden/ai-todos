import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
  schema: './src/schema/*.ts',
  out: './src/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/ai_todos',
  },
} satisfies Config;
