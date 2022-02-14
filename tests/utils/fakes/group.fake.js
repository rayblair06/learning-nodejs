import Group from '../../../src/db/models/group';
import * as GroupService from '../../../src/services/group';
import * as GroupDummie from '../dummies/group.dummie';
import { mockModel } from '../mocks/model.mock';


export const findAll = (data) => {
    mockModel(
        Group,
        'findAll',
        data ?? GroupDummie.findAll
    );
};

export const findOne = (data) => {
    mockModel(
        Group,
        'findOne',
        data ?? GroupDummie.findOne
    );
};

export const create = (data) => {
    mockModel(
        Group,
        'create',
        data ?? GroupDummie.create
    );
};

export const update = (data) => {
    mockModel(
        Group,
        'update',
        data ?? GroupDummie.update
    );
};

export const destroy = (data) => {
    mockModel(
        Group,
        'destroy',
        data ?? GroupDummie.destroy
    );
};

export const addUsersToGroup = (data) => {
    mockModel(
        GroupService,
        'addUsersToGroup',
        data ?? GroupDummie.addUsersToGroup
    );
};
