import Sequelize from 'sequelize';
import { sequelize } from '../../data-access';
export const UsersGroups = sequelize.define('users_groups', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  user_id: Sequelize.STRING,
  group_id: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});
