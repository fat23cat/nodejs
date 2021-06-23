export const group = {
  id: 'ed37388d-8e81-48a9-a062-cfc026737593',
  name: 'admins',
  permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
};

export const updatedGroup = {
  ...group,
  name: 'fake'
};

export const groups = [group];

export const groupNotFoundMessage = {
  message: `Group id ${group.id} does not exist`
};

export const serverErrorMessage = {
  message: 'Server error'
};
