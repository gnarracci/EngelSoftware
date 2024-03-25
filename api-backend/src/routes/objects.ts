import { Router } from 'express';

const router: Router = Router();


import { AuthJwt } from '../libs';
import { deleteObject, getObject, getObjects, saveObject, updateObject} from '../controllers/object.controller';

router.get('/', [AuthJwt.TokenValidation], getObjects);
router.get('/:id', [AuthJwt.TokenValidation], getObject);
router.put('/:id', updateObject);
router.post('/', [AuthJwt.TokenValidation], saveObject);
router.delete('/:id', [AuthJwt.TokenValidation], deleteObject);

export default router;