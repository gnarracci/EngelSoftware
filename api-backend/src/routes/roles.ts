import { Router } from 'express';

const router: Router = Router();

import { getRoles, getRole, createRole, updateRole, deleteRole } from '../controllers/roles.controller';
import { AuthJwt } from '../libs';

router.get('/', [AuthJwt.TokenValidation, AuthJwt.isAdmin], getRoles);
router.post('/', [AuthJwt.TokenValidation, AuthJwt.isAdmin], createRole);
router.get('/:id', [AuthJwt.TokenValidation, AuthJwt.isAdmin], getRole);
router.put('/:id',[AuthJwt.TokenValidation, AuthJwt.isAdmin], updateRole);
router.delete('/:id',[AuthJwt.TokenValidation, AuthJwt.isAdmin], deleteRole);

export default router;

