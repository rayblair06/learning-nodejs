import express from 'express';
import * as UserService from './userService';
import { validateSchema } from './../utils';
import { createUserSchema, updateUserSchema } from './userSchema';

export const userRouter = express.Router();

/**
 * Router Definitions
 */
userRouter.get('/', (req, res) => {
    try {
        const users = UserService.findAll();

        res.status(200).send(users);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

userRouter.get('/suggest', (req, res) => {
    try {
        const users = UserService.getAutoSuggestUsers(req.query.login, req.query.limit);

        res.status(200).send(users);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

userRouter.get('/:id', (req, res) => {
    try {
        const user = UserService.findById(req.params.id);

        res.status(200).send(user);
    } catch (e) {
        if (e === 'User not found') {
            res.status(404).send(e);
        } else {
            res.status(500).send(e.message);
        }
    }
});

userRouter.post('/', validateSchema(createUserSchema), (req, res) => {
    try {
        const user = UserService.create(req.body);

        res.status(200).send(user);
    } catch (e) {
        if (e === 'User not found') {
            res.status(404).send(e);
        } else {
            res.status(500).send(e.message);
        }
    }
});

userRouter.post('/:id', validateSchema(updateUserSchema), (req, res) => {
    try {
        const user = UserService.update(req.params.id, req.body);

        res.status(200).send(user);
    } catch (e) {
        if (e === 'User not found') {
            res.status(404).send(e);
        } else {
            res.status(500).send(e.message);
        }
    }
});

userRouter.delete('/:id', (req, res) => {
    try {
        UserService.markAsDeleted(req.params.id);

        res.status(204).send();
    } catch (e) {
        if (e === 'User not found') {
            res.status(404).send(e);
        } else {
            res.status(500).send(e.message);
        }
    }
});
