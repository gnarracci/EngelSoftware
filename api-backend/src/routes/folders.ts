import { Router } from 'express';

const router: Router = Router();


import { AuthJwt } from '../libs';
import { getFolders, saveFolder } from '../controllers/folder.controller';

router.get('/', getFolders);
router.post('/', saveFolder);



export default router;