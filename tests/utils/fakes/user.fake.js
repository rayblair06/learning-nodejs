import User from '../../../src/db/models/user';
import * as UserDummie from '../dummies/user.dummie';
import { mockModel } from '../mocks/model.mock';


export const findAll = (data) => {
    mockModel(
        User,
        'findAll',
        data ?? UserDummie.findAll
    );
};

export const findOne = (data) => {
    mockModel(
        User,
        'findOne',
        data ?? UserDummie.findOne
    );
};

export const create = (data) => {
    mockModel(
        User,
        'create',
        data ?? UserDummie.create
    );
};

export const update = (data) => {
    mockModel(
        User,
        'update',
        data ?? UserDummie.update
    );
};
