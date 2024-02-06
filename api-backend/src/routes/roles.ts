import { Router } from 'express';

const router: Router = Router();

import { getRoles, getRole, createRole, updateRole, deleteRole } from '../controllers/roles.controller';

router.get('/', getRoles);
router.post('/', createRole);
router.get('id/:id', getRole);
router.put('/:id', updateRole);
router.delete('/:id', deleteRole);

export default router;

