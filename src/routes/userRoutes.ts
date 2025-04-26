import express from 'express';
import * as userCtrl from '../controllers/userController';
import { createUserSchema, updateUserSchema } from '../schemas/userSchemas';
import { validate } from '../middlewares/validate';

const router = express.Router();

router.get('/',    userCtrl.list);
router.get('/:id', userCtrl.getOne);

// validamos antes de crear
router.post('/', validate(createUserSchema), userCtrl.create);

// validamos antes de actualizar
router.put('/:id', validate(updateUserSchema), userCtrl.update);

router.delete('/:id', userCtrl.remove);

export default router;
