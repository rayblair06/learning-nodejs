import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import * as UserService from '../../services/user';

import { logger } from './../../loaders/logger';


export const login = async (request, response, next) => {
    try {
        const user = await UserService.findByLogin(request.body.username);

        if (user === undefined || user.password !== request.body.password) {
            response
                .status(StatusCodes.FORBIDDEN)
                .send({
                    success: false,
                    message: 'Bad username/password combination.'
                });
        }

        if (!process.env.APP_KEY) {
            logger.error('No Application Key');

            return response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send({
                    success : false,
                    message: 'Something went wrong.'
                });
        }

        const token = jwt.sign({
            'sub' : user.id,
            'isDeleted' : user.isDeleted
        },
        process.env.APP_KEY,
        {
            expiresIn: 600
        });

        return response.send({ token });
    } catch (error) {
        return next(error);
    }
};
