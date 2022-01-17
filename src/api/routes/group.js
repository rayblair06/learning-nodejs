import express from 'express';
import { validateSchema } from '../../utilities/utils';
import { createGroupSchema, updateGroupSchema } from '../../orm/group.schema';
import { groupController } from '../controllers';

export const router = express.Router();

router
    .get('/', groupController.getGroups)
    .get('/:id', groupController.getGroup)
    .post('/', validateSchema(createGroupSchema), groupController.createGroup)
    .post('/:id', validateSchema(updateGroupSchema), groupController.updateGroup)
    .delete('/:id', groupController.deleteGroup)
    .post('/:id/addUsers', groupController.addUsersToGroup);

export default router;
