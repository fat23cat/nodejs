import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import { sequelize } from '../../data-access';
import { Group } from './group';
import { UserGroup } from './userGroup';

export const User = sequelize.define(
  'user',
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
      }
    },
    associate: () => {
      User.belongsToMany(Group, {
        through: UserGroup,
        onDelete: 'cascade',
        hooks: true
      });
    }
  }
);
