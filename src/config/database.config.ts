import { ConnectionOptions } from '@mikro-orm/core';

export const databaseConfig = (): ConnectionOptions => ({
  host: process.env.DATABASE_HOST!,
  port: Number(process.env.DATABASE_PORT!),
  user: process.env.DATABASE_USERNAME!,
  password: process.env.DATABASE_PASSWORD!,
  dbName: process.env.DATABASE_NAME!,
});
