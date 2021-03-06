module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      login: Sequelize.STRING,
      password: Sequelize.STRING,
      age: Sequelize.INTEGER,
      isDeleted: Sequelize.BOOLEAN,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE
    });
  },
  down: async (queryInterface) => {
    return queryInterface.dropTable('users');
  }
};
