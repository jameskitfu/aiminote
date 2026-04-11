import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_NAME = 'aiminote',
  DB_USER = 'root',
  DB_PASSWORD = '',
} = process.env;

export const sequelize = new Sequelize({
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  dialect: 'sqlite',
  storage: ':memory:',
  logging: process.env['NODE_ENV'] === 'development' ? console.log : false,
});
