import { ConnectionOptions } from '@mikro-orm/core';

import { databaseConfig } from './database.config';

export interface RootConfig {
  nodeEnv: string;
  isDevelopment: boolean;
  isProduction: boolean;
  port: number;
  database: ConnectionOptions;
}

export const rootConfig = (): RootConfig => ({
  nodeEnv: process.env.NODE_ENV!,
  isDevelopment: process.env.NODE_ENV! === 'development',
  isProduction: process.env.NODE_ENV! === 'production',
  port: Number(process.env.PORT!),
  database: databaseConfig(),
});

let env: RootConfig;

export const loadConfig = (): RootConfig => {
  env = rootConfig();

  return env;
};

// must be a function. if importing the variable in other files before initialization, it will be undefined
export function getEnv(): RootConfig {
  return env;
}
