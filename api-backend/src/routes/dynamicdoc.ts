import { Router } from 'express';

const router: Router = Router();


import { AuthJwt } from '../libs';
import { deleteTemplate, getfolders, getTemplate, getTemplates, nameTemplate, newfield, newfieldwithfolder, newfolder, saveTemplate } from '../controllers/dynamicdoc.controller';

router.get('/', getTemplates);
router.get('/:id', getTemplate);
router.get('/nt/:id', nameTemplate);
router.post('/', saveTemplate);
router.delete('/:id', deleteTemplate)

// Folder
router.get('/folders/', getfolders);
router.put('/:id', newfolder);

// Fields
router.put('/nf/:id', newfield);
router.put('/nfwf/:id', newfieldwithfolder);



export default router;