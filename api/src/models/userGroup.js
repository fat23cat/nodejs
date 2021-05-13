import Sequelize from 'sequelize';
import { sequelize } from '../../data-access';
export const UserGroup = sequelize.define('user_group', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  user_id: Sequelize.STRING,
  group_id: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
});
