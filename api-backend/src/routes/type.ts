import { Router } from 'express';

const router: Router = Router();


import { AuthJwt } from '../libs';
import { getType, getTypes, saveType } from '../controllers/typedata.controller';

router.get('/', [AuthJwt.TokenValidation], getTypes);
router.get('/:id', [AuthJwt.TokenValidation], getType);
router.post('/', [AuthJwt.TokenValidation], saveType);



export default router;