
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as AuthService from '../../services/auth';
import * as UserService from '../../services/user';


export const login = async (request: Request, response: Response, next: NextFunction) => {
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

        const token = AuthService.createToken(user);

        return response.send({ token });
    } catch (error) {
        return next(error);
    }
};
