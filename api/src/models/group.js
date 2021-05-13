import Sequelize from 'sequelize';
import { sequelize } from '../../data-access';
import { User } from './user';
import { UserGroup } from './userGroup';

export const Group = sequelize.define(
  'group',
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: Sequelize.STRING,
    permissions: Sequelize.ARRAY(
      Sequelize.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')
    )
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    },
    associate: () => {
      Group.belongsToMany(User, {
        through: UserGroup,
        onDelete: 'cascade',
        hooks: true
      });
    }
  }
);
