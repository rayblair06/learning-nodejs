import { v4 as uuidv4 } from 'uuid';

import User from '../db/models/user';
import { UserNotFoundError } from '../exceptions/errors';

/**
 * Service Methods
 */
export const findAll = async () => {
    const users = await User.findAll();

    return users;
};

export const findById = async (id) => {
    const user = await User.findOne({
        where: {
            id
        }
    });

    if (!user) {
        throw new UserNotFoundError();
    }

    return user;
};

export const findByLogin = async (login) => {
    const user = await User.findOne({
        where: {
            login
        }
    });

    if (!user) {
        throw new UserNotFoundError();
    }

    return user;
};

export const create = async (data) => {
    const id = uuidv4();

    const user = await User.create({
        id,
        ...data
    });

    return user;
};

export const update = async (id, data) => {
    await User.update(data, {
        where: {
            id
        }
    });

    const user = await User.findOne({
        where: {
            id
        }
    });

    return user;
};

export const markAsDeleted = async (id) => {
    await User.update({
        isDeleted: true
    }, {
        where: {
            id
        }
    });

    return true;
};

export const getAutoSuggestUsers = async (loginSubstring, limit) => {
    const users = await User.findAll();

    return users.sort((a, b) => {
        return a.login > b.login ? 1 : -1;
    })
        .filter(user => user.login.includes(loginSubstring))
        .slice(0, limit);
};
