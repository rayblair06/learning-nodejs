import express from 'express';
import * as UserService from './userService';
import { validateSchema } from './../utils';
import { createUserSchema, updateUserSchema } from './userSchema';

export const userRouter = express.Router();

/**
 * Router Definitions
 */
userRouter.get('/', async (request, response, next) => {
    try {
        const users = await UserService.findAll();

        response.status(200).send(users);
    } catch (error) {
        return next(error);
    }
});

userRouter.get('/suggest', async (request, response, next) => {
    try {
        const users = await UserService.getAutoSuggestUsers(request.query.login, request.query.limit);

        response.status(200).send(users);
    } catch (error) {
        return next(error);
    }
});

userRouter.get('/:id', async (request, response, next) => {
    try {
        const user = await UserService.findById(request.params.id);

        response.status(200).send(user);
    } catch (error) {
        return next(error);
    }
});

userRouter.post('/', validateSchema(createUserSchema), async (request, response, next) => {
    try {
        const user = await UserService.create(request.body);

        response.status(200).send(user);
    } catch (error) {
        return next(error);
    }
});

userRouter.post('/:id', validateSchema(updateUserSchema), async (request, response, next) => {
    try {
        const user = await UserService.update(request.params.id, request.body);

        response.status(200).send(user);
    } catch (error) {
        return next(error);
    }
});

userRouter.delete('/:id', async (request, response, next) => {
    try {
        await UserService.markAsDeleted(request.params.id);

        response.status(204).send();
    } catch (error) {
        return next(error);
    }
});
