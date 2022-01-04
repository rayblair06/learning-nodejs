import express from 'express';
import * as GroupService from '../services/group';
import { validateSchema } from '../utilities/utils';
import { createGroupSchema, updateGroupSchema } from '../orm/group.schema';
import { StatusCodes } from 'http-status-codes';

export const groupRouter = express.Router();

/**
 * Router Definitions
 */
groupRouter.get('/', async (request, response, next) => {
    try {
        const groups = await GroupService.findAll();

        response.status(StatusCodes.OK).send(groups);
    } catch (error) {
        return next(error);
    }
});

groupRouter.get('/:id', async (request, response, next) => {
    try {
        const group = await GroupService.findById(request.params.id);

        response.status(StatusCodes.OK).send(group);
    } catch (error) {
        return next(error);
    }
});

groupRouter.post('/', validateSchema(createGroupSchema), async (request, response, next) => {
    try {
        const group = await GroupService.create(request.body);

        response.status(StatusCodes.OK).send(group);
    } catch (error) {
        return next(error);
    }
});

groupRouter.post('/:id', validateSchema(updateGroupSchema), async (request, response, next) => {
    try {
        const group = await GroupService.update(request.params.id, request.body);

        response.status(StatusCodes.OK).send(group);
    } catch (error) {
        return next(error);
    }
});

groupRouter.delete('/:id', async (request, response, next) => {
    try {
        await GroupService.deleteGroup(request.params.id);

        response.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        return next(error);
    }
});

groupRouter.post('/:id/addUsers', async (request, response, next) => {
    try {
        await GroupService.addUsersToGroup(request.params.id, request.body.userIds);

        response.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        return next(error);
    }
});
