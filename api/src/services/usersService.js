import Sequelize from 'sequelize';
import { User } from '../models/index.js';

class UsersService {
  async getAllUsers() {
    return await User.findAll({
      where: {
        isDeleted: false
      }
    });
  }

  async getAllUsersSuggestions(query, limit) {
    return await User.findAll({
      order: [['login', 'ASC']],
      limit,
      where: {
        isDeleted: false,
        login: { [Sequelize.Op.iLike]: `%${query}%` }
      }
    });
  }

  async getUserByLogin(login) {
    const user = await User.findOne({
      where: { login, isDeleted: false },
      attributes: {
        include: ['password']
      }
    });
    return user;
  }

  async getUserById(id) {
    return await User.findOne({
      where: {
        isDeleted: false,
        id
      }
    });
  }

  async createUser(user) {
    return await User.create(user);
  }

  async updateUserById(user, id) {
    return await User.update(user, {
      where: {
        id
      }
    });
  }

  async deleteUserById(id) {
    return await User.destroy({
      where: {
        id
      },
      individualHooks: true
    });
  }
}

export const usersService = new UsersService();
