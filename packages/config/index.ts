import dotenv from 'dotenv';
import path from 'path';

// dotenv.config({ path: './.env' }); // Load .env file for shared configurations

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL!,
  // add more shared values
};
