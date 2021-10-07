import { registerAs } from '@nestjs/config';

export default registerAs('type-orm-mongodb', () => ({
  url: process.env.MONGODB_CONNECTION_STRING,
  database: process.env.MONGODB_DATABASE,
}));
