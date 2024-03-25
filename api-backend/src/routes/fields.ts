import { Router } from 'express';

import { AuthJwt } from '../libs';
import { createField } from '../controllers/fields.controller';

const router: Router = Router();

router.post('/', createField);



export default router;
