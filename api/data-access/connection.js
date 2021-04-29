import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('node-db', 'postgres', '', {
  host: 'localhost',
  dialect: 'postgres'
});
