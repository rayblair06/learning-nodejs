import * as Joi from 'joi';
import { Permissions } from './../db/models/group';


const name = Joi.string().required();
const permissions = Joi.array().items(...Permissions).required();

export const createGroupSchema = Joi.object({
    name,
    permissions
});

export const updateGroupSchema = Joi.object({
    name,
    permissions
});
