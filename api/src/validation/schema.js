import Joi from 'joi';

const login = Joi.string().required();
const password = Joi.string().min(7).alphanum().required();
const age = Joi.number().required().min(4).max(130);

export const schema = Joi.object({
  login,
  password,
  age
}).options({ abortEarly: false });
