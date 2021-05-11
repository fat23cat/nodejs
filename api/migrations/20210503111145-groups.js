module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('groups', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      name: Sequelize.STRING,
      permissions: Sequelize.ARRAY(
        Sequelize.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')
      ),
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: async (queryInterface) => {
    return queryInterface.dropTable('groups');
  }
};
