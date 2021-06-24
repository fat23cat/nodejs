import {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroupById,
  deleteGroupById,
  addUsersToGroup
} from '../groupsController';
import { groupsService } from '../../services';
import {
  groups,
  mockRes,
  mockReq,
  mockNext,
  group,
  groupNotFoundMessage,
  updatedGroup,
  serverErrorMessage
} from '../../mocks';

describe('GroupsController', () => {
  afterEach(jest.clearAllMocks);
  describe('getAllGroups', () => {
    it('should return 200 getAllGroups response', async () => {
      const getAllGroupsSpy = jest.spyOn(groupsService, 'getAllGroups');
      getAllGroupsSpy.mockResolvedValueOnce(groups);

      await getAllGroups(mockReq, mockRes, mockNext);

      expect(getAllGroupsSpy).toBeCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ groups });
    });
  });

  describe('getGroupById', () => {
    const getGroupByIdSpy = jest.spyOn(groupsService, 'getGroupById');

    it('should return 200 getGroupById response', async () => {
      const req = {
        ...mockReq
      };
      req.params.groupId = group.id;
      getGroupByIdSpy.mockResolvedValueOnce(group);

      await getGroupById(req, mockRes, mockNext);

      expect(getGroupByIdSpy).toBeCalledWith(group.id);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(group);
    });

    it('should return 404 getGroupById response', async () => {
      const req = {
        ...mockReq
      };
      req.params.groupId = group.id;
      getGroupByIdSpy.mockResolvedValueOnce(null);

      await getGroupById(req, mockRes, mockNext);

      expect(getGroupByIdSpy).toBeCalledWith(group.id);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(groupNotFoundMessage);
    });
  });

  describe('createGroup', () => {
    const req = {
      ...mockReq
    };
    req.params.name = group.name;
    req.params.permissions = group.permissions;
    const createGroupSpy = jest.spyOn(groupsService, 'createGroup');
    const getGroupByIdSpy = jest.spyOn(groupsService, 'getGroupById');
    jest.mock('uuid', () => {
      return {
        v4: jest.fn(() => '1')
      };
    });
    it('should return 200 createGroup response', async () => {
      createGroupSpy.mockResolvedValueOnce(group);
      getGroupByIdSpy.mockResolvedValueOnce(group);

      await createGroup(req, mockRes, mockNext);

      expect(createGroupSpy).toBeCalled();
      expect(getGroupByIdSpy).toBeCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(group);
    });
  });

  describe('updateGroupById', () => {
    const getGroupByIdSpy = jest.spyOn(groupsService, 'getGroupById');
    const updateGroupByIdSpy = jest.spyOn(groupsService, 'updateGroupById');

    it('should return 200 updateGroupById response', async () => {
      const req = {
        ...mockReq
      };
      req.params.groupId = group.id;
      req.body.name = updatedGroup.name;
      getGroupByIdSpy.mockResolvedValueOnce(group);
      updateGroupByIdSpy.mockResolvedValueOnce(Promise.resolve());

      await updateGroupById(mockReq, mockRes, mockNext);

      expect(getGroupByIdSpy).toBeCalled();
      expect(updateGroupByIdSpy).toBeCalled();
      expect(mockRes.sendStatus).toHaveBeenCalledWith(200);
    });

    it('should return 404 updateGroupById response', async () => {
      const req = {
        ...mockReq
      };
      req.params.groupId = group.id;
      getGroupByIdSpy.mockResolvedValueOnce(null);

      await getGroupById(req, mockRes, mockNext);

      expect(getGroupByIdSpy).toBeCalledWith(group.id);
      expect(updateGroupByIdSpy).not.toBeCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(groupNotFoundMessage);
    });
  });

  describe('deleteGroupById', () => {
    const deleteGroupByIdSpy = jest.spyOn(groupsService, 'deleteGroupById');
    const getGroupByIdSpy = jest.spyOn(groupsService, 'getGroupById');

    it('should return 200 deleteGroupById response', async () => {
      const req = {
        ...mockReq
      };
      req.params.groupId = group.id;
      deleteGroupByIdSpy.mockResolvedValueOnce(Promise.resolve());
      getGroupByIdSpy.mockResolvedValueOnce(group);

      await deleteGroupById(req, mockRes, mockNext);

      expect(getGroupByIdSpy).toBeCalled();
      expect(deleteGroupByIdSpy).toBeCalled();
      expect(mockRes.sendStatus).toHaveBeenCalledWith(200);
    });

    it('should return 404 deleteGroupById response', async () => {
      getGroupByIdSpy.mockResolvedValueOnce(null);

      await deleteGroupById(mockReq, mockRes, mockNext);

      expect(getGroupByIdSpy).toBeCalled();
      expect(deleteGroupByIdSpy).not.toBeCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(groupNotFoundMessage);
    });
  });

  describe('addUsersToGroup', () => {
    const addUsersToGroupSpy = jest.spyOn(groupsService, 'addUsersToGroup');

    it('should return 200 addUsersToGroup response', async () => {
      addUsersToGroupSpy.mockResolvedValueOnce(Promise.resolve());

      await addUsersToGroup(mockReq, mockRes, mockNext);

      expect(addUsersToGroupSpy).toBeCalled();
      expect(mockRes.sendStatus).toHaveBeenCalledWith(200);
    });

    it('should return 500 addUsersToGroup response', async () => {
      addUsersToGroupSpy.mockResolvedValueOnce(Promise.reject());

      await addUsersToGroup(mockReq, mockRes, mockNext);

      expect(addUsersToGroupSpy).toBeCalled();
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(serverErrorMessage);
    });
  });
});
