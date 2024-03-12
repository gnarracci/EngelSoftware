import { Router } from 'express';

const router: Router = Router();

import { getCompanies, getCompany, saveCompany, deleteCompany, updateCompany } from '../controllers/company.controller';
import { AuthJwt } from '../libs';

router.get('/', [AuthJwt.TokenValidation], getCompanies);
router.get('/:id', [AuthJwt.TokenValidation, AuthJwt.isAdmin], getCompany);
router.post('/', [AuthJwt.TokenValidation, AuthJwt.isAdmin], saveCompany);
router.put('/:id', [AuthJwt.TokenValidation, AuthJwt.isAdmin], updateCompany)
router.delete('/:id', [AuthJwt.TokenValidation, AuthJwt.isAdmin], deleteCompany);


export default router;