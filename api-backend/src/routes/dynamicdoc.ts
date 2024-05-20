import { Router } from "express";

const router: Router = Router();

import { AuthJwt } from "../libs";
import {
  deleteFolder,
  deleteTemplate,
  getFolders,
  getfolders,
  getlengthTemplate,
  getTemplate,
  getTemplates,
  nameTemplate,
  newfield,
  newfieldsuaF,
  newfolder,
  saveTemplate,
  updateTemplate,
} from "../controllers/dynamicdoc.controller";

router.get("/", getTemplates);
router.get("/:id", getTemplate);
router.get("/nt/:id", nameTemplate);
router.post("/", saveTemplate);
router.put("/update/:id", updateTemplate)
router.delete("/:id", deleteTemplate);

// Get Template Length
router.get('/length/:id', getlengthTemplate);

// Folder
router.get("/folders/", getfolders);
router.get("/folders/:id", getFolders);
router.put("/:id", newfolder); // Add Only Folder "Container"

// Fields & Folders
router.put("/nf/:id", newfield); // New Field
router.put('/subfield/:id', newfieldsuaF) // Add a subFolder under Principal Folder
router.delete("/df/:id"); // Delete Field
router.delete("/deletefolder/:id", deleteFolder); // Delete Folder

export default router;
