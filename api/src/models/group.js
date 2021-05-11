module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    'group',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      name: DataTypes.STRING,
      permissions: DataTypes.ARRAY(
        DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')
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

  Group.associate = (models) => {
    Group.belongsToMany(models.user, {
      through: 'users_groups',
      foreignKey: 'group_id',
      onDelete: 'CASCADE'
    });
  };

  return Group;
};
