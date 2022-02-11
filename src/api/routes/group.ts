import express from 'express';

import { checkToken } from '../../loaders/middleware';
import { createGroupSchema, updateGroupSchema } from '../../orm/group.schema';
import { validateSchema } from '../../utilities/utils';
import { groupController } from '../controllers';


export const router = express.Router();

router
    .get('/', checkToken, groupController.getGroups)
    .get('/:id', checkToken, groupController.getGroup)
    .post('/', checkToken, validateSchema(createGroupSchema), groupController.createGroup)
    .post('/:id', checkToken, validateSchema(updateGroupSchema), groupController.updateGroup)
    .delete('/:id', checkToken, groupController.deleteGroup)
    .post('/:id/addUsers', checkToken, groupController.addUsersToGroup);

export default router;
