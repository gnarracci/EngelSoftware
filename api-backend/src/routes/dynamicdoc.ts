import { Router } from 'express';

const router: Router = Router();


import { AuthJwt } from '../libs';
import { deleteTemplate, getTemplate, getTemplates, nameTemplate, saveTemplate } from '../controllers/dynamicdoc.controller';

router.get('/', getTemplates);
router.get('/:id', getTemplate);
router.get('/nt/:id', nameTemplate);
router.post('/', saveTemplate);
router.delete('/:id', deleteTemplate)



export default router;