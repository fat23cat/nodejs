import Joi from 'joi';

const isDeleted = Joi.boolean().required();
const login = Joi.string().required();
const password = Joi.string().required().alphanum();
const age = Joi.number().required().min(4).max(130);

export const schema = Joi.object({
  isDeleted,
  login,
  password,
  age
}).options({ abortEarly: false });
