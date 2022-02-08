import jwt from 'jsonwebtoken';

import { TokenExpiredError } from '../exceptions/errors';
import { logger } from '../loaders/logger';


/**
 * Service Methods
 */
export const createToken = (user) => {
    return jwt.sign({
        'sub' : user.id,
        'isDeleted' : user.isDeleted
    },
    process.env.APP_KEY,
    {
        expiresIn: 600
    });
};

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.APP_KEY, (error) => {
        if (error) {
            logger.error({
                error : `Failed to authenticate token : ${error}`
            });

            throw new TokenExpiredError();
        }

        return true;
    });
};
