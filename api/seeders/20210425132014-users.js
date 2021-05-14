const { customAlphabet } = require('nanoid');
const bcrypt = require('bcrypt');

const generateUserPassword = customAlphabet('1234567890abcdef', 15);

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        id: '1e8d50e5-a4a8-42d4-9f8b-4c5ad766320d',
        isDeleted: false,
        login: 'Alex',
        password: await bcrypt.hash(generateUserPassword(), 10),
        age: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'a4ebf9dd-51ec-4a0f-9519-31a23fd044a3',
        isDeleted: false,
        login: 'Marco',
        password: await bcrypt.hash(generateUserPassword(), 10),
        age: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2727d5fa-4394-4d4b-80fa-ef462f09f05f',
        isDeleted: false,
        login: 'Alexa',
        password: await bcrypt.hash(generateUserPassword(), 10),
        age: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'e377d3ae-2068-405a-955c-8a1210e90eb3',
        isDeleted: false,
        login: 'Paul',
        password: await bcrypt.hash(generateUserPassword(), 10),
        age: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'f90c6b08-ea8c-4be4-b052-c6cfca92dd04',
        isDeleted: false,
        login: 'Anna',
        password: await bcrypt.hash(generateUserPassword(), 10),
        age: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'ce482222-d5d6-4b87-a9fa-6a20a550c594',
        isDeleted: false,
        login: 'Matthew',
        password: await bcrypt.hash(generateUserPassword(), 10),
        age: 99,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
