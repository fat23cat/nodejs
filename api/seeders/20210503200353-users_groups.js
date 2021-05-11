module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('users_groups', [
      {
        id: '0e1c3339-2915-4f76-bcc4-f6814f65d037',
        user_id: '1e8d50e5-a4a8-42d4-9f8b-4c5ad766320d',
        group_id: '5e1c3a9b-1dc0-4312-aab6-075661d1c7b9',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'dc5e0e43-d2df-4cc9-b643-610c3b1ca4ac',
        user_id: 'a4ebf9dd-51ec-4a0f-9519-31a23fd044a3',
        group_id: '5214c0a3-da71-4613-904f-b6f05dadafd1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'ba1fb801-99c4-4d6a-9d21-cd05b98acdca',
        user_id: '2727d5fa-4394-4d4b-80fa-ef462f09f05f',
        group_id: '5214c0a3-da71-4613-904f-b6f05dadafd1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '83fd8473-770b-4cb9-9645-5c07f20a7120',
        user_id: 'e377d3ae-2068-405a-955c-8a1210e90eb3',
        group_id: '5214c0a3-da71-4613-904f-b6f05dadafd1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '94b0a713-d661-4bb7-b05b-64d96572a1b8',
        user_id: 'f90c6b08-ea8c-4be4-b052-c6cfca92dd04',
        group_id: 'ed37388d-8e81-48a9-a062-cfc026737593',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface) => {
    return queryInterface.bulkDelete('users_groups', null, {});
  }
};
