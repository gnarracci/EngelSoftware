import { Router } from "express";

const router: Router = Router();

import { signup, signin, profile, roleType, userType } from "../controllers/auth.controller";

import { AuthJwt } from "../libs";

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", [AuthJwt.TokenValidation], profile);
router.get("/roleType", [AuthJwt.TokenValidation], roleType);
router.get("/userType", [AuthJwt.TokenValidation], userType);

export default router;
