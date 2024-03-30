import { Router } from 'express';

const router: Router = Router();


import { AuthJwt } from '../libs';
import { deleteObject, getObject, getObjects, saveObject, updateObject, updateObjectFields} from '../controllers/object.controller';
import { searcher } from '../controllers/template.controller';

router.get('/', getObjects);
router.get('/:id', getObject);
router.put('/:id', updateObject);
//router.put('/fields/:id', updateObjectFields),
router.post('/', [AuthJwt.TokenValidation], saveObject);
router.delete('/:id', [AuthJwt.TokenValidation], deleteObject);

export default router;