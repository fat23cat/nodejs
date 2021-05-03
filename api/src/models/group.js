import Sequelize from 'sequelize';
import { sequelize } from '../../data-access';

export const Group = sequelize.define(
  'groups',
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
    }
  }
);
