import { sequelize } from '../../data-access';
import { Group, UsersGroups } from '../models';
import { v4 as uuidv4 } from 'uuid';

class GroupsService {
  async getAllGroups() {
    return await Group.findAll({
      order: [['name', 'ASC']]
    });
  }

  async getGroupById(id) {
    return await Group.findOne({
      where: {
        id
      }
    });
  }

  async createGroup(group) {
    return await Group.create(group);
  }

  async updateGroup(group, id) {
    return await Group.update(group, {
      where: {
        id
      }
    });
  }

  async deleteGroup(id) {
    return await Group.destroy({
      where: {
        id
      }
    });
  }

  async addUsersToGroup(group_id, usersIds) {
    return await sequelize.transaction(async (transaction) => {
      for (const user_id of usersIds) {
        await UsersGroups.create(
          { id: uuidv4(), user_id, group_id },
          { transaction }
        );
      }
    });
  }
}

export const groupsService = new GroupsService();
