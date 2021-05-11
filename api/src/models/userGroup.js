module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('user_group', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    group_id: {
      type: DataTypes.STRING,
      references: {
        model: 'groups',
        key: 'id'
      }
    }
  });

  return UserGroup;
};
