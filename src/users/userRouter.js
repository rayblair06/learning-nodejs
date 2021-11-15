import express from 'express';
import * as UserService from './userService';
import { validateSchema } from './../utils';
import { createUserSchema, updateUserSchema } from './userSchema';

export const userRouter = express.Router();

/**
 * Router Definitions
 */
userRouter.get('/', (req, res) => {
    const users = UserService.findAll();

    res.status(200).send(users);
});

userRouter.get('/suggest', (req, res) => {
    const users = UserService.getAutoSuggestUsers(req.query.login, req.query.limit);

    res.status(200).send(users);
});

userRouter.get('/:id', (req, res) => {
    const user = UserService.findById(req.params.id);

    res.status(200).send(user);
});

userRouter.post('/', validateSchema(createUserSchema), (req, res) => {
    const user = UserService.create(req.body);

    res.status(200).send(user);
});

userRouter.post('/:id', validateSchema(updateUserSchema), (req, res) => {
    const user = UserService.update(req.params.id, req.body);

    res.status(200).send(user);
});

userRouter.delete('/:id', (req, res) => {
    UserService.markAsDeleted(req.params.id);

    res.status(204).send();
});
