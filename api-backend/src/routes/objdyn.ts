import { Router } from "express";

const router: Router = Router();

import {
  deleteDyn,
  getdyn,
  getOnedyn,
  getOnedynPDF,
  savedyn,
  updatedyn
} from "../controllers/store.crontroller";

router.post("/", savedyn);
router.get("/", getdyn);
router.get("/:id", getOnedyn);
router.delete("/:id", deleteDyn);
router.get("/pdf/:id", getOnedynPDF);
router.patch("/:id", updatedyn);

export default router;
