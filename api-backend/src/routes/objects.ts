import { Router } from 'express';

const router: Router = Router();


import { AuthJwt } from '../libs';
import { deleteObject, getObject, getObjects, getObjTemplate, saveObject, updateObject} from '../controllers/object.controller';

router.get('/', getObjects);
router.get('/:id', getObject);
router.get('/ot/:id', getObjTemplate);
router.put('/:id', updateObject);
router.post('/', saveObject);
router.delete('/:id', deleteObject);

export default router;