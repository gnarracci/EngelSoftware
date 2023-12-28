import { Router } from 'express';

const router: Router = Router();

import { getCompanies, getCompany } from '../controllers/company.controller';
import { AuthJwt } from 'libs';

router.get('/', getCompanies);
router.get('/:id', getCompany);


export default router;