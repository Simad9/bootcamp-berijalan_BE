import { Router } from "express";
import { Clogin } from "../controllers/auth.controller";

const router = Router();

router.post("/login", Clogin);

export default router;