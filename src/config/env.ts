import {config} from 'dotenv';

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';

export const CONFIG: any= {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  LOG_LEVEL: process.env.LOG_LEVEL,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_DIALECT: process.env.DB_DIALECT,
  TYPEORM_MIGRATIONS: process.env.TYPEORM_MIGRATIONS,
  TYPEORM_SEEDING_SEEDS: process.env.TYPEORM_SEEDING_SEEDS,
  TYPEORM_MIGRATIONS_RUN: process.env.TYPEORM_MIGRATIONS_RUN,
  TYPEORM_MIGRATIONS_DIR: process.env.TYPEORM_MIGRATIONS_DIR,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  SALT: process.env.SALT,
  API_SECRET: process.env.API_SECRET,
  BASIC_AUTH_USER: process.env.BASIC_AUTH_USER,
  BASIC_AUTH_PASS: process.env.BASIC_AUTH_PASS,
  BASE_URL: process.env.BASE_URL,
  BASE_PATH: process.env.BASE_PATH,
};
export const apiPrefix: any={
  prefix: '/api/v1',
};
config({path: envFile});
