module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('groups', [
      {
        id: '5e1c3a9b-1dc0-4312-aab6-075661d1c7b9',
        name: 'readonly',
        permissions: Sequelize.literal(
          `ARRAY['READ']::"enum_groups_permissions"[]`
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '5214c0a3-da71-4613-904f-b6f05dadafd1',
        name: 'users',
        permissions: Sequelize.literal(
          `ARRAY['READ', 'WRITE']::"enum_groups_permissions"[]`
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'ed37388d-8e81-48a9-a062-cfc026737593',
        name: 'admins',
        permissions: Sequelize.literal(
          `ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']::"enum_groups_permissions"[]`
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface) => {
    return queryInterface.bulkDelete('groups', null, {});
  }
};
