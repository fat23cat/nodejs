import Sequelize from 'sequelize';
import db from '../models';

const User = db.user;

export class UsersService {
  async getAllUsers() {
    return await User.findAll({
      where: {
        isDeleted: false
      },
      include: db.group
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
