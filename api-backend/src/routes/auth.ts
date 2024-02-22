import { Router } from "express";

const router: Router = Router();

import { signup, signin, profile, roleType } from "../controllers/auth.controller";

import { AuthJwt } from "../libs";

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", [AuthJwt.TokenValidation], profile);
router.get("/roleType", [AuthJwt.TokenValidation], roleType);

export default router;
