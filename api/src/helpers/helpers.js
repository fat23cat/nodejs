export const createValidationErrorMessage = (errors) => {
  return `Validation failed: ${errors.map((err) => err.message).join(', ')}`;
};

export const stringifyParams = (params) => {
  return Object.keys(params)
    .map((key) => {
      return key === 'password' ? `${key}=*hidden*` : `${key}=${params[key]}`;
    })
    .join(', ');
};
