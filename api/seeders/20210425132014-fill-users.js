const { customAlphabet } = require('nanoid');
const bcrypt = require('bcrypt');

const generateUserId = customAlphabet('1234567890abcdef', 10);
const generateUserPassword = customAlphabet('1234567890abcdef', 15);

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        id: generateUserId(),
        isDeleted: false,
        login: 'Alex',
        password: await bcrypt.hash(generateUserPassword(), 10),
        age: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: generateUserId(),
        isDeleted: false,
        login: 'Marco',
        password: await bcrypt.hash(generateUserPassword(), 10),
        age: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: generateUserId(),
        isDeleted: false,
        login: 'Alexa',
        password: await bcrypt.hash(generateUserPassword(), 10),
        age: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: generateUserId(),
        isDeleted: false,
        login: 'Paul',
        password: await bcrypt.hash(generateUserPassword(), 10),
        age: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: generateUserId(),
        isDeleted: true,
        login: 'Anna',
        password: await bcrypt.hash(generateUserPassword(), 10),
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
