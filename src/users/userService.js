import { v4 as uuidv4 } from 'uuid';
import { UserNotFoundError } from './../errors';

/**
 * In-Memory Store
 */
const users = [
    {
        id: '6f7a7188-5b7d-4dbb-8a43-12031b94971e',
        login: 'John Doe',
        password: 'secret',
        age: 21,
        isDeleted: false
    },
    {
        id: '7e4e5a21-42c2-46a8-add1-ea799f547d5f',
        login: 'Jane Doe',
        password: 'secret',
        age: 25,
        isDeleted: false
    },
    {
        id: '1ab97ffa-bbef-4619-89d6-7aa218444353',
        login: 'John Carmack',
        password: 'secret',
        age: 55,
        isDeleted: false
    }
];

/**
 * Service Methods
 */
export const findAll = () => {
    return users;
};

export const findById = (id) => {
    const user = users.find(item => item.id === id);

    if (!user) {
        throw new UserNotFoundError();
    }

    return user;
};

export const create = (data) => {
    const id = uuidv4();

    users.push({
        id,
        ...data
    });

    return findById(id);
};

export const update = (id, data) => {
    const user = findById(id);

    if (!user) {
        throw new UserNotFoundError();
    }

    users[users.indexOf(user)] = {
        id,
        ...data
    };

    return findById(id);
};

export const markAsDeleted = (id) => {
    const user = findById(id);

    if (!user) {
        throw new UserNotFoundError();
    }

    user.isDeleted = true;

    return true;
};

export const getAutoSuggestUsers = (loginSubstring, limit) => {
    return users
        .sort((a, b) => {
            return a.login > b.login ? 1 : -1;
        })
        .filter(user => user.login.includes(loginSubstring))
        .slice(0, limit);
};
