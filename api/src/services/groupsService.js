import { Group } from '../models';

export class GroupsService {
  async getAllGroups() {
    return await Group.findAll({
      order: [['name', 'ASC']]
    });
  }

  async getGroupById(id) {
    return await Group.findAll({
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
}