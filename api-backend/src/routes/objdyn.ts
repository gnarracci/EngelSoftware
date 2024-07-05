import { Router } from 'express';

const router: Router = Router();



import { getdyn, getOnedyn, savedyn } from '../controllers/store.crontroller';

router.post('/', savedyn);
router.get('/', getdyn);
router.get('/:id', getOnedyn);

export default router;
