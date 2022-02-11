import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as GroupService from '../../services/group';


export const getGroups = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const groups = await GroupService.findAll();

        response.status(StatusCodes.OK).send(groups);
    } catch (error) {
        return next(error);
    }
};

export const getGroup = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const group = await GroupService.findById(request.params.id);

        response.status(StatusCodes.OK).send(group);
    } catch (error) {
        return next(error);
    }
};

export const createGroup = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const group = await GroupService.create(request.body);

        response.status(StatusCodes.OK).send(group);
    } catch (error) {
        return next(error);
    }
};

export const updateGroup = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const group = await GroupService.update(request.params.id, request.body);

        response.status(StatusCodes.OK).send(group);
    } catch (error) {
        return next(error);
    }
};

export const deleteGroup = async (request: Request, response: Response, next: NextFunction) => {
    try {
        await GroupService.deleteGroup(request.params.id);

        response.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        return next(error);
    }
};

export const addUsersToGroup = async (request: Request, response: Response, next: NextFunction) => {
    try {
        await GroupService.addUsersToGroup(request.params.id, request.body.userIds);

        response.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        return next(error);
    }
};
