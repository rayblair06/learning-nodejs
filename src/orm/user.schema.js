import * as Joi from 'joi';

const login = Joi.string().required();
const password = Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required();
const age = Joi.number().integer().min(4).max(130).required();

export const createUserSchema = Joi.object({
    login,
    password,
    age
});

export const updateUserSchema = Joi.object({
    login,
    password,
    age
});
