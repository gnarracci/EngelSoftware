import { Router } from "express";

const router: Router = Router();

import { AuthJwt } from "../libs";
import {
  deleteObject,
  getObjCompany,
  getObject,
  getObjects,
  getObjTemplate,
  getObjTemplateLength,
  saveObject,
  updateObject,
} from "../controllers/descripobj.controller";

router.get("/", getObjects);
router.get("/:id", getObject);
router.get("/ot/:id", getObjTemplate);
router.get("/oc/:id", getObjCompany);
router.get('/length/:id', getObjTemplateLength);
router.put("/:id", updateObject);
router.post("/", saveObject);
router.delete("/:id", deleteObject);

export default router;
