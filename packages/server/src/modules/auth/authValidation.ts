import Joi from 'joi';

export const loginValidate = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).max(30).required(),
});
