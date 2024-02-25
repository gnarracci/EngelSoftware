import { Router } from "express";
const router: Router = Router();

import { AuthJwt } from "../libs";

import { createUser, deleteUser, editUser, getOne, listUsers } from "../controllers/user.controller";

router.get("/",[AuthJwt.TokenValidation, AuthJwt.isAdmin], listUsers);
router.get("/:id",[AuthJwt.TokenValidation, AuthJwt.isAdmin], getOne);
router.post("/",[AuthJwt.TokenValidation, AuthJwt.isAdmin], createUser);
router.put("/:id",[AuthJwt.TokenValidation, AuthJwt.isAdmin], editUser);
router.delete("/:id",[AuthJwt.TokenValidation, AuthJwt.isAdmin], deleteUser);

export default router;
