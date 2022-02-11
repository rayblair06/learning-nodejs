import jwt from 'jsonwebtoken';

import { config } from '../config';
import { TokenExpiredError } from '../exceptions/errors';
import { logger } from '../loaders/logger';


const appKey:string = config.APP_KEY!;


/**
 * Service Methods
 */
export const createToken = (user) => {
    return jwt.sign({
        'sub' : user.id,
        'isDeleted' : user.isDeleted
    },
    appKey,
    {
        expiresIn: 600
    });
};

export const verifyToken = (token) => {
    return jwt.verify(token, appKey, (error) => {
        if (error) {
            logger.error({
                error : `Failed to authenticate token : ${error}`
            });

            throw new TokenExpiredError();
        }

        return true;
    });
};
