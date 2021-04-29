import Sequelize from 'sequelize';
import { User } from '../models';

export class UsersService {
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

  async getUserById(id) {
    return await User.findAll({
      where: {
        isDeleted: false,
        id
      }
    });
  }

  async createUser(user) {
    return await User.create(user);
  }

  async updateUser(user, id) {
    return await User.update(user, {
      where: {
        id
      }
    });
  }

  async deleteUser(id) {
    return await User.destroy({
      where: {
        id
      },
      individualHooks: true
    });
  }
}
