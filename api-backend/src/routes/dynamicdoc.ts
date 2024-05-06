import { Router } from "express";

const router: Router = Router();

import { AuthJwt } from "../libs";
import {
  deleteFolder,
  deleteTemplate,
  getFolders,
  getfolders,
  getTemplate,
  getTemplates,
  nameTemplate,
  newfield,
  newfieldwithfolder,
  newfolder,
  saveTemplate,
} from "../controllers/dynamicdoc.controller";

router.get("/", getTemplates);
router.get("/:id", getTemplate);
router.get("/nt/:id", nameTemplate);
router.post("/", saveTemplate);
router.delete("/:id", deleteTemplate);

// Folder
router.get("/folders/", getfolders);
router.get("/folders/:id", getFolders);
router.put("/:id", newfolder); // Add Only Folder "Container"

// Fields & Folders
router.put("/nf/:id", newfield); // New Field
router.put("/nfwf/:id", newfieldwithfolder); // New Field with Folder
router.delete("/df/:id"); // Delete Field
router.delete("/deletefolder/:id", deleteFolder); // Delete Folder

// Auth

export default router;
