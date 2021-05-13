module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users_groups', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      group_id: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'groups',
          key: 'id'
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: async (queryInterface) => {
    return queryInterface.dropTable('users_groups');
  }
};
