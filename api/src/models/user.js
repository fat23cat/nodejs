const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      age: DataTypes.INTEGER,
      isDeleted: DataTypes.BOOLEAN
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

  User.associate = (models) => {
    User.belongsToMany(models.group, {
      through: 'users_groups',
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
  };

  return User;
};
