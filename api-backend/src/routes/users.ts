import { Router } from "express";
const router: Router = Router();

import { AuthJwt } from "../libs";

import { createUser, deleteUser, editUser, getOne, listUsers } from "../controllers/user.controller";

router.get("/", listUsers);
router.get("/:id", getOne);
router.post("/", createUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

export default router;
