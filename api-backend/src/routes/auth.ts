import {Router} from 'express';

const router: Router = Router();

import {signup, signin, profile} from '../controllers/auth.controller';
import { AuthJwt } from '../libs';

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', [AuthJwt.TokenValidation, AuthJwt.isAdmin], profile);

export default router;