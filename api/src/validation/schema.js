import Joi from 'joi';

const login = Joi.string().required();
const password = Joi.string().min(7).alphanum().required();
const age = Joi.number().required().min(4).max(130);

const name = Joi.string().required();
const permissions = Joi.array()
  .items(
    Joi.string()
      .valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')
      .required()
  )
  .required();

const userIds = Joi.array().items(Joi.string().required()).required();

export const userSchema = Joi.object({
  login,
  password,
  age
}).options({ abortEarly: false });

export const groupSchema = Joi.object({
  name,
  permissions
}).options({ abortEarly: false });

export const addUserIdsSchema = Joi.object({
  userIds
}).options({ abortEarly: false });
