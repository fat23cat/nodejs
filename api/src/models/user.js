import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from '../../data-access';

export const User = sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    login: Sequelize.STRING,
    password: Sequelize.STRING,
    age: Sequelize.INTEGER,
    isDeleted: Sequelize.BOOLEAN
  },
  {
    defaultScope: {
      attributes: {
        exclude: [
          'password',
          'isDeleted',
          'createdAt',
          'updatedAt',
          'deletedAt'
        ]
      }
    },
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
        user.isDeleted = false;
      },
      afterDestroy: async (user) => {
        user.isDeleted = true;
        await user.save();
      }
    },
    paranoid: true
  }
);
