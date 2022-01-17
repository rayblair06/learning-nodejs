import express from 'express';
import { validateSchema } from '../../utilities/utils';
import { createUserSchema, updateUserSchema } from '../../orm/user.schema';
import { userController } from '../controllers';

export const router = express.Router();

router.get('/', userController.getUsers)
    .get('/suggest', userController.suggestUser)
    .get('/:id', userController.getUser)
    .post('/', validateSchema(createUserSchema), userController.createUser)
    .post('/:id', validateSchema(updateUserSchema), userController.updateUser)
    .delete('/:id', userController.deleteUser);

export default router;
