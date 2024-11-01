import { config } from "dotenv";

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";

export const CONFIG: any = {
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

  GOOGLE: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
    redirectUriClient: process.env.GOOGLE_REDIRECT_URI_CLIENT,
    redirectUriAdmin: process.env.GOOGLE_REDIRECT_URI_ADMIN,
    developerToken: process.env.GOOGLE_DEVELOPER_TOKEN,
    cookieKey: process.env.GOOGLE_COOKIE_KEY,
  },

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,

  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_ACCOUNT_REGION: process.env.AWS_ACCOUNT_REGION,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,

  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SALT: process.env.SALT,
  HOST: process.env.HOST,
  SERVICE: process.env.SERVICE,
  EMAIL_PORT: process.env.EMAIL_PORT,
  SECURE: process.env.SECURE,
  USER: process.env.USER,
  PASS: process.env.PASS,
  REACT_BASE_URL: process.env.REACT_BASE_URL,
  API_SECRET: process.env.API_SECRET,
  BASIC_AUTH_USER: process.env.BASIC_AUTH_USER,
  BASIC_AUTH_PASS: process.env.BASIC_AUTH_PASS,
  BASE_URL: process.env.BASE_URL,
  BASE_PATH: process.env.BASE_PATH,
};
export const apiPrefix: any = {
  prefix: "/api/v1",
};
config({ path: envFile });
