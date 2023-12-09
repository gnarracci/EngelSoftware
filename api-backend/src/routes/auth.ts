import { Router } from "express";

const router: Router = Router();

import { signup, signin, profile } from "../controllers/auth.controller";
import { TokenValidation } from "../libs/verifyToken";

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", TokenValidation, profile);

export default router;