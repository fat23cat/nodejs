const { customAlphabet } = require('nanoid');

const generateUserId = customAlphabet('1234567890abcdef', 10);
const generateUserPassword = customAlphabet('1234567890abcdef', 15);

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        id: generateUserId(),
        isDeleted: false,
        login: 'Alex',
        password: generateUserPassword(),
        age: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: generateUserId(),
        isDeleted: false,
        login: 'Marco',
        password: generateUserPassword(),
        age: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: generateUserId(),
        isDeleted: false,
        login: 'Alexa',
        password: generateUserPassword(),
        age: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: generateUserId(),
        isDeleted: false,
        login: 'Paul',
        password: generateUserPassword(),
        age: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: generateUserId(),
        isDeleted: true,
        login: 'Anna',
        password: generateUserPassword(),
        age: 14,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
