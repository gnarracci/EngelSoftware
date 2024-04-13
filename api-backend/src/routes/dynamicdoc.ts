import { Router } from 'express';

const router: Router = Router();


import { AuthJwt } from '../libs';
import { getTemplates, saveTemplate } from '../controllers/dynamicdoc.controller';

router.get('/', getTemplates);
router.post('/', saveTemplate);



export default router;