import express from 'express';
import * as UserService from '../services/user';
import { validateSchema } from '../utilities/utils';
import { createUserSchema, updateUserSchema } from '../orm/user.schema';
import { StatusCodes } from 'http-status-codes';

export const userRouter = express.Router();

/**
 * Router Definitions
 */
userRouter.get('/', async (request, response, next) => {
    try {
        const users = await UserService.findAll();

        response.status(StatusCodes.OK).send(users);
    } catch (error) {
        return next(error);
    }
});

userRouter.get('/suggest', async (request, response, next) => {
    try {
        const users = await UserService.getAutoSuggestUsers(request.query.login, request.query.limit);

        response.status(StatusCodes.OK).send(users);
    } catch (error) {
        return next(error);
    }
});

userRouter.get('/:id', async (request, response, next) => {
    try {
        const user = await UserService.findById(request.params.id);

        response.status(StatusCodes.OK).send(user);
    } catch (error) {
        return next(error);
    }
});

userRouter.post('/', validateSchema(createUserSchema), async (request, response, next) => {
    try {
        const user = await UserService.create(request.body);

        response.status(StatusCodes.OK).send(user);
    } catch (error) {
        return next(error);
    }
});

userRouter.post('/:id', validateSchema(updateUserSchema), async (request, response, next) => {
    try {
        const user = await UserService.update(request.params.id, request.body);

        response.status(StatusCodes.OK).send(user);
    } catch (error) {
        return next(error);
    }
});

userRouter.delete('/:id', async (request, response, next) => {
    try {
        await UserService.markAsDeleted(request.params.id);

        response.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        return next(error);
    }
});
