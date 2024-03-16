import { Router } from 'express';

const router: Router = Router();


import { AuthJwt } from '../libs';

import { saveTemplate } from '../controllers/template.controller';


router.post('/', saveTemplate);



export default router;