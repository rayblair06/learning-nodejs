import express from 'express';

import { checkToken } from '../../loaders/middleware';
import { createUserSchema, updateUserSchema } from '../../orm/user.schema';
import { validateSchema } from '../../utilities/utils';
import { userController } from '../controllers';


export const router = express.Router();

router.get('/', checkToken, userController.getUsers)
    .get('/suggest', checkToken, userController.suggestUser)
    .get('/:id', checkToken, userController.getUser)
    .post('/', checkToken, validateSchema(createUserSchema), userController.createUser)
    .post('/:id', checkToken, validateSchema(updateUserSchema), userController.updateUser)
    .delete('/:id', checkToken, userController.deleteUser);

export default router;
