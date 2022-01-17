import * as UserService from '../../services/user';
import { StatusCodes } from 'http-status-codes';

export const getUsers = async (request, response, next) => {
    try {
        const users = await UserService.findAll();

        response.status(StatusCodes.OK).send(users);
    } catch (error) {
        return next(error);
    }
};

export const suggestUser = async (request, response, next) => {
    try {
        const users = await UserService.getAutoSuggestUsers(request.query.login, request.query.limit);

        response.status(StatusCodes.OK).send(users);
    } catch (error) {
        return next(error);
    }
};

export const getUser = async (request, response, next) => {
    try {
        const user = await UserService.findById(request.params.id);

        response.status(StatusCodes.OK).send(user);
    } catch (error) {
        return next(error);
    }
};

export const createUser = async (request, response, next) => {
    try {
        const user = await UserService.create(request.body);

        response.status(StatusCodes.OK).send(user);
    } catch (error) {
        return next(error);
    }
};

export const updateUser = async (request, response, next) => {
    try {
        const user = await UserService.update(request.params.id, request.body);

        response.status(StatusCodes.OK).send(user);
    } catch (error) {
        return next(error);
    }
};

export const deleteUser = async (request, response, next) => {
    try {
        await UserService.markAsDeleted(request.params.id);

        response.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        return next(error);
    }
};
