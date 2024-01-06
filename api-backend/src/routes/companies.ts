import { Router } from 'express';

const router: Router = Router();

import { getCompanies, getCompany, saveCompany } from '../controllers/company.controller';
import { AuthJwt } from 'libs';

router.get('/', getCompanies);
router.get('/:id', getCompany);
router.post('/', saveCompany);


export default router;