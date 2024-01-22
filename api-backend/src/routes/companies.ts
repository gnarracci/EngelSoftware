import { Router } from 'express';

const router: Router = Router();

import { getCompanies, getCompany, saveCompany, deleteCompany, updateCompany } from '../controllers/company.controller';
import { AuthJwt } from 'libs';

router.get('/', getCompanies);
router.get('/:id', getCompany);
router.post('/', saveCompany);
router.put('/:id', updateCompany)
router.delete('/:id', deleteCompany);


export default router;