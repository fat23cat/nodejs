module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users_groups', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      user_id: Sequelize.STRING,
      group_id: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: async (queryInterface) => {
    return queryInterface.dropTable('users_groups');
  }
};
