import { v4 as uuidv4 } from 'uuid';
import { GroupNotFoundError } from '../exceptions/errors';
import Group from './../db/models/group';

/**
 * Service Methods
 */
export const findAll = async () => {
    const groups = await Group.findAll();

    return groups;
};

export const findById = async (id) => {
    const group = await Group.findOne({
        where: {
            id
        }
    });

    if (!group) {
        throw new GroupNotFoundError();
    }

    return group;
};

export const create = async (data) => {
    const id = uuidv4();

    const group = await Group.create({
        id,
        ...data
    });

    return group;
};

export const update = async (id, data) => {
    await Group.update(data, {
        where: {
            id
        }
    });

    const group = await Group.findOne({
        where: {
            id
        }
    });

    return group;
};

export const deleteGroup = async (id) => {
    await Group.destroy({
        where: {
            id
        }
    });

    return true;
};
