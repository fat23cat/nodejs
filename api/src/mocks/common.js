export const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  sendStatus: jest.fn()
};
export const mockReq = { query: {}, body: {}, params: {} };
export const mockNext = jest.fn();
