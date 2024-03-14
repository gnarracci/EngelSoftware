import { Router } from 'express';

const router: Router = Router();


import { AuthJwt } from '../libs';
import { getObject, getObjects, saveObject } from '../controllers/object.controller';

router.get('/', [AuthJwt.TokenValidation], getObjects);
router.get('/:id', [AuthJwt.TokenValidation], getObject);
router.post('/', [AuthJwt.TokenValidation], saveObject);



export default router;