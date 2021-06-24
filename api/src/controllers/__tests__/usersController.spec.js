import {
  mockRes,
  mockReq,
  mockNext,
  user,
  users,
  userNotFoundMessage,
  updatedUser
} from '../../mocks';
import { usersService } from '../../services';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
} from '../usersController';
describe('UsersController', () => {
  afterEach(jest.clearAllMocks);

  describe('getAllUsers', () => {
    const getAllUsersSpy = jest.spyOn(usersService, 'getAllUsers');
    const getAllUsersSuggestionsSpy = jest.spyOn(
      usersService,
      'getAllUsersSuggestions'
    );

    it('should return 200 getAllUsers response and all users', async () => {
      getAllUsersSpy.mockResolvedValueOnce([user]);

      await getAllUsers(mockReq, mockRes, mockNext);

      expect(getAllUsersSpy).toBeCalled();
      expect(getAllUsersSuggestionsSpy).not.toBeCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(users);
    });

    it('should return 200 getAllUsers response and all suggested users', async () => {
      const req = {
        ...mockReq
      };
      req.query.query = user.login;

      getAllUsersSuggestionsSpy.mockResolvedValueOnce([user]);

      await getAllUsers(mockReq, mockRes, mockNext);

      expect(getAllUsersSpy).not.toBeCalled();
      expect(getAllUsersSuggestionsSpy).toBeCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(users);
    });
  });

  describe('getUserById', () => {
    const getUserByIdSpy = jest.spyOn(usersService, 'getUserById');

    it('should return 200 getUserById response', async () => {
      const req = {
        ...mockReq
      };
      req.params.userId = user.id;
      getUserByIdSpy.mockResolvedValueOnce(user);

      await getUserById(req, mockRes, mockNext);

      expect(getUserByIdSpy).toBeCalledWith(user.id);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(user);
    });

    it('should return 404 getUserById response', async () => {
      getUserByIdSpy.mockResolvedValueOnce(null);

      await getUserById(mockReq, mockRes, mockNext);

      expect(getUserByIdSpy).toBeCalledWith(user.id);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(userNotFoundMessage);
    });
  });

  describe('createUser', () => {
    const createUserSpy = jest.spyOn(usersService, 'createUser');
    const getUserByIdSpy = jest.spyOn(usersService, 'getUserById');
    jest.mock('uuid', () => {
      return {
        v4: jest.fn(() => '1')
      };
    });
    it('should return 200 createUser response', async () => {
      createUserSpy.mockResolvedValueOnce(user);
      getUserByIdSpy.mockResolvedValueOnce(user);

      await createUser(mockReq, mockRes, mockNext);

      expect(createUserSpy).toBeCalled();
      expect(getUserByIdSpy).toBeCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(user);
    });
  });

  describe('updateUserById', () => {
    const getUserByIdSpy = jest.spyOn(usersService, 'getUserById');
    const updateUserByIdSpy = jest.spyOn(usersService, 'updateUserById');

    it('should return 200 updateUserById response', async () => {
      const req = {
        ...mockReq
      };
      req.params.userId = user.id;
      req.body.age = updatedUser.age;
      req.body.password = 'test';
      getUserByIdSpy.mockResolvedValueOnce(user);
      updateUserByIdSpy.mockResolvedValueOnce(Promise.resolve());

      await updateUserById(req, mockRes, mockNext);

      expect(getUserByIdSpy).toBeCalledWith(user.id);
      expect(updateUserByIdSpy).toBeCalled();
      expect(mockRes.sendStatus).toHaveBeenCalledWith(200);
    });

    it('should return 404 updateUserById response', async () => {
      const req = {
        ...mockReq
      };
      req.params.userId = user.id;
      getUserByIdSpy.mockResolvedValueOnce(null);

      await updateUserById(req, mockRes, mockNext);

      expect(getUserByIdSpy).toBeCalledWith(user.id);
      expect(updateUserByIdSpy).not.toBeCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(userNotFoundMessage);
    });
  });

  describe('deleteUserById', () => {
    const deleteUserByIdSpy = jest.spyOn(usersService, 'deleteUserById');
    const getUserByIdSpy = jest.spyOn(usersService, 'getUserById');

    it('should return 200 deleteUserById response', async () => {
      const req = {
        ...mockReq
      };
      req.params.userId = user.id;
      deleteUserByIdSpy.mockResolvedValueOnce(Promise.resolve());
      getUserByIdSpy.mockResolvedValueOnce(user);

      await deleteUserById(req, mockRes, mockNext);

      expect(getUserByIdSpy).toBeCalled();
      expect(deleteUserByIdSpy).toBeCalled();
      expect(mockRes.sendStatus).toHaveBeenCalledWith(200);
    });

    it('should return 404 deleteUserById response', async () => {
      getUserByIdSpy.mockResolvedValueOnce(null);

      await deleteUserById(mockReq, mockRes, mockNext);

      expect(getUserByIdSpy).toBeCalled();
      expect(deleteUserByIdSpy).not.toBeCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(userNotFoundMessage);
    });
  });
});
